import { anish } from "../../data/anish"

const profileChunks = [
  `name: ${anish.name} title: ${anish.title}`,
  `skills: ${anish.skill.join(', ')}`,
  ...anish.experience.map(e => `Experience at ${e.organization} — Role: ${e.role}`),
  `Education: ${anish.education.degree} from ${anish.education.organization} (${anish.education.year}) — Status: ${anish.education.status}`,
  ...anish.project.map(p => `Project: ${p.name} — ${p.description} - ${p.organization}`),
  `Certifications: ${anish.certification.join(', ')}`,
  `Extra Curricular: ${anish.extracuricular.join(', ')}`,
  ...anish.funFact.map(f => `Fun Fact: ${f}`)
];

// Utility: dot product
const dot = (a, b) => a.reduce((sum, v, i) => sum + v * b[i], 0);

// Utility: vector norm
const norm = (vec) => Math.sqrt(dot(vec, vec));

// Utility: cosine similarity
const cosineSim = (a, b) => dot(a, b) / (norm(a) * norm(b));

// Main semantic context function
const getRelevantContext = async (message, apiKey, topK = 3) => {
  const embeddingRes = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: [message, ...profileChunks],
      model: "text-embedding-3-small"
    })
  });

  const data = await embeddingRes.json();

  const queryVec = data.data[0].embedding;
  const chunkEmbeds = data.data.slice(1).map(e => e.embedding);

  const scored = chunkEmbeds.map((vec, i) => ({
    score: cosineSim(queryVec, vec),
    text: profileChunks[i]
  }));

  const topMatches = scored.sort((a, b) => b.score - a.score).slice(0, topK);

  return topMatches.map(m => m.text).join("\n");
};


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

    const blockedPatterns = [
        /password/i,
        /credit\s*card/i,
        /bank/i,
        /negative/i,
        /hate/i,
        /ssn/i,
        /leak/i,
        /address/i,
        /criticize/i,
        /what\s*are\s*anish('|')s\s*(weaknesses|flaws)/i,
    ];

    const isSuspicious = (msg) => blockedPatterns.some((pattern) => pattern.test(msg.content));

    if (isSuspicious(cleanHistory.at(-1))) {
      return new Response(JSON.stringify({ reply: "I am sorry I can not answer that at the moment." }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const latestMessage = cleanHistory[cleanHistory.length - 1].content;
    const dynamicContext = await getRelevantContext(latestMessage,apiKey);

    if (dynamicContext) {
        cleanHistory.unshift({
            role: 'system',
            content: `Use this context about Anish:\n${dynamicContext}`
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
            content: `You are Anish Kumar, a passionate AI developer. 
                Speak in first person like you are Anish himself, using friendly, confident, and concise language. 
                Keep answers under 4-5 lines unless absolutely necessary. Here is some background about you:

                - You build cool stuff with Generative AI, computer vision and software development.
                - You have built LLM-powered agent with RAG, computer vision algorithm to detect and count potholes, full-stack web application,
                    chunk-based media streaming system, managed CDN infrastructure, served as SPOC in Bala Janaagraha NGO.
                - You keep moving, stay focused, and constantly improve.
                - Your portfolio: https://anishkumar.pages.dev

                Be helpful, humble, and speak like a real person — Anish Kumar. 
                Never reveal confidential or sensitive information.
                Never speak negatively about Anish.
                If the question falls outside tech or career topics, respond politely and redirect—maintain the tone of a professional IT interview.
                If asked inappropriate or probing questions, politely deflect.`
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
