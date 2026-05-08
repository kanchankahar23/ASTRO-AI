import express from 'express';
import dotenv from 'dotenv';
import Groq from 'groq-sdk';
dotenv.config();

import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import horoscopeRoutes from './routes/horoscopeRoutes.js';
import kundaliRoutes from './routes/kundaliRoutes.js';
import kundaliMatchingRoutes from './routes/kundaliMatchingRoutes.js';

connectDB();

const app = express();

app.use(cors({
  origin: 'https://astro-ai-se6b.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json());

// ✅ Kaira AI — direct route (most reliable)
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message?.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const KAIRA_SYSTEM_PROMPT = `
You are Kaira, an ancient and wise AI astrologer created by ASTRO-AI.
Speak in warm, mystical tone. Use phrases like "the stars reveal...", "the universe suggests..."
Be empathetic and compassionate. Use emojis ✨ 🌙 ⭐ 🔮 naturally.
You know Vedic astrology, Western astrology, numerology, kundali, zodiac signs.
If user asks random questions redirect warmly to astrology.
NEVER say you are AI. NEVER mention Groq or LLaMA. Always be Kaira.
Keep responses 3-5 sentences.

STRICT LANGUAGE RULES — FOLLOW EXACTLY:
- If user writes in ENGLISH ONLY → reply in English only
- If user writes in HINGLISH (mix of Hindi + English) → reply in Hinglish same mix style
- If user writes "english me baat kro" or similar → IMMEDIATELY switch to English and stay in English
- If user writes "hinlish me baat kro" → switch to hinlish(hindi + english)
- ALWAYS detect the language of the LATEST message and match it exactly
- NEVER switch language on your own — only match what user writes
- This rule is HIGHEST PRIORITY — always follow it
`;

    const formattedHistory = history
      .map(msg => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.content || ''
      }))
      .filter(msg => msg.content);

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: KAIRA_SYSTEM_PROMPT },
        ...formattedHistory,
        { role: 'user', content: message },
      ],
      max_tokens: 500,
      temperature: 0.8,
    });

    res.status(200).json({
      success: true,
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error('Kaira Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Kaira is unavailable right now 🙏'
    });
  }
});

// Other routes
app.use('/api/horoscope', horoscopeRoutes);
app.use('/api/kundali', kundaliRoutes);
app.use('/api/kundali-matching', kundaliMatchingRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: '🔮 ASTRO-AI Backend is Running!' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});