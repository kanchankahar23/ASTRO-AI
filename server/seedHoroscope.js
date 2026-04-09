const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Horoscope = require('./models/Horoscope')

dotenv.config()

const data = [
  { sign: 'Aries', type: 'daily', prediction: 'Today is a powerful day. Mars energizes your ambitions. Take bold steps forward.' },
  { sign: 'Taurus', type: 'daily', prediction: 'Financial matters look promising. Venus brings harmony to relationships.' },
  { sign: 'Gemini', type: 'daily', prediction: 'Your communication skills shine. Great day for meetings and new connections.' },
  { sign: 'Cancer', type: 'daily', prediction: 'Trust your intuition today. Home and family bring comfort and peace.' },
  { sign: 'Leo', type: 'daily', prediction: 'Your charisma is at peak. Leadership opportunities arise today.' },
  { sign: 'Virgo', type: 'daily', prediction: 'Pay attention to details. Health and wellness routines benefit you.' },
  { sign: 'Libra', type: 'daily', prediction: 'Balance is key today. Relationships flourish with open communication.' },
  { sign: 'Scorpio', type: 'daily', prediction: 'Deep transformation is happening. Trust the process and move forward.' },
  { sign: 'Sagittarius', type: 'daily', prediction: 'Adventure calls today. Expand horizons through learning and travel.' },
  { sign: 'Capricorn', type: 'daily', prediction: 'Career goals are highlighted. Hard work and discipline pays off.' },
  { sign: 'Aquarius', type: 'daily', prediction: 'Innovative ideas flow freely. Connect with like-minded people.' },
  { sign: 'Pisces', type: 'daily', prediction: 'Intuition and creativity are heightened. Spiritual insights guide you.' },

  { sign: 'Aries', type: 'weekly', prediction: 'This week brings exciting career opportunities. Mid-week challenges strengthen your resolve.' },
  { sign: 'Taurus', type: 'weekly', prediction: 'A financially rewarding week. Focus on long-term investments and relationships.' },
  { sign: 'Gemini', type: 'weekly', prediction: 'Social activities dominate this week. New friendships form naturally.' },
  { sign: 'Cancer', type: 'weekly', prediction: 'Family matters take center stage. Emotional healing is possible this week.' },
  { sign: 'Leo', type: 'weekly', prediction: 'Your confidence attracts success. A leadership role may be offered.' },
  { sign: 'Virgo', type: 'weekly', prediction: 'Health and wellness are your focus. Practical approach solves problems.' },
  { sign: 'Libra', type: 'weekly', prediction: 'Partnerships flourish this week. Legal matters resolve favorably.' },
  { sign: 'Scorpio', type: 'weekly', prediction: 'Powerful transformations continue. Let go of what no longer serves you.' },
  { sign: 'Sagittarius', type: 'weekly', prediction: 'Travel or learning opportunities arise. Your optimism inspires others.' },
  { sign: 'Capricorn', type: 'weekly', prediction: 'Professional achievements highlighted. Your reputation grows this week.' },
  { sign: 'Aquarius', type: 'weekly', prediction: 'Community involvement brings rewards. Technology projects advance well.' },
  { sign: 'Pisces', type: 'weekly', prediction: 'Creative and spiritual pursuits are favored. Dreams carry important messages.' },

  { sign: 'Aries', type: 'yearly', prediction: '2026 is a year of bold beginnings. Jupiter brings expansion and luck. Career peaks mid-year.' },
  { sign: 'Taurus', type: 'yearly', prediction: '2026 brings financial abundance. Real estate and investments favor you greatly.' },
  { sign: 'Gemini', type: 'yearly', prediction: '2026 is a year of communication. Publishing and media opportunities arise.' },
  { sign: 'Cancer', type: 'yearly', prediction: '2026 focuses on home and family. A property purchase is highlighted.' },
  { sign: 'Leo', type: 'yearly', prediction: '2026 is a year of creative expression. Artistic talents are widely recognized.' },
  { sign: 'Virgo', type: 'yearly', prediction: '2026 brings health and service focus. Career in healing or analysis flourishes.' },
  { sign: 'Libra', type: 'yearly', prediction: '2026 is a year of partnerships. Business and romantic partnerships flourish.' },
  { sign: 'Scorpio', type: 'yearly', prediction: '2026 brings deep transformation. Financial gains through smart investment.' },
  { sign: 'Sagittarius', type: 'yearly', prediction: '2026 expands horizons. Higher education or international travel highlighted.' },
  { sign: 'Capricorn', type: 'yearly', prediction: '2026 is a career pinnacle year. Professional recognition and rewards arrive.' },
  { sign: 'Aquarius', type: 'yearly', prediction: '2026 brings innovation. Technology ventures succeed and friendships grow.' },
  { sign: 'Pisces', type: 'yearly', prediction: '2026 is spiritually rich. Creative endeavors bring recognition and love.' },
]

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected...')
    await Horoscope.deleteMany()
    console.log('Old data deleted...')
    await Horoscope.insertMany(data)
    console.log('✅ Horoscope data seeded successfully!')
    process.exit()
  } catch (error) {
    console.error('Error:', error)
    process.exit(1)
  }
}

seedData()