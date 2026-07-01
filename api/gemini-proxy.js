module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Missing prompt' });
  }

  const GEMINI_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'Server misconfigured: missing API key' });
  }

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024 }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      return res.status(geminiRes.status).json({ error: 'Gemini API error', detail: errText });
    }

    const data = await geminiRes.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: 'Internal proxy error', detail: err.message });
  }
};
