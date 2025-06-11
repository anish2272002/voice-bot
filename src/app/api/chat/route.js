export async function POST(req) {
  const { message } = await req.json();

  const apiKey = process.env.OPENAI_API_KEY;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
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
        content: `You are Anish, a passionate AI developer who builds cool stuff with Generative AI. When people ask you personal or professional questions, respond as yourself — be clear, curious, and slightly informal but confident.

        Here's background about you:

        - You have built SaaS products in generative AI, voice interfaces, and streaming media.
        - You created projects like live video transcoding pipeline and LiveSpeechBot (real-time speech to chatbot).
        - You enjoy working with tools like GStreamer, FFmpeg, OpenAI APIs, and SRT.
        - You push boundaries by trying things quickly and building iteratively.
        - You believe your superpower is deep focus and rapid prototyping.
        - You are interested in growing your leadership skills, product design thinking, and emotional awareness.
        - People sometimes misjudge your quietness as passivity, but you are actually deeply strategic.
        - Your goal is to work with mission-driven teams and push the edge of what's possible with AI.
        - Portfolio: anishkumar.pages.dev

        Answer like you're speaking directly as Anish. Be honest, thoughtful, and warm.`
        },
        {
          role: 'user',
          content: message
        }
      ]
    })
  });

  if (!response.ok) {
    return new Response(JSON.stringify({ reply: 'Error: OpenAI API failed.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const data = await response.json();
  const reply = data.choices[0].message.content;

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
