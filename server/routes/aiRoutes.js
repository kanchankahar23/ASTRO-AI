const express = require('express')
const router = express.Router()

router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // Create Groq client INSIDE the route
    const Groq = require('groq-sdk')
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

    const messages = [
      {
        role: 'system',
        content: `You are Kaira, an expert AI astrologer for AstroAI platform.
        You provide helpful, accurate and compassionate astrology guidance.
        You know about Kundali, Zodiac signs, Planets, Nakshatras, Horoscopes,
        Vedic astrology, Numerology, Kundali matching and spiritual guidance.
        Always respond in a warm, friendly and professional tone.
        Keep responses concise (2-3 paragraphs max).`
      },
      ...(history || []).map(msg => ({
        role: msg.role === 'model' ? 'assistant' : msg.role,
        content: msg.parts?.[0]?.text || msg.content || ''
      })),
      { role: 'user', content: message }
    ]

    const completion = await groq.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 500,
    })

    const reply = completion.choices[0]?.message?.content || 'Sorry, could not generate response.'
    res.json({ reply })

  } catch (error) {
    console.error('AI Error:', error.message)
    res.status(500).json({ message: 'AI service error' })
  }
})

module.exports = router