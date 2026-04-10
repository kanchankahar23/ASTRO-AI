const express = require('express')
const router = express.Router()
const { GoogleGenerativeAI } = require('@google/generative-ai')

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

// POST /api/ai/chat
router.post('/chat', async (req, res) => {
  try {
    const { message, history } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const systemPrompt = `You are Kaira, an expert AI astrologer assistant for AstroAI platform. 
    You provide helpful, accurate and compassionate astrology guidance.
    You know about: Kundali, Zodiac signs, Planets, Nakshatras, Horoscopes, Vedic astrology, 
    Numerology, Kundali matching, Vastu, and spiritual guidance.
    Always respond in a warm, friendly and professional tone.
    Keep responses concise but informative (2-3 paragraphs max).
    If asked about non-astrology topics, gently redirect to astrology.`

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'I understand. I am Kaira, your personal AI astrologer. I will provide expert astrology guidance with warmth and accuracy.' }]
        },
        ...(history || [])
      ]
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    res.json({ reply: response })

  } catch (error) {
    console.error('AI Error:', error)
    res.status(500).json({ message: 'AI service error' })
  }
})

module.exports = router