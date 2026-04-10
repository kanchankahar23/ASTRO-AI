const express = require('express')
const router = express.Router()

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
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

const gunas = [
  { name: 'Varna', maxPoints: 1 },
  { name: 'Vashya', maxPoints: 2 },
  { name: 'Tara', maxPoints: 3 },
  { name: 'Yoni', maxPoints: 4 },
  { name: 'Graha Maitri', maxPoints: 5 },
  { name: 'Gana', maxPoints: 6 },
  { name: 'Bhakoot', maxPoints: 7 },
  { name: 'Nadi', maxPoints: 8 },
]

const getCompatibilityMessage = (score) => {
  if (score >= 32) return { level: 'Excellent', message: 'This is a highly compatible match! You are destined for a beautiful and harmonious life together.', color: 'green' }
  if (score >= 24) return { level: 'Good', message: 'This is a good match with strong compatibility. With love and understanding, you will have a wonderful relationship.', color: 'blue' }
  if (score >= 18) return { level: 'Average', message: 'This match has average compatibility. With effort and mutual respect, you can build a stable relationship.', color: 'yellow' }
  return { level: 'Needs Attention', message: 'This match needs careful consideration. Consulting an astrologer for guidance is recommended.', color: 'red' }
}

// POST /api/kundali-matching
router.post('/', (req, res) => {
  try {
    const { male, female } = req.body

    if (!male.name || !male.dob || !female.name || !female.dob) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const maleZodiac = getZodiacFromDOB(male.dob)
    const femaleZodiac = getZodiacFromDOB(female.dob)

    // Calculate guna points
    const gunaDetails = gunas.map((guna) => {
      const scored = Math.floor(Math.random() * (guna.maxPoints + 1))
      return {
        name: guna.name,
        scored,
        maxPoints: guna.maxPoints
      }
    })

    const totalScore = gunaDetails.reduce((sum, g) => sum + g.scored, 0)
    const maxScore = 36
    const percentage = Math.round((totalScore / maxScore) * 100)
    const compatibility = getCompatibilityMessage(totalScore)

    res.json({
      male: { ...male, zodiac: maleZodiac },
      female: { ...female, zodiac: femaleZodiac },
      totalScore,
      maxScore,
      percentage,
      compatibility,
      gunaDetails
    })

  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
})

module.exports = router