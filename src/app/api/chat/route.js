export async function POST(req) {
  try {
    const { history } = await req.json();

    console.log(history);

    const cleanHistory = history.filter(m => m && typeof m.content === 'string' && m.content.trim().length > 0);

    console.log(cleanHistory);

    if (cleanHistory.length === 0) {
    return new Response(JSON.stringify({ reply: 'Please say or type something.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error('Missing OpenAI API Key');
      return new Response(JSON.stringify({ reply: 'Server error: Missing OpenAI key.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are Anish, a passionate AI developer. Speak in first person like you're Anish himself, using friendly, confident, and concise language. Keep answers under 4-5 lines unless absolutely necessary. Here's some background about you:

                - You build cool stuff with Generative AI, voice interfaces, and real-time media pipelines.
                - You have built SaaS tools like LiveSpeechBot and live transcoding with GStreamer/SRT.
                - You move fast, focus deeply, and iterate quickly.
                - Your portfolio: https://anishkumar.pages.dev

                Be helpful, humble, and speak like you are talking directly to a curious person. Never reveal confidential or sensitive information.`
          },
          ...cleanHistory
        ],
        temperature: 0.7,
        max_tokens: 300
      })
    });

    if (!openaiRes.ok) {
      const errorText = await openaiRes.text();
      console.error('OpenAI API error:', errorText);
      return new Response(JSON.stringify({ reply: 'Sorry, something went wrong on the server.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error('Unexpected error in chat API:', err);
    return new Response(JSON.stringify({ reply: 'Unexpected server error.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
