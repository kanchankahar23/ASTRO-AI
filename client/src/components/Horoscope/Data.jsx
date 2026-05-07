import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import api from "../../api/axiosInstance";

// ✅ Animation Wrapper
const AnimateOnScroll = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    );
};

const getStatMessage = (title, percent) => {
    if (title === "Body") {
        if (percent >= 80) return "The cosmic forces align with your physical being today. Your vitality is extraordinary — your body is a temple charged with stellar energy. Channel this strength into movement, exercise, and bold action. The universe rewards those who honor their physical form. 💪✨";
        if (percent >= 60) return "Your physical energy flows at a steady, balanced pace today. The stars suggest light activity and mindful nourishment. Listen to your body's rhythms — it carries ancient wisdom. A walk, some stretching, or time in nature will amplify your cosmic connection. 🌿";
        return "The stars call for rest and gentle restoration today, dear soul. Your body carries the weight of past efforts — honor that. Even the moon needs to wane before it glows full again. Sleep early, eat well, and trust that tomorrow brings renewed vitality. 🌙";
    }

    if (title === "Mind") {
        if (percent >= 80) return "Mercury blesses your intellect with extraordinary clarity today. Your thoughts cut through confusion like a cosmic sword — ideas flow, solutions appear, and wisdom speaks loudly within you. This is an ideal time for decisions, creative work, deep study, or important conversations. Trust your brilliant mind. 🧠✨";
        if (percent >= 60) return "Your mind is calm, focused, and quietly powerful today. The stars suggest channeling this mental clarity into tasks that require patience and precision. Avoid overthinking — your instincts are aligned with the universe right now. Write, plan, or simply reflect in stillness. 💭";
        return "The celestial energies suggest your mind needs gentle rest today. Mental fog is the universe's way of asking you to slow down and look inward. Meditation, breathing exercises, or a quiet walk can restore your mental harmony. Clarity returns — but only when you stop forcing it. 🌸";
    }

    if (title === "Wealth") {
        if (percent >= 80) return "Jupiter, the planet of abundance, smiles upon your financial realm today. Opportunities for growth, unexpected income, or wise investments may present themselves — stay alert and act with confidence. The universe is conspiring to fill your cup. Spend wisely, save intentionally, and abundance multiplies. 💰✨";
        if (percent >= 60) return "Your financial energy is stable and grounded today. The stars advise neither reckless spending nor fearful hoarding — instead, make one smart, intentional decision today that your future self will thank you for. Small disciplined actions compound into great wealth over time. 📈";
        return "The stars counsel financial caution today, dear one. Avoid impulsive purchases or risky ventures — the cosmic timing is not yet aligned for major financial moves. Instead, review your resources, cut unnecessary expenses, and trust that this period of restraint is preparing you for a season of great abundance. 🪙";
    }

    if (title === "Love") {
        if (percent >= 80) return "Venus, the goddess of love, wraps your heart in golden light today. Your energy is magnetic, warm, and deeply attractive — those around you feel it. Whether single or committed, love flows freely to and from you. Express your feelings openly, be vulnerable, and watch beautiful connections deepen into something extraordinary. ❤️✨";
        if (percent >= 60) return "Your relationships carry a quiet, steady warmth today. The stars remind you that love is not always fireworks — sometimes it is the gentle comfort of presence, patience, and understanding. Reach out to someone you cherish. A simple, sincere gesture carries more cosmic power than grand declarations today. 💕";
        return "The stars invite you to look inward before reaching outward in love today. Sometimes the heart needs solitude to understand what it truly desires. Be patient with yourself and those close to you. Misunderstandings dissolve when approached with compassion. Love yourself first — everything else aligns from that sacred foundation. 🌹";
    }

    if (title === "Health") {
        if (percent >= 80) return "The healing stars shine brightly upon your wellbeing today. Your immune system, energy levels, and inner vitality are operating at a beautiful peak. Use this powerful window to establish healthy habits that will carry you through the entire lunar cycle. Your body and soul are in perfect cosmic harmony. 🌿✨";
        if (percent >= 60) return "Your health energy is balanced and steady today — a calm river flowing in the right direction. The stars suggest maintaining your routine, staying hydrated, and prioritizing sleep tonight. Your body is working quietly on your behalf. Honor it with nourishing food and peaceful thoughts. 💧";
        return "The cosmos gently whispers — slow down and listen to what your body is telling you today. Ignoring subtle signs of fatigue or stress leads to larger imbalances later. Rest without guilt. Nourish without judgment. The universe does not reward constant pushing — it honors those wise enough to pause and restore. 🌙";
    }

    if (title === "Career") {
        if (percent >= 80) return "The stars have written success across your professional sky today. You carry the energy of someone destined to lead, create, and inspire. Your ambition is not arrogance — it is cosmic purpose calling you forward. Take bold steps, share your ideas fearlessly, and claim the recognition that your dedication has long deserved. The universe backs your every move. 🚀✨";
        if (percent >= 60) return "Your professional energy is focused and quietly powerful today. The stars suggest steady progress over dramatic leaps — show up fully, do your work with integrity, and let your consistency speak louder than words. Recognition may not arrive today, but the seeds you plant now will bloom into remarkable opportunities very soon. 💼⭐";
        return "The cosmic tides suggest a period of strategic stillness in your career today. Step back, observe, and plan rather than force outcomes. Every great career has seasons of preparation — this is yours. Use this time to sharpen your skills, deepen your knowledge, and align your ambitions with your true purpose. Your breakthrough is closer than it appears. 🌱";
    }

    return "";
};

const PERIODS = ["Daily", "Weekly", "Monthly"];

const Data = ({ selectedSign }) => {
    const [horoscope, setHoroscope] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activePeriod, setActivePeriod] = useState("Daily");
    const [signData, setSignData] = useState(null);

    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
    });

    // ✅ Build stats from backend signData
    const stats = signData ? [
        { title: "Body",   percent: signData.stats.body,   icon: "💪", color: "from-orange-400 to-red-500" },
        { title: "Mind",   percent: signData.stats.mind,   icon: "🧠", color: "from-blue-400 to-indigo-500" },
        { title: "Wealth", percent: signData.stats.wealth, icon: "💰", color: "from-yellow-400 to-orange-500" },
        { title: "Love",   percent: signData.stats.love,   icon: "❤️", color: "from-pink-400 to-rose-500" },
        { title: "Health", percent: signData.stats.health, icon: "🌿", color: "from-green-400 to-emerald-500" },
        { title: "Career", percent: signData.stats.career, icon: "🚀", color: "from-purple-400 to-indigo-600" },
    ] : [];

    // ✅ Fetch from backend when sign or period changes
    useEffect(() => {
        if (!selectedSign) return;

        const fetchHoroscope = async () => {
            setLoading(true);
            setError("");
            setHoroscope("");

            try {
                const res = await api.get(`/horoscope/${selectedSign.name.toLowerCase()}`);

                if (res.data.success) {
                    const data = res.data.data;
                    setSignData(data);

                    if (activePeriod === "Daily") {
                        setHoroscope(data.daily_message);
                    } else if (activePeriod === "Weekly") {
                        setHoroscope(data.weekly);
                    } else {
                        setHoroscope(
                            `${data.weekly} Your strengths this month: ${data.strengths}. Focus on: ${data.career}`
                        );
                    }
                } else {
                    setError("Could not fetch horoscope. Please try again.");
                }
            } catch (err) {
                console.error(err);
                setError("Network error. Make sure backend is running.");
            } finally {
                setLoading(false);
            }
        };

        fetchHoroscope();
    }, [selectedSign, activePeriod]);

    return (
        <div id="horoscope-data" className="md:p-10 sm:p-20 md:px-36 min-h-screen flex flex-col">
            <div className="border-2 border-zinc-200 p-8 rounded-md">

                {/* 🔹 Header */}
                <AnimateOnScroll>
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-4 p-2 rounded-xl">
                            <img
                                src={selectedSign.symbol}
                                alt={selectedSign.name}
                                className="w-16 h-16 rounded-full border-4 border-orange-400 bg-orange-50 p-2"
                            />
                            <div>
                                <h1 className="text-xl text-[#0a0a5f] font-bold">{selectedSign.name}</h1>
                                <p className="text-gray-500 text-sm">{today}</p>
                            </div>
                        </div>

                        {/* Period Tabs */}
                        <div className="flex gap-2 bg-orange-50 p-1 rounded-full w-fit">
                            {PERIODS.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActivePeriod(item)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer
                                        ${activePeriod === item
                                            ? "bg-orange-400 text-white shadow"
                                            : "text-[#0a0a5f] hover:bg-orange-200"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* 🔹 Lucky Info */}
                <AnimateOnScroll delay={0.2}>
                    <div className="mt-4 flex justify-between bg-pink-50 p-4 rounded-xl shadow flex-wrap gap-4">
                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Lucky Color:</p>
                            <span className="font-semibold text-orange-500">
                                🎨 {signData?.lucky_color || selectedSign.color}
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Lucky Number:</p>
                            <span className="font-semibold text-[#0a0a5f]">
                                ✨ {signData?.lucky_number || selectedSign.lucky}
                            </span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Element:</p>
                            <span className="font-semibold text-[#0a0a5f]">
                                🌿 {signData?.element || selectedSign.element}
                            </span>
                        </div>
                    </div>
                </AnimateOnScroll>

                {/* 🔹 Horoscope Text */}
                <AnimateOnScroll delay={0.3}>
                    <div className="mt-6 bg-orange-50 border border-orange-100 rounded-xl p-5">
                        <h4 className="text-orange-500 font-semibold mb-3 text-base">
                            🔮 {activePeriod} Horoscope — {selectedSign.name}
                        </h4>

                        {loading && (
                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
                                <p className="text-gray-500 text-sm">Fetching your cosmic forecast...</p>
                            </div>
                        )}

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        {!loading && !error && horoscope && (
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="text-gray-700 leading-relaxed"
                            >
                                {horoscope}
                            </motion.p>
                        )}
                    </div>
                </AnimateOnScroll>

                {/* 🔹 Stats Section — from backend with messages */}
                <div className="mt-6 grid grid-cols-1 gap-4">

                    {/* Loading Skeleton — shows while data loads */}
                    {stats.length === 0 && (
                        [...Array(6)].map((_, i) => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
                                <div className="flex justify-between mb-2">
                                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                                    <div className="h-4 bg-gray-200 rounded w-10" />
                                </div>
                                <div className="h-2 bg-gray-200 rounded w-full mb-2" />
                                <div className="h-3 bg-gray-100 rounded w-3/4" />
                            </div>
                        ))
                    )}

                    {/* Real Stats from Backend */}
                    {stats.map((item, index) => (
                        <AnimateOnScroll key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-4 w-full flex flex-col rounded-xl shadow transition-all"
                            >
                                {/* Title + Icon + Percent */}
                                <div className="flex justify-between items-center mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{item.icon}</span>
                                        <h3 className="font-bold text-base text-gray-800">{item.title}</h3>
                                    </div>
                                    <span className="text-sm font-semibold text-[#0a0a5f]">{item.percent}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                    <motion.div
                                        className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                    />
                                </div>

                                {/* ✅ Message below bar */}
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                    className="text-sm text-gray-500 mt-2 italic"
                                >
                                    {getStatMessage(item.title, item.percent)}
                                </motion.p>

                            </motion.div>
                        </AnimateOnScroll>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Data;