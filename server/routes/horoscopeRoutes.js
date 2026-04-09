const express = require('express')
const router = express.Router()
const Horoscope = require('../models/Horoscope')

// GET /api/horoscope/:type/:sign
router.get('/:type/:sign', async (req, res) => {
  try {
    const { type, sign } = req.params
    const horoscope = await Horoscope.findOne({ type, sign })
    if (!horoscope) {
      return res.status(404).json({ message: 'Horoscope not found' })
    }
    res.json(horoscope)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router