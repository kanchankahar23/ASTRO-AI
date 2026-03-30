import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Data = () => {

    // ✅ Animation Wrapper Component
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

    // ✅ Data
    const stats = [
        {
            title: "Body",
            percent: 40,
            desc: "Your physical energy may feel slightly low today. Focus on rest, hydration, and light activity to maintain balance."
        },
        {
            title: "Mind",
            percent: 60,
            desc: "You are mentally stable with moments of clarity. Avoid overthinking and trust your instincts in decision-making."
        },
        {
            title: "Wealth",
            percent: 75,
            desc: "Financially, this is a favorable period. You may see gains or opportunities to improve your financial stability."
        },
        {
            title: "Love",
            percent: 50,
            desc: "Your love life is balanced but may need attention. Open communication will help strengthen relationships."
        },
        {
            title: "Health",
            percent: 65,
            desc: "Overall health looks stable. Maintain a proper routine and avoid stress to keep your well-being in check."
        },
        {
            title: "Career",
            percent: 80,
            desc: "Career growth is strong. Your efforts are likely to be recognized, and new opportunities may come your way."
        }
    ];

    return (
        <div className="md:p-10 sm:p-20 md:px-36  min-h-screen flex flex-col ">
            <div className="border-2 border-zinc-200 p-8 rounded-md">
                {/* 🔹 Header */}
                <AnimateOnScroll>
                    <div className="flex justify-between items-center flex-wrap gap-4">

                        {/* Zodiac Info */}
                        <div className="flex items-center gap-4 p-2 rounded-xl">
                            <img
                                src="https://media.istockphoto.com/id/1442485126/photo/white-cheeked-barbet-sitting-on-the-tree-trunk-with-beautiful-background.webp"
                                alt="zodiac"
                                className="w-16 h-16 rounded-full border-4 border-orange-400"
                            />
                            <div>
                                <h1 className="text-xl text-[#0a0a5f] font-bold">Aries</h1>
                                <p className="text-gray-500 text-sm">27 March 2026</p>
                            </div>
                        </div>

                        {/* Dropdown */}
                        <div className="flex gap-2 bg-orange-50 p-1 rounded-full w-fit">
                            {["Daily", "Weekly", "Monthly"].map((item) => (
                                <button
                                    key={item}
                                    className="
        px-4 py-1.5 rounded-full text-sm font-medium
        text-[#0a0a5f]
        hover:bg-orange-200
        transition-all
      "
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
                            <span className="font-semibold text-red-500">🔴 Red</span>
                        </div>

                        <div className="flex gap-2 items-center">
                            <p className="text-[#0a0a5f] font-semibold text-sm">Lucky Number:</p>
                            <span className="font-semibold text-[#0a0a5f]">✨ 9</span>
                        </div>

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
                                    <h3 className="font-bold text-base text-gray-800">
                                        {item.title}
                                    </h3>
                                    <span className="text-sm font-semibold text-[#0a0a5f]">
                                        {item.percent}%
                                    </span>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2 mb-3 overflow-hidden">
                                    <motion.div
                                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                </div>

                                {/* Description */}
                                <p className="text-gray-600 text-sm">
                                    {item.desc}
                                </p>

                            </motion.div>

                        </AnimateOnScroll>
                    ))}

                </div>

            </div>

        </div>
    );
};

export default Data;