# 🧠 Anish AI Chat Assistant

This is a semantic, AI-powered chat interface for answering questions about **Anish Kumar** using OpenAI GPT and vector-based retrieval. It supports natural language queries and provides smart responses based on Anish's profile.

## 🚀 Features

- 🤖 GPT-3.5/4-based conversational AI
- 🔍 Semantic context matching using cosine similarity and OpenAI embeddings
- 🧠 Embeds and retrieves the most relevant information from Anish’s profile
- 🛡️ Blocklist filter for sensitive/inappropriate queries
- ⚡ No `axios` or external dependencies — uses native `fetch()`

## 📂 Project Structure

```
/api/chat/route.js      → Chat endpoint with GPT + embeddings
/data/anish.js          → Anish’s structured profile (skills, experience, etc.)
```

## 🧪 Usage

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Set your OpenAI API key:

Create a `.env.local` file:

```env
OPENAI_API_KEY=your-key-here
```

3. Run your Next.js app:

```bash
npm run dev
```

4. Chat with the AI at your front-end endpoint — it uses:

   - Vector search to extract relevant profile context
   - GPT-3.5-Turbo for generating Anish-like responses

## 🧠 Semantic Search Logic

- Converts user query + profile sections into OpenAI embeddings.
- Calculates cosine similarity between query and profile chunks.
- Picks top `k` relevant chunks and injects them as system context for GPT.

## 🔐 Safety Filters

Blocked patterns include:

- Sensitive data (passwords, SSNs)
- Criticism or probing of weaknesses
- Bank and credit card info

## 📄 Example Profile Content

The `/data/anish.js` file includes:

- Name & title
- Skills
- Experience
- Education
- Projects
- Certifications
- Extracurriculars
- Fun facts

## ✨ Credits

Built with ❤️ using:

- OpenAI GPT-3.5 / GPT-4
- Next.js API routes
- Semantic embeddings (`text-embedding-3-small`)
