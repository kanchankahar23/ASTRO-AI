const express = require('express')
const router = express.Router()

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
]

const nakshatras = [
  'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira',
  'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha',
  'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati',
  'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha',
  'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha',
  'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
]

const planets = [
  'Sun', 'Moon', 'Mercury', 'Venus', 'Mars',
  'Jupiter', 'Saturn', 'Rahu', 'Ketu'
]

const getZodiacFromDOB = (dob) => {
  const date = new Date(dob)
  const month = date.getMonth() + 1
  const day = date.getDate()

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius'
  return 'Pisces'
}

// POST /api/kundali
router.post('/', (req, res) => {
  try {
    const { name, dob, time, place, gender } = req.body

    if (!name || !dob || !time || !place || !gender) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const zodiacSign = getZodiacFromDOB(dob)
    const risingSign = zodiacSigns[Math.floor(Math.random() * 12)]
    const moonSign = zodiacSigns[Math.floor(Math.random() * 12)]
    const nakshatra = nakshatras[Math.floor(Math.random() * 27)]

    const planetPositions = planets.map((planet) => ({
      name: planet,
      sign: zodiacSigns[Math.floor(Math.random() * 12)],
      house: Math.floor(Math.random() * 12) + 1,
      degree: (Math.random() * 30).toFixed(2)
    }))

    const predictions = [
      { area: '💼 Career', prediction: `As a ${zodiacSign}, your career is blessed with growth and new opportunities this year. Leadership roles may come your way.` },
      { area: '❤️ Love & Marriage', prediction: `Your love life shows positive signs. ${moonSign} Moon brings emotional depth and meaningful connections.` },
      { area: '💰 Finance', prediction: `Financial stability is indicated. Avoid impulsive spending and focus on long-term investments for best results.` },
      { area: '🏥 Health', prediction: `Your health remains generally good. Pay attention to stress levels and maintain a balanced daily routine.` },
      { area: '👨‍👩‍👧 Family', prediction: `Family relationships are harmonious. A joyful occasion may bring the family together soon.` },
      { area: '🎓 Education', prediction: `Students will find this period favorable for learning. Hard work and dedication will bring excellent results.` },
    ]

    res.json({
      name,
      dob,
      time,
      place,
      gender,
      zodiacSign,
      risingSign,
      moonSign,
      nakshatra,
      planets: planetPositions,
      predictions
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router