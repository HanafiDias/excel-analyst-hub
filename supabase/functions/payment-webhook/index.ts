// supabase/functions/payment-webhook/index.ts

import { createClient } from "jsr:@supabase/supabase-js@2";

const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Hitung SHA512 dari string, return hex string
async function sha512(message: string): Promise<string> {
  const data = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-512", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload = await req.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      payment_type,
      transaction_id,
    } = payload;

    // 1. Validasi field wajib ada
    if (!order_id || !status_code || !gross_amount || !signature_key) {
      console.error("Missing required fields in webhook payload:", payload);
      return new Response(JSON.stringify({ error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. VERIFIKASI SIGNATURE — ini langkah paling penting, jangan dihapus
    const expectedSignature = await sha512(
      `${order_id}${status_code}${gross_amount}${MIDTRANS_SERVER_KEY}`
    );

    if (expectedSignature !== signature_key) {
      console.error("Signature mismatch! Possible fake webhook call.", {
        order_id,
        received: signature_key,
        expected: expectedSignature,
      });
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 3. Signature valid — sekarang aman untuk dipercaya. Buat Supabase admin client.
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 4. Cari transaksi yang sesuai order_id ini
    const { data: transaction, error: fetchError } = await supabaseAdmin
      .from("transactions")
      .select("*")
      .eq("order_id", order_id)
      .single();

    if (fetchError || !transaction) {
      console.error("Transaction not found for order_id:", order_id);
      return new Response(JSON.stringify({ error: "Transaction not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 5. IDEMPOTENCY CHECK — kalau transaksi ini sudah pernah diproses sebagai 'paid',
    //    jangan proses ulang (Midtrans sering kirim notifikasi berkali-kali untuk event yang sama)
    if (transaction.status === "paid") {
      console.log("Transaction already processed, skipping:", order_id);
      return new Response(JSON.stringify({ message: "Already processed" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 6. Tentukan status baru berdasarkan transaction_status dari Midtrans
    let newStatus: string;
    if (transaction_status === "settlement" || transaction_status === "capture") {
      newStatus = "paid";
    } else if (transaction_status === "pending") {
      newStatus = "pending";
    } else if (
      transaction_status === "deny" ||
      transaction_status === "cancel" ||
      transaction_status === "failure"
    ) {
      newStatus = "failed";
    } else if (transaction_status === "expire") {
      newStatus = "expired";
    } else {
      newStatus = transaction.status; // status tidak dikenali, jangan ubah apa-apa
    }

    // 7. Update tabel transactions
    const { error: updateError } = await supabaseAdmin
      .from("transactions")
      .update({
        status: newStatus,
        gateway_status: transaction_status,
        gateway_transaction_id: transaction_id,
        payment_method: payment_type,
        paid_at: newStatus === "paid" ? new Date().toISOString() : null,
        raw_webhook_payload: payload,
      })
      .eq("order_id", order_id);

    if (updateError) {
      console.error("Failed to update transaction:", updateError);
      return new Response(JSON.stringify({ error: "Failed to update transaction" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 8. KALAU PAID — aktifkan premium user. Subscription 1 bulan dari sekarang.
    if (newStatus === "paid") {
      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

      const { error: profileError } = await supabaseAdmin
        .from("profiles")
        .update({
          is_premium: true,
          subscription_start: new Date().toISOString(),
          subscription_end: subscriptionEnd.toISOString(),
        })
        .eq("id", transaction.user_id);

      if (profileError) {
        console.error("Failed to update profile premium status:", profileError);
        // Catatan: transaksi sudah tercatat 'paid', tapi profile gagal update.
        // Ini perlu di-monitor manual kalau terjadi — sangat jarang tapi mungkin.
        return new Response(
          JSON.stringify({ error: "Payment recorded but failed to activate premium" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      console.log("Premium activated for user:", transaction.user_id);
    }

    // 9. Selalu balas 200 OK kalau berhasil diproses — Midtrans akan retry kalau tidak dapat 200
    return new Response(JSON.stringify({ message: "Webhook processed successfully" }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error in webhook handler:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});