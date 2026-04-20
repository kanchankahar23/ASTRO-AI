import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

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

// ✅ Static stats (visual only — no real API for these)
const getStats = () => [
    { title: "Body",   percent: Math.floor(Math.random() * 40) + 40 },
    { title: "Mind",   percent: Math.floor(Math.random() * 40) + 40 },
    { title: "Wealth", percent: Math.floor(Math.random() * 40) + 40 },
    { title: "Love",   percent: Math.floor(Math.random() * 40) + 40 },
    { title: "Health", percent: Math.floor(Math.random() * 40) + 40 },
    { title: "Career", percent: Math.floor(Math.random() * 40) + 40 },
];

// ✅ Period tabs
const PERIODS = ["Daily", "Weekly", "Monthly"];

const Data = ({ selectedSign }) => {
    const [horoscope, setHoroscope] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activePeriod, setActivePeriod] = useState("Daily");
    const [stats] = useState(getStats());

    const today = new Date().toLocaleDateString("en-IN", {
        day: "numeric", month: "long", year: "numeric"
    });

    // Map period to API day param
    const periodMap = {
        Daily: "TODAY",
        Weekly: "WEEK",
        Monthly: "MONTH",
    };

    // Fetch horoscope whenever sign or period changes
    useEffect(() => {
        if (!selectedSign) return;

        const fetchHoroscope = async () => {
            setLoading(true);
            setError("");
            setHoroscope("");

            try {
                const res = await fetch(
                    `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${selectedSign.name}&day=${periodMap[activePeriod]}`
                );
                const data = await res.json();

                if (data?.data?.horoscope_data) {
                    setHoroscope(data.data.horoscope_data);
                } else {
                    setError("Could not fetch horoscope. Please try again.");
                }
            } catch (err) {
                setError("Network error. Please check your connection.");
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

                        {/* Sign Info */}
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
                            <span className="font-semibold text-orange-500">🎨 {selectedSign.color}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Lucky Number:</p>
                            <span className="font-semibold text-[#0a0a5f]">✨ {selectedSign.lucky}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Element:</p>
                            <span className="font-semibold text-[#0a0a5f]">🌿 {selectedSign.element}</span>
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

                {/* 🔹 Stats Section */}
                <div className="mt-6 grid grid-cols-1 gap-4">
                    {stats.map((item, index) => (
                        <AnimateOnScroll key={index} delay={index * 0.1}>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-white p-4 w-full flex flex-col rounded-xl shadow transition-all"
                            >
                                {/* Title + Percent */}
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="font-bold text-base text-gray-800">{item.title}</h3>
                                    <span className="text-sm font-semibold text-[#0a0a5f]">{item.percent}%</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                                    <motion.div
                                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 0.8, delay: index * 0.1 }}
                                    />
                                </div>
                            </motion.div>
                        </AnimateOnScroll>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Data;