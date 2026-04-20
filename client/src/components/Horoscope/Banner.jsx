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

const SIGNS = [
    { name: "Aries",       symbol: aries,       date: "Mar 21 - Apr 19", element: "Fire",  lucky: "9",  color: "Red" },
    { name: "Taurus",      symbol: taurus,      date: "Apr 20 - May 20", element: "Earth", lucky: "6",  color: "Green" },
    { name: "Gemini",      symbol: gemini,      date: "May 21 - Jun 20", element: "Air",   lucky: "5",  color: "Yellow" },
    { name: "Cancer",      symbol: cancer,      date: "Jun 21 - Jul 22", element: "Water", lucky: "2",  color: "Silver" },
    { name: "Leo",         symbol: leo,         date: "Jul 23 - Aug 22", element: "Fire",  lucky: "1",  color: "Gold" },
    { name: "Virgo",       symbol: virgo,       date: "Aug 23 - Sep 22", element: "Earth", lucky: "3",  color: "Blue" },
    { name: "Libra",       symbol: libra,       date: "Sep 23 - Oct 22", element: "Air",   lucky: "4",  color: "Pink" },
    { name: "Scorpio",     symbol: scorpio,     date: "Oct 23 - Nov 21", element: "Water", lucky: "8",  color: "Black" },
    { name: "Sagittarius", symbol: sagittarius, date: "Nov 22 - Dec 21", element: "Fire",  lucky: "3",  color: "Purple" },
    { name: "Capricorn",   symbol: capricorn,   date: "Dec 22 - Jan 19", element: "Earth", lucky: "4",  color: "Brown" },
    { name: "Aquarius",    symbol: aquarius,    date: "Jan 20 - Feb 18", element: "Air",   lucky: "7",  color: "Blue" },
    { name: "Pisces",      symbol: pisces,      date: "Feb 19 - Mar 20", element: "Water", lucky: "3",  color: "Sea Green" },
];

// ✅ Animation Wrapper
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

// ✅ Zodiac Card
const ZodiacCard = ({ sign, isSelected, onClick }) => {
    return (
        <motion.div
            onClick={onClick}
            whileHover={{ y: -5, scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
            className={`border rounded-xl p-4 text-center flex flex-col items-center 
                cursor-pointer transition-all duration-300 group shadow-sm hover:shadow-md
                ${isSelected
                    ? "border-orange-400 bg-orange-50 shadow-md"
                    : "bg-white border-zinc-200 hover:border-orange-400"
                }`}
        >
            <motion.img
                src={sign.symbol}
                alt={sign.name}
                className="w-14 h-14 rounded-full bg-orange-50 p-3"
                whileHover={{ rotate: 12 }}
            />
            <h3 className={`mt-3 text-[15px] font-semibold ${isSelected ? "text-orange-500" : "text-[#0a0a5f] group-hover:text-orange-500"}`}>
                {sign.name}
            </h3>
            <p className="text-[12px] text-gray-500 mt-1">{sign.date}</p>
        </motion.div>
    );
};

// ✅ Banner Component
const Banner = ({ selectedSign, setSelectedSign }) => {

    const handleClick = (sign) => {
        // click same sign again = deselect
        if (selectedSign?.name === sign.name) {
            setSelectedSign(null);
        } else {
            setSelectedSign(sign);
            // smooth scroll down to Data section
            setTimeout(() => {
                document.getElementById("horoscope-data")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <div>
            {/* 🔹 Hero Banner */}
            <div className="relative h-72 md:h-80 flex flex-col items-center justify-center">
                <img
                    src={bannerImg}
                    alt="Astro AI Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />
                <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
                    Home / <span className="text-orange-400">Horoscope</span>
                </h1>
                <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
                    See today's cosmic forecast and plan your day with confidence.
                </p>
            </div>

            {/* 🔹 Instruction */}
            <div className="text-center pt-10 pb-2 px-4">
                <p className="text-[#0a0a5f] text-lg font-medium">
                    ✨ Click your zodiac sign to see today's horoscope
                </p>
            </div>

            {/* 🔹 Zodiac Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-5 md:gap-6 px-6 md:px-36 py-10">
                {SIGNS.map((sign, i) => (
                    <AnimateOnScroll key={sign.name} delay={i * 0.06}>
                        <ZodiacCard
                            sign={sign}
                            isSelected={selectedSign?.name === sign.name}
                            onClick={() => handleClick(sign)}
                        />
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    );
};

export default Banner;