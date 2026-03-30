import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ✅ Assets
import aries from "/ASTRO-AI/client/src/assets/taurus.svg";
import taurus from "/ASTRO-AI/client/src/assets/taurus.svg";
import gemini from "/ASTRO-AI/client/src/assets/Gemini1.svg";
import cancer from "/ASTRO-AI/client/src/assets/cancer.svg";
import leo from "/ASTRO-AI/client/src/assets/leo.svg";
import virgo from "/ASTRO-AI/client/src/assets/virgo.svg";
import libra from "/ASTRO-AI/client/src/assets/libra.svg";
import scorpio from "/ASTRO-AI/client/src/assets/scorpio.svg";
import sagittarius from "/ASTRO-AI/client/src/assets/sagittairus.svg";
import capricorn from "/ASTRO-AI/client/src/assets/capricorn.svg";
import aquarius from "/ASTRO-AI/client/src/assets/aquarius.svg";
import pisces from "/ASTRO-AI/client/src/assets/pisces.svg";
import bannerImg from "/ASTRO-AI/client/src/assets/Kundali_banner.avif";

// ✅ Zodiac Data
const SIGNS = [
    { name: "Aries", symbol: aries, date: "Mar 21 - Apr 19" },
    { name: "Taurus", symbol: taurus, date: "Apr 20 - May 20" },
    { name: "Gemini", symbol: gemini, date: "May 21 - Jun 20" },
    { name: "Cancer", symbol: cancer, date: "Jun 21 - Jul 22" },
    { name: "Leo", symbol: leo, date: "Jul 23 - Aug 22" },
    { name: "Virgo", symbol: virgo, date: "Aug 23 - Sep 22" },
    { name: "Libra", symbol: libra, date: "Sep 23 - Oct 22" },
    { name: "Scorpio", symbol: scorpio, date: "Oct 23 - Nov 21" },
    { name: "Sagittarius", symbol: sagittarius, date: "Nov 22 - Dec 21" },
    { name: "Capricorn", symbol: capricorn, date: "Dec 22 - Jan 19" },
    { name: "Aquarius", symbol: aquarius, date: "Jan 20 - Feb 18" },
    { name: "Pisces", symbol: pisces, date: "Feb 19 - Mar 20" },
];

// ✅ Reusable Animation Wrapper
const AnimateOnScroll = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay }}
        >
            {children}
        </motion.div>
    );
};

// ✅ Card Component (clean separation)
const ZodiacCard = ({ sign }) => {
    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className="bg-white border border-zinc-200 hover:border-orange-400 
                 rounded-xl p-4 text-center flex flex-col items-center 
                 cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md"
        >
            {/* Icon */}
            <motion.img
                src={sign.symbol}
                alt={sign.name}
                className="w-14 h-14 rounded-full bg-orange-50 p-3"
                whileHover={{ rotate: 12 }}
            />

            {/* Name */}
            <h3 className="mt-3 text-[15px] font-semibold text-[#0a0a5f] group-hover:text-orange-500">
                {sign.name}
            </h3>

            {/* Date */}
            <p className="text-[12px] text-gray-500 mt-1">{sign.date}</p>
        </motion.div>
    );
};

// ✅ Main Component
const Banner = () => {
    return (
        <div>
            {/* 🔹 Hero Section */}
            <div className="relative h-72 md:h-80 flex flex-col items-center justify-center">

                {/* Background image */}
                <img
                    src={bannerImg}
                    alt="Astro AI Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Main heading */}
                <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
                    Home / <span className="text-orange-400">Horoscope</span>
                </h1>{/* Subtitle / Description */}
  <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
    See today’s cosmic forecast and plan your day with confidence.
  </p>
            </div>

            {/* 🔹 Zodiac Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 md:gap-6 px-6 md:px-36 py-20">

                {SIGNS.map((sign, i) => (
                    <AnimateOnScroll key={sign.name} delay={i * 0.06}>
                        <ZodiacCard sign={sign} />
                    </AnimateOnScroll>
                ))}

            </div>
        </div>
    );
};

export default Banner;