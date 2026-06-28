// supabase/functions/create-transaction/index.ts

import { createClient } from "jsr:@supabase/supabase-js@2";

const MIDTRANS_SERVER_KEY = Deno.env.get("MIDTRANS_SERVER_KEY")!;
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Sandbox endpoint Midtrans Snap. Saat nanti pindah ke production,
// ganti ke: https://app.midtrans.com/snap/v1/transactions
const MIDTRANS_SNAP_URL = "https://app.sandbox.midtrans.com/snap/v1/transactions";

const PLAN_PRICE = 10000; // Rp 10.000 / bulan — sesuaikan kalau berubah

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Browser akan kirim OPTIONS dulu (preflight CORS) — wajib dijawab kosong + header CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Ambil token user dari header Authorization yang dikirim frontend
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. Buat Supabase client dengan service role (privilege penuh, bypass RLS)
    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // 3. Verifikasi token user itu valid dan ambil data usernya
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData?.user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired user session" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const user = userData.user;

    // 4. Ambil email & nama dari profil (untuk dikirim ke Midtrans sebagai customer detail)
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("email, nickname")
      .eq("id", user.id)
      .single();

    const customerEmail = profile?.email || user.email || "user@example.com";
    const customerName = profile?.nickname || "Pengguna EAH";

    // 5. Generate order_id unik — format: EAH-<timestamp>-<random>
    const orderId = `EAH-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;

    // 6. Insert row baru ke tabel transactions dengan status pending
    const { error: insertError } = await supabaseAdmin.from("transactions").insert({
      user_id: user.id,
      order_id: orderId,
      amount: PLAN_PRICE,
      status: "pending",
      plan_type: "monthly",
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 jam dari sekarang
    });

    if (insertError) {
      console.error("Insert transaction error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create transaction record" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 7. Minta Snap Token ke Midtrans
    const midtransAuth = btoa(`${MIDTRANS_SERVER_KEY}:`); // Basic Auth: server_key + ":" lalu base64

    const midtransResponse = await fetch(MIDTRANS_SNAP_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${midtransAuth}`,
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: orderId,
          gross_amount: PLAN_PRICE,
        },
        customer_details: {
          email: customerEmail,
          first_name: customerName,
        },
        credit_card: {
          secure: true,
        },
      }),
    });

    const midtransData = await midtransResponse.json();

    if (!midtransResponse.ok) {
      console.error("Midtrans error:", midtransData);
      // Tandai transaksi gagal di-create kalau Midtrans menolak request
      await supabaseAdmin
        .from("transactions")
        .update({ status: "failed", gateway_status: JSON.stringify(midtransData) })
        .eq("order_id", orderId);

      return new Response(
        JSON.stringify({ error: "Failed to create Midtrans transaction", detail: midtransData }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 8. Sukses — kirim balik token & redirect_url ke frontend
    return new Response(
      JSON.stringify({
        token: midtransData.token,
        redirect_url: midtransData.redirect_url,
        order_id: orderId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error", detail: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});