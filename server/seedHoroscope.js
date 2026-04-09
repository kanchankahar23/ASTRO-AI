const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Horoscope = require('./models/Horoscope')

dotenv.config()
const data = {
  aries: [
    { title: "Body", percent: 40, desc: "Your physical energy may feel slightly low today. Focus on proper rest, hydration, and light activity to regain balance." },
    { title: "Mind", percent: 60, desc: "Your mind remains stable with moments of clarity. Avoid overthinking and trust your instincts while making decisions." },
    { title: "Wealth", percent: 75, desc: "Financially, this is a favorable period. New opportunities may help you improve your financial stability." },
    { title: "Love", percent: 50, desc: "Your love life feels balanced but needs attention. Honest communication will strengthen your relationships." },
    { title: "Health", percent: 65, desc: "Your overall health is stable. Maintain a proper routine and avoid unnecessary stress." },
    { title: "Career", percent: 80, desc: "Career growth looks strong. Your efforts are likely to be recognized, bringing new opportunities." }
  ],

  taurus: [
    { title: "Body", percent: 70, desc: "Your energy levels are steady today. Staying active and maintaining discipline will keep you feeling balanced." },
    { title: "Mind", percent: 65, desc: "Your thoughts are clear, helping you make practical decisions. Stay focused and avoid distractions." },
    { title: "Wealth", percent: 80, desc: "Financial stability is strong. This is a good time to plan investments or manage savings wisely." },
    { title: "Love", percent: 60, desc: "Your romantic life improves with communication. Express your feelings openly for better understanding." },
    { title: "Health", percent: 75, desc: "Your health is in good condition. Maintaining routine habits will keep you fit and energetic." },
    { title: "Career", percent: 85, desc: "Career opportunities are promising. Your consistency and hard work will bring success." }
  ],

  gemini: [
    { title: "Body", percent: 65, desc: "Your physical energy is moderate. Staying active and avoiding laziness will help you feel better." },
    { title: "Mind", percent: 85, desc: "Your mind is sharp and creative. It’s a great time for communication, learning, and new ideas." },
    { title: "Wealth", percent: 70, desc: "Financial flow remains stable. Avoid unnecessary spending and focus on smart planning." },
    { title: "Love", percent: 65, desc: "Relationships improve with open conversation. Sharing your thoughts will strengthen bonds." },
    { title: "Health", percent: 60, desc: "Health is average. Avoid mental stress and ensure proper rest." },
    { title: "Career", percent: 75, desc: "Career growth comes through networking and communication. Stay proactive." }
  ],

  cancer: [
    { title: "Body", percent: 60, desc: "You may feel slightly low on energy. Take proper rest and avoid overworking yourself." },
    { title: "Mind", percent: 70, desc: "Your emotions may fluctuate, but staying calm will help maintain balance." },
    { title: "Wealth", percent: 65, desc: "Financial matters require attention. Avoid risky decisions and focus on stability." },
    { title: "Love", percent: 80, desc: "Your emotional connection with loved ones is strong. Spend quality time with family." },
    { title: "Health", percent: 68, desc: "Health is stable, but stress management is important. Relaxation will help." },
    { title: "Career", percent: 72, desc: "Career progress is steady. Patience and consistency will bring results." }
  ],

  leo: [
    { title: "Body", percent: 75, desc: "Your energy levels are high today. Utilize this energy in productive activities." },
    { title: "Mind", percent: 78, desc: "You feel confident and focused. Decision-making becomes easier for you." },
    { title: "Wealth", percent: 70, desc: "Financially stable period. Avoid impulsive spending." },
    { title: "Love", percent: 85, desc: "Your charm attracts others. Romantic relationships are strong and fulfilling." },
    { title: "Health", percent: 72, desc: "Your health is good. Maintain balance in diet and routine." },
    { title: "Career", percent: 88, desc: "Leadership opportunities may arise. Your efforts will bring recognition." }
  ],

  virgo: [
    { title: "Body", percent: 68, desc: "Your energy is balanced. Following a routine will keep you productive." },
    { title: "Mind", percent: 80, desc: "Your analytical thinking is strong. It’s a great time to solve problems." },
    { title: "Wealth", percent: 72, desc: "Financial planning will benefit you. Avoid unnecessary expenses." },
    { title: "Love", percent: 60, desc: "Relationships need attention. Communication will improve understanding." },
    { title: "Health", percent: 75, desc: "Your health is good with proper habits. Maintain discipline." },
    { title: "Career", percent: 82, desc: "Productivity is high. Your work will be appreciated." }
  ],

  libra: [
    { title: "Body", percent: 65, desc: "Maintain balance in physical activity. Avoid overexertion." },
    { title: "Mind", percent: 75, desc: "You feel calm and thoughtful. Decision-making improves." },
    { title: "Wealth", percent: 70, desc: "Financial stability is steady. Avoid risky investments." },
    { title: "Love", percent: 85, desc: "Relationships flourish. Harmony and understanding increase." },
    { title: "Health", percent: 68, desc: "Health is stable. Focus on stress reduction." },
    { title: "Career", percent: 78, desc: "Career growth comes through partnerships and teamwork." }
  ],

  scorpio: [
    { title: "Body", percent: 70, desc: "You feel physically strong. Use this energy wisely." },
    { title: "Mind", percent: 85, desc: "Your focus and depth of thinking are powerful today." },
    { title: "Wealth", percent: 78, desc: "Financial gains are possible. Smart decisions will help." },
    { title: "Love", percent: 75, desc: "Relationships are intense and meaningful. Trust is key." },
    { title: "Health", percent: 70, desc: "Health is stable. Maintain balance." },
    { title: "Career", percent: 82, desc: "Transformation in career brings growth." }
  ],

  sagittarius: [
    { title: "Body", percent: 78, desc: "You feel energetic and active. Channel this into productive work." },
    { title: "Mind", percent: 82, desc: "Optimism and positivity guide your decisions." },
    { title: "Wealth", percent: 72, desc: "Stable finances. Avoid unnecessary risks." },
    { title: "Love", percent: 70, desc: "Relationships bring joy and excitement." },
    { title: "Health", percent: 75, desc: "Good overall health. Maintain routine." },
    { title: "Career", percent: 80, desc: "Growth comes through learning and exploration." }
  ],

  capricorn: [
    { title: "Body", percent: 72, desc: "Your stamina is good. Stay consistent with your routine." },
    { title: "Mind", percent: 78, desc: "Focused mindset helps you achieve goals." },
    { title: "Wealth", percent: 85, desc: "Financial growth is strong. Smart investments pay off." },
    { title: "Love", percent: 65, desc: "Relationships need emotional effort and attention." },
    { title: "Health", percent: 74, desc: "Health is stable. Maintain discipline." },
    { title: "Career", percent: 90, desc: "This is a peak time for career success and recognition." }
  ],

  aquarius: [
    { title: "Body", percent: 68, desc: "Balanced energy levels. Avoid overworking yourself." },
    { title: "Mind", percent: 88, desc: "Creative and innovative ideas flow easily." },
    { title: "Wealth", percent: 75, desc: "Good financial opportunities may arise." },
    { title: "Love", percent: 70, desc: "Supportive relationships bring comfort." },
    { title: "Health", percent: 72, desc: "Health is stable. Maintain routine." },
    { title: "Career", percent: 85, desc: "Success comes through innovation and creativity." }
  ],

  pisces: [
    { title: "Body", percent: 65, desc: "Energy is moderate. Proper rest is important." },
    { title: "Mind", percent: 82, desc: "Your creativity and intuition are strong." },
    { title: "Wealth", percent: 70, desc: "Stable finances. Avoid impulsive decisions." },
    { title: "Love", percent: 80, desc: "Emotional bonding is strong. Relationships deepen." },
    { title: "Health", percent: 68, desc: "Avoid stress and maintain mental peace." },
    { title: "Career", percent: 78, desc: "Creative growth brings new opportunities." }
  ]
}
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