import { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Send, ChevronRight, Calendar, Sun, Moon } from 'lucide-react'

const zodiacSigns = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
]

const quickTags = [
  { label: 'Love', icon: '❤️' },
  { label: 'Career', icon: '💼' },
  { label: 'Health', icon: '🌿' },
  { label: 'Money', icon: '💰' },
]

const readings = [
  { icon: '🔴', planet: 'Mars in Aquarius', title: 'Mangal Dosha', desc: 'Does your Mars placement create Dosha? Find out what it means for you.', bg: '#fff5f5', border: '#fecaca', iconBg: '#fee2e2' },
  { icon: '🩷', planet: 'Venus in Leo', title: 'Love & Romance', desc: 'Your Venus sign reveals your love style. Discover what is written in your stars.', bg: '#fff0f6', border: '#fbcfe8', iconBg: '#fce7f3' },
  { icon: '🔵', planet: 'Saturn in Gemini', title: 'Saturn & Sade Sati', desc: 'Your Saturn placement shapes your challenges and rewards. See what lies ahead.', bg: '#f0f9ff', border: '#bae6fd', iconBg: '#e0f2fe' },
  { icon: '🟣', planet: 'Moon in Gemini', title: 'Dasha Predictions', desc: 'Which planetary period is running in your life?', bg: '#faf5ff', border: '#d8b4fe', iconBg: '#ede9fe' },
  { icon: '🟢', planet: 'Lagna Scorpio', title: 'Gemstone Guide', desc: 'Which gemstone suits your chart?', bg: '#f0fdf4', border: '#86efac', iconBg: '#dcfce7' },
]

const Dashboard = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const [selectedSign, setSelectedSign] = useState('Scorpio')
  const [horoscopeType, setHoroscopeType] = useState('Today')
  const [horoscope, setHoroscope] = useState(null)
  const [input, setInput] = useState('')

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'short', day: 'numeric'
  })

  useEffect(() => {
    fetchHoroscope()
  }, [selectedSign, horoscopeType])

  const fetchHoroscope = async () => {
    try {
      const type = horoscopeType === 'Today' ? 'daily' : horoscopeType === 'Weekly' ? 'weekly' : 'yearly'
      const res = await axios.get(`http://localhost:5000/api/horoscope/${type}/${selectedSign}`)
      setHoroscope(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] py-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <p className="text-gray-400 text-sm">{today}</p>
            <h1 className="text-3xl font-bold text-gray-900 mt-1">
              Namaste, <span className="text-orange-500">{user?.firstName || 'User'}</span> 🙏
            </h1>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/services/kundali"
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition shadow-md shadow-orange-200"
            >
              ⭐ Generate Kundali
            </Link>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-13">

          {/* LEFT + MIDDLE */}
          <div className="lg:col-span-2 space-y-5">

            {/* AI Chat Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-2xl p-6 border border-orange-100 shadow-sm"
              style={{ background: 'linear-gradient(135deg, #fff7ed 0%, #ffedd5 50%, #fed7aa 100%)' }}
            >
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-medium inline-flex items-center gap-1">
                🔮 AI Vedic Astrologer
              </span>
              <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-5">
                Ready to decode your destiny?
              </h2>

              {/* Last conversation */}
              <Link to="/services/AI-Kaira">
                <motion.div
                  whileHover={{ scale: 1.01, x: 4 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/70 hover:bg-white border border-orange-200 rounded-xl p-4 flex items-center justify-between mb-4 cursor-pointer shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-500 text-sm">💬</span>
                    </div>
                    <div>
                      <p className="text-xs text-orange-400 font-medium">continue your last conversation...</p>
                      <p className="text-sm font-semibold text-gray-800">How is my love life looking according to my chart?</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-orange-400" />
                </motion.div>
              </Link>

              {/* Input */}
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && navigate('/services/AI-Kaira')}
                  placeholder="Ask about your future..."
                  className="flex-1 bg-white/80 border border-orange-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 placeholder-gray-400 shadow-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/services/AI-Kaira')}
                  className="w-11 h-11 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-md shadow-orange-200 transition"
                >
                  <Send size={16} />
                </motion.button>
              </div>

              {/* Quick Tags */}
              <div className="flex gap-2 flex-wrap">
                {quickTags.map((tag) => (
                  <motion.button
                    key={tag.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/services/AI-Kaira')}
                    className="bg-white/70 hover:bg-white border border-orange-200 text-sm px-4 py-1.5 rounded-full transition flex items-center gap-1.5 text-gray-700 font-medium shadow-sm"
                  >
                    {tag.icon} {tag.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Horoscope Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-5">
                <span className="bg-orange-50 text-orange-500 text-xs px-3 py-1 rounded-full font-semibold border border-orange-100">
                  🔮 YOUR HOROSCOPE
                </span>
                <div className="flex gap-1 bg-gray-100 rounded-full p-1">
                  {['Today', 'Weekly', 'Monthly'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setHoroscopeType(t)}
                      className={`text-sm px-4 py-1.5 rounded-full transition font-medium ${
                        horoscopeType === t
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Zodiac Signs Row */}
              <div className="flex gap-3 overflow-x-auto pb-3 mb-5 scrollbar-hide">
                {zodiacSigns.map((sign) => (
                  <motion.button
                    key={sign.name}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedSign(sign.name)}
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-xl transition shadow-sm ${
                      selectedSign === sign.name
                        ? 'bg-orange-500 text-white shadow-orange-200 shadow-md'
                        : 'bg-gray-100 hover:bg-orange-50 text-gray-700'
                    }`}
                  >
                    {sign.symbol}
                  </motion.button>
                ))}
              </div>

              {/* Horoscope Text */}
              {horoscope && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-orange-50 rounded-xl p-5 border border-orange-100"
                >
                  <h3 className="font-bold text-orange-600 mb-2 text-sm">
                    {selectedSign} — {horoscopeType} Horoscope
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{horoscope.prediction}</p>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="mt-4 bg-orange-500 hover:bg-orange-600 text-white text-sm px-5 py-2 rounded-full transition flex items-center gap-1.5 font-medium shadow-sm shadow-orange-200"
                  >
                    Read Full Report <ChevronRight size={14} />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Chat History */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Your History</h2>
                <Link to="/services/AI-Kaira" className="text-orange-500 text-sm hover:underline font-medium">
                  See All
                </Link>
              </div>
              <motion.div
                whileHover={{ scale: 1.01, x: 3 }}
                className="bg-gray-50 hover:bg-orange-50 border border-gray-100 hover:border-orange-100 rounded-xl p-4 flex items-center justify-between transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">
                    💬
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">How is my love life looking according to my chart?</p>
                    <p className="text-xs text-gray-400 mt-0.5">What's on your mind?</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">Today</span>
              </motion.div>
            </motion.div>

            {/* Astrology Readings */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h2 className="text-lg font-bold text-gray-900 mb-4">Your Astrology Readings</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {readings.map((reading, index) => (
                  <motion.div
                    key={reading.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="rounded-xl p-4 cursor-pointer border transition"
                    style={{ background: reading.bg, borderColor: reading.border }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: reading.iconBg }}>
                        {reading.icon}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">{reading.planet}</span>
                      <ChevronRight size={12} className="text-gray-400 ml-auto" />
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm mb-1">{reading.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{reading.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-5">

            {/* Family & Friends */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-bold text-gray-900">Family & Friends</h2>
                <ChevronRight size={16} className="text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mb-4">0 of 0 profiles</p>
              <div className="flex gap-3 mb-4">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-2xl">
                    🧑
                  </div>
                  <span className="text-xs text-gray-600 font-medium">You</span>
                  <span className="text-xs text-gray-400">Self</span>
                </div>
              </div>
              <button className="w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-600 text-sm py-2.5 rounded-xl font-medium transition">
                + Add Profile
              </button>
            </motion.div>

            {/* Kundali Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-gray-900">My Kundali</h2>
                <Link to="/services/kundali">
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>

              {/* Kundali Chart Visual */}
              <div className="relative w-full aspect-square border-2 border-orange-200 rounded-xl mb-4 bg-orange-50/50 overflow-hidden">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer border */}
                  <rect x="5" y="5" width="190" height="190" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.3" />
                  {/* Inner diamond */}
                  <polygon points="100,15 185,100 100,185 15,100" fill="none" stroke="#f97316" strokeWidth="1" opacity="0.4" />
                  {/* Diagonals */}
                  <line x1="5" y1="5" x2="195" y2="195" stroke="#f97316" strokeWidth="0.5" opacity="0.2" />
                  <line x1="195" y1="5" x2="5" y2="195" stroke="#f97316" strokeWidth="0.5" opacity="0.2" />
                  {/* Cross */}
                  <line x1="100" y1="5" x2="100" y2="195" stroke="#f97316" strokeWidth="0.5" opacity="0.2" />
                  <line x1="5" y1="100" x2="195" y2="100" stroke="#f97316" strokeWidth="0.5" opacity="0.2" />
                  {/* House numbers */}
                  <text x="100" y="30" textAnchor="middle" fontSize="8" fill="#9a3412" opacity="0.7">Su Ju Ve</text>
                  <text x="170" y="100" textAnchor="middle" fontSize="8" fill="#9a3412" opacity="0.7">Ma</text>
                  <text x="100" y="175" textAnchor="middle" fontSize="8" fill="#9a3412" opacity="0.7">Mo Sa</text>
                  <text x="30" y="100" textAnchor="middle" fontSize="8" fill="#9a3412" opacity="0.7">Ra</text>
                  <text x="155" y="40" textAnchor="middle" fontSize="7" fill="#9a3412" opacity="0.6">Ke Asc</text>
                  <text x="20" y="40" textAnchor="middle" fontSize="7" fill="#9a3412" opacity="0.6">11</text>
                  <text x="180" y="40" textAnchor="middle" fontSize="7" fill="#9a3412" opacity="0.6">5</text>
                  <text x="20" y="170" textAnchor="middle" fontSize="7" fill="#9a3412" opacity="0.6">12</text>
                  <text x="180" y="170" textAnchor="middle" fontSize="7" fill="#9a3412" opacity="0.6">4</text>
                </svg>
              </div>

              {/* Signs */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'ASCENDANT', value: 'Scorpio', color: 'text-purple-600', bg: 'bg-purple-50 border-purple-100' },
                  { label: 'SUN SIGN', value: 'Leo', color: 'text-yellow-600', bg: 'bg-yellow-50 border-yellow-100' },
                  { label: 'MOON SIGN', value: 'Gemini', color: 'text-blue-600', bg: 'bg-blue-50 border-blue-100' },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ scale: 1.05 }}
                    className={`${item.bg} border rounded-xl p-2 text-center`}
                  >
                    <p className="text-[9px] text-gray-400 font-semibold tracking-wide mb-1">{item.label}</p>
                    <p className={`text-xs font-bold ${item.color}`}>{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Kundali Match */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-gray-900">Kundali Match</h2>
                <Link to="/services/kundali-matching">
                  <ChevronRight size={16} className="text-gray-400" />
                </Link>
              </div>
              <p className="text-gray-400 text-xs mb-4 flex items-center gap-1">
                ❤️ Discover your cosmic compatibility with Vedic astrology
              </p>
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">👤</div>
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 font-bold text-sm">+</div>
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center text-2xl">👤</div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-pink-50 border border-pink-100 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide">CRITERIA</p>
                  <p className="font-bold text-pink-600 text-sm mt-1">8 Gunas</p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide">ANALYSIS</p>
                  <p className="font-bold text-purple-600 text-sm mt-1">Vedic</p>
                </div>
              </div>
              <Link to="/services/kundali-matching">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-semibold transition shadow-sm shadow-orange-200"
                >
                  Match Now 💑
                </motion.button>
              </Link>
            </motion.div>

            {/* Today's Panchang */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-1">
                <h2 className="font-bold text-gray-900">Today's Panchang</h2>
                <Calendar size={16} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-xs mb-4 flex items-center gap-1">
                📍 Jabalpur, India
              </p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide">TITHI</p>
                  <p className="font-bold text-gray-800 text-sm mt-1">Krishna Navami</p>
                </div>
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3">
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide">NAKSHATRA</p>
                  <p className="font-bold text-gray-800 text-sm mt-1">Uttara Ashadha</p>
                </div>
              </div>
              <div className="flex justify-between items-center bg-gray-50 rounded-xl px-4 py-2">
                <span className="text-yellow-500 font-medium text-sm flex items-center gap-1">
                  <Sun size={14} /> 05:47 am
                </span>
                <div className="w-px h-4 bg-gray-200"></div>
                <span className="text-blue-500 font-medium text-sm flex items-center gap-1">
                  <Moon size={14} /> 06:24 pm
                </span>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard