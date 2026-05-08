import { useState, useRef, useEffect } from 'react'
import { Send, X, User, Clock, MapPin, Star } from 'lucide-react'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import aiAstro from "../assets/ai-astro.jpg"
import { motion, AnimatePresence } from 'framer-motion'

// ── Kundali Popup ─────────────────────────────────────────────────
const KundaliPopup = ({ onSubmit }) => {
    const [form, setForm] = useState({
        name: '', dob: '', time: '', place: ''
    })
    const [error, setError] = useState('')

    const handleSubmit = () => {
        if (!form.name || !form.dob || !form.time || !form.place) {
            setError('Please fill all fields!')
            return
        }
        onSubmit(form)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-2xl p-7 w-full max-w-md mx-4"
            >
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="text-4xl mb-2">🔮</div>
                    <h2 className="text-2xl font-bold text-[#0a0a5f]">Welcome to Kaira AI</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Enter your birth details so Kaira can give you personalized cosmic guidance
                    </p>
                </div>

                {/* Form */}
                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your full name"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Date of Birth</label>
                        <input
                            type="date"
                            value={form.dob}
                            onChange={e => setForm({ ...form, dob: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Time of Birth</label>
                        <input
                            type="time"
                            value={form.time}
                            onChange={e => setForm({ ...form, time: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 block">Birth Place</label>
                        <input
                            type="text"
                            placeholder="Enter your birth place"
                            value={form.place}
                            onChange={e => setForm({ ...form, place: e.target.value })}
                            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-xs">⚠️ {error}</p>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition"
                    >
                        ✨ Start My Cosmic Journey
                    </motion.button>

                    <p className="text-center text-xs text-gray-400">
                        Your details help Kaira give personalized astrology readings
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

// ── Get Zodiac from DOB ───────────────────────────────────────────
const getZodiac = (dob) => {
    if (!dob) return '—'
    const date = new Date(dob)
    const day = date.getDate()
    const month = date.getMonth() + 1
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries ♈'
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus ♉'
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini ♊'
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer ♋'
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo ♌'
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo ♍'
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra ♎'
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio ♏'
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius ♐'
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn ♑'
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius ♒'
    return 'Pisces ♓'
}

// ── Format date nicely ────────────────────────────────────────────
const formatDate = (dob) => {
    if (!dob) return '—'
    return new Date(dob).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    })
}

// ── Main Component ────────────────────────────────────────────────
const AI_Kaira = () => {
    const { user } = useUser()

    // ✅ Kundali info state
    const [kundaliInfo, setKundaliInfo] = useState(null)
    const [showPopup, setShowPopup] = useState(true)

    // ✅ Chat states
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Namaste! 🙏 I am Kaira, your personal AI Astrologer. Ask me anything about your Kundali, Zodiac, Horoscope, or spiritual guidance!'
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    // ✅ Chat history in sidebar
    const [chatSessions, setChatSessions] = useState([])
    const [sessionId, setSessionId] = useState(1)

    const messagesEndRef = useRef(null)


    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // ✅ Handle Kundali popup submit
    const handleKundaliSubmit = (form) => {
        setKundaliInfo(form)
        setShowPopup(false)
        // Add personalized welcome message
        setMessages([{
            role: 'ai',
            text: `Namaste ${form.name}! 🙏✨ I am Kaira, your personal AI Astrologer. I can see you were born on ${formatDate(form.dob)} at ${form.time} in ${form.place}. Your zodiac sign is ${getZodiac(form.dob)}. Ask me anything about your cosmic journey! 🔮`
        }])
        // Add to chat history
        setChatSessions([{
            id: 1,
            title: `🔮 ${form.name}'s Reading`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }])
    }

    // ✅ Send message
    const sendMessage = async () => {
        if (!input.trim()) return
        const userMessage = input.trim()
        setInput('')

        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setLoading(true)

        try {
            const history = messages
                .slice(1)
                .map(msg => ({
                    role: msg.role === 'ai' ? 'assistant' : 'user',
                    content: msg.text
                }))

            // ✅ Include kundali context in message
            const contextMessage = kundaliInfo
                ? `[User Info: Name=${kundaliInfo.name}, DOB=${kundaliInfo.dob}, Time=${kundaliInfo.time}, Place=${kundaliInfo.place}, Zodiac=${getZodiac(kundaliInfo.dob)}] User says: ${userMessage}`
                : userMessage

            const res = await axios.post('http://localhost:5000/api/ai/chat', {
                message: contextMessage,
                history
            })

            const reply = res.data.reply
            setMessages(prev => [...prev, { role: 'ai', text: reply }])

            // ✅ Update chat history title with latest message
            setChatSessions(prev => {
                if (prev.length === 0) return prev
                const updated = [...prev]
                updated[0] = {
                    ...updated[0],
                    title: `💬 ${userMessage.slice(0, 25)}${userMessage.length > 25 ? '...' : ''}`
                }
                return updated
            })

        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: '✨ The cosmic energies are momentarily disrupted. Please try again dear soul! 🙏'
            }])
        }

        setLoading(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage()
    }

    // ✅ Start new chat
    const startNewChat = () => {
        const newId = sessionId + 1
        setSessionId(newId)
        const newSession = {
            id: newId,
            title: `🔮 New Reading`,
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
        }
        setChatSessions(prev => [newSession, ...prev])
        setMessages([{
            role: 'ai',
            text: kundaliInfo
                ? `Welcome back ${kundaliInfo.name}! 🙏✨ What cosmic question is on your mind today?`
                : 'Namaste! 🙏 I am Kaira, your personal AI Astrologer. Ask me anything!'
        }])
    }

    return (
        <>
            {/* ✅ Kundali Popup */}
            <AnimatePresence>
                {showPopup && <KundaliPopup onSubmit={handleKundaliSubmit} />}
            </AnimatePresence>

            <div
                style={{ height: 'calc(100vh - 50px)', position: 'fixed', top: '70px', left: 0, right: 0 }}
                className="flex gap-4 p-4 bg-gray-100"
            >

                {/* ── LEFT SIDEBAR ─────────────────────────────── */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-64 bg-white shadow-md p-4 flex flex-col rounded-xl"
                >
                    <h1 className="text-2xl font-bold text-[#0a0a5f] text-center font-serif mb-3">
                        Kaira <span className="text-orange-500">AI</span>
                    </h1>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startNewChat}
                        className="bg-orange-500 text-white py-2 rounded-lg mb-4 hover:bg-orange-600 transition font-medium"
                    >
                        + New Chat
                    </motion.button>

                    <h2 className="font-semibold text-sm text-[#0a0a5f] mb-2">Chat History</h2>
                    <hr className="mb-3" />

                    {/* ✅ Chat history list */}
                    <div className="space-y-2 text-sm text-gray-700 overflow-y-auto flex-1">
                        <AnimatePresence>
                            {chatSessions.length === 0 ? (
                                <p className="text-gray-400 text-xs text-center mt-4">
                                    No chats yet. Start a conversation!
                                </p>
                            ) : (
                                chatSessions.map((chat) => (
                                    <motion.div
                                        key={chat.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="hover:bg-orange-50 hover:text-orange-700 p-2.5 rounded-lg cursor-pointer border border-transparent hover:border-orange-200 transition-all"
                                    >
                                        <p className="truncate font-medium text-xs">{chat.title}</p>
                                        <p className="text-gray-400 text-[10px] mt-0.5">{chat.time}</p>
                                    </motion.div>
                                ))
                            )}
                        </AnimatePresence>
                    </div>

                    {/* ✅ Edit Kundali button */}
                    <button
                        onClick={() => setShowPopup(true)}
                        className="mt-3 text-xs text-orange-500 hover:text-orange-700 border border-orange-200 rounded-lg py-1.5 transition"
                    >
                        ✏️ Edit Birth Details
                    </button>
                </motion.div>

                {/* ── MIDDLE CHAT ──────────────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex-1 bg-white rounded-xl shadow-md flex flex-col p-6"
                >
                    {/* Messages */}
                    <div className="flex-1 space-y-4 overflow-y-auto mb-4 pr-2">
                        <AnimatePresence>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                                >
                                    {msg.role === 'ai' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-9 h-9 rounded-full overflow-hidden bg-orange-500 flex items-center justify-center flex-shrink-0"
                                        >
                                            <img
                                                src={aiAstro}
                                                alt="AI Astro"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    )}
                                    <div className={`p-3 rounded-xl max-w-md text-sm leading-relaxed ${msg.role === 'ai'
                                            ? 'bg-gray-100 text-[#0a0a5f]'
                                            : 'bg-orange-100 border border-orange-300 text-[#d74b00]'
                                        }`}>
                                        {msg.text}
                                    </div>
                                    {msg.role === 'user' && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                        >
                                            {kundaliInfo?.name?.[0]?.toUpperCase() || user?.firstName?.[0] || 'U'}
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Loading dots */}
                        {loading && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-start gap-3"
                            >
                                <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
                                     <img
                                                src={aiAstro}
                                                alt="AI Astro"
                                                className="w-full h-full object-cover"
                                            />
                                </div>
                                <div className="bg-gray-100 p-3 rounded-xl">
                                    <div className="flex gap-1">
                                        {[0, 1, 2].map((i) => (
                                            <motion.span
                                                key={i}
                                                animate={{ y: [0, -6, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                                                className="w-2 h-2 bg-orange-400 rounded-full block"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-3"
                    >
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask Kaira anything about astrology..."
                            className="flex-1 border rounded-full border-zinc-400 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
                        />
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={sendMessage}
                            disabled={loading}
                            className="w-11 h-11 bg-orange-600 flex justify-center items-center text-white rounded-full hover:bg-orange-700 transition disabled:opacity-50"
                        >
                            <Send size={16} />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT SIDEBAR ─────────────────────────────── */}
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-72 flex flex-col gap-4"
                >
                    {/* ✅ User + Kundali Info Card */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white p-5 rounded-2xl shadow-lg"
                    >
                        {/* User avatar + name */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                                {kundaliInfo?.name?.[0]?.toUpperCase() || user?.firstName?.[0] || 'U'}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#0a0a5f]">
                                    {kundaliInfo?.name || user?.fullName || 'Guest User'}
                                </h3>
                                <p className="text-xs text-gray-400">
                                    {user?.primaryEmailAddress?.emailAddress || 'Cosmic Traveler'}
                                </p>
                            </div>
                        </div>

                        {/* ✅ Kundali details from popup */}
                        <div className="grid grid-cols-2 gap-2.5 text-sm">
                            <motion.div whileHover={{ scale: 1.03 }} className="bg-orange-50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-1">
                                    <User size={10} className="text-orange-400" />
                                    <p className="text-gray-400 text-[10px]">Date of Birth</p>
                                </div>
                                <p className="font-semibold text-[#0a0a5f] text-xs">
                                    {kundaliInfo ? formatDate(kundaliInfo.dob) : '—'}
                                </p>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} className="bg-orange-50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-1">
                                    <Clock size={10} className="text-orange-400" />
                                    <p className="text-gray-400 text-[10px]">Birth Time</p>
                                </div>
                                <p className="font-semibold text-[#0a0a5f] text-xs">
                                    {kundaliInfo?.time || '—'}
                                </p>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} className="bg-orange-50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-1">
                                    <MapPin size={10} className="text-orange-400" />
                                    <p className="text-gray-400 text-[10px]">Birth Place</p>
                                </div>
                                <p className="font-semibold text-[#0a0a5f] text-xs">
                                    {kundaliInfo?.place || '—'}
                                </p>
                            </motion.div>

                            <motion.div whileHover={{ scale: 1.03 }} className="bg-orange-50 rounded-xl p-3">
                                <div className="flex items-center gap-1 mb-1">
                                    <Star size={10} className="text-orange-400" />
                                    <p className="text-gray-400 text-[10px]">Zodiac Sign</p>
                                </div>
                                <p className="font-semibold text-orange-500 text-xs">
                                    {kundaliInfo ? getZodiac(kundaliInfo.dob) : '—'}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* About Kaira Card */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        className="bg-white p-5 rounded-2xl shadow-lg flex-1"
                    >
                        <h2 className="text-lg font-bold text-orange-500 mb-4">
                            🔮 About Kaira AI
                        </h2>
                        <div className="space-y-3 text-sm text-gray-600">
                            {[
                                { icon: '✨', text: 'Expert Vedic Astrologer' },
                                { icon: '🪐', text: 'Planetary Positions Expert' },
                                { icon: '📜', text: 'Kundali Reading Specialist' },
                                { icon: '💕', text: 'Compatibility Analysis' },
                                { icon: '🔢', text: 'Numerology Expert' },
                                { icon: '🌟', text: '24/7 Available' },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-2"
                                >
                                    <span>{item.icon}</span>
                                    <p>{item.text}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                </motion.div>
            </div>
        </>
    )
}

export default AI_Kaira