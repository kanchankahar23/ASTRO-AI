import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import axios from 'axios'
import { useUser } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'

const AI_Kaira = () => {
    const { user } = useUser()
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Namaste! 🙏 I am Kaira, your personal AI Astrologer. Ask me anything about your Kundali, Zodiac, Horoscope, or spiritual guidance!'
        }
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: '🔮 Kundali Reading' },
        { id: 2, title: '♈ Zodiac Guidance' },
        { id: 3, title: '💕 Compatibility Check' },
    ])
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const sendMessage = async () => {
        if (!input.trim()) return
        const userMessage = input.trim()
        setInput('')
        setMessages(prev => [...prev, { role: 'user', text: userMessage }])
        setLoading(true)

        try {
            const history = messages.slice(1).map(msg => ({
                role: msg.role === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.text }]
            }))
            const res = await axios.post('http://localhost:5000/api/ai/chat', {
                message: userMessage,
                history
            })
            setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }])
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'ai',
                text: 'Sorry, I am having trouble connecting. Please try again! 🙏'
            }])
        }
        setLoading(false)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') sendMessage()
    }

    const startNewChat = () => {
        const newChat = { id: chatHistory.length + 1, title: `💬 Chat ${chatHistory.length + 1}` }
        setChatHistory(prev => [newChat, ...prev])
        setMessages([{
            role: 'ai',
            text: 'Namaste! 🙏 I am Kaira, your personal AI Astrologer. Ask me anything!'
        }])
    }

    return (
        <div
            style={{ height: 'calc(100vh - 50px)', position: 'fixed', top: '70px', left: 0, right: 0 }}
            className="flex  gap-4 p-4 bg-gray-100">

            {/* LEFT SIDEBAR */}
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

                <div className="space-y-2 text-sm text-gray-700 overflow-y-auto flex-1">
                    <AnimatePresence>
                        {chatHistory.map((chat) => (
                            <motion.p
                                key={chat.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="hover:bg-orange-100 hover:text-orange-700 p-2 rounded-md cursor-pointer truncate"
                            >
                                {chat.title}
                            </motion.p>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* MIDDLE - Chat */}
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
                                        className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                    >
                                        K
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
                                        {user?.firstName?.[0] || 'U'}
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
                                K
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

            {/* RIGHT SIDEBAR */}
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-72 flex flex-col gap-4"
            >
                {/* User Info Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-5 rounded-2xl shadow-lg"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg">
                            {user?.firstName?.[0] || 'U'}
                        </div>
                        <div>
                            <h3 className="font-bold text-[#0a0a5f]">
                                {user?.fullName || 'Guest User'}
                            </h3>
                            <p className="text-xs text-gray-400">
                                {user?.primaryEmailAddress?.emailAddress || ''}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        {[
                            { label: 'Date of Birth', value: '22-08-2003' },
                            { label: 'Time', value: '10:30 PM' },
                            { label: 'Place', value: 'Jabalpur' },
                            { label: 'Zodiac Sign', value: 'Virgo ♍', orange: true },
                        ].map((item) => (
                            <motion.div
                                key={item.label}
                                whileHover={{ scale: 1.05 }}
                                className="bg-orange-50 rounded-lg p-2"
                            >
                                <p className="text-gray-400 text-xs">{item.label}</p>
                                <p className={`font-semibold ${item.orange ? 'text-orange-500' : 'text-[#0a0a5f]'}`}>
                                    {item.value}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* About Kaira Card */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-white p-5 rounded-2xl shadow-lg flex-1"
                >
                    <h2 className="text-lg font-bold text-orange-500 mb-4 ">
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
    )
}

export default AI_Kaira