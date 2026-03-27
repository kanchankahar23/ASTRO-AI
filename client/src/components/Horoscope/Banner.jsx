import React from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
// import AnimateOnScroll from './AnimateOnScroll'
// import all images properly
import aries from '/ASTRO-AI/client/src/assets/taurus.svg'
import taurus from '/ASTRO-AI/client/src/assets/taurus.svg'
import gemini from '/ASTRO-AI/client/src/assets/Gemini1.svg'
import cancer from '/ASTRO-AI/client/src/assets/cancer.svg'
import leo from '/ASTRO-AI/client/src/assets/leo.svg'
import virgo from '/ASTRO-AI/client/src/assets/virgo.svg'
import libra from '/ASTRO-AI/client/src/assets/libra.svg'
import scorpio from '/ASTRO-AI/client/src/assets/scorpio.svg'
import sagittarius from '/ASTRO-AI/client/src/assets/sagittairus.svg'
import capricorn from '/ASTRO-AI/client/src/assets/capricorn.svg'
import aquarius from '/ASTRO-AI/client/src/assets/aquarius.svg'
import pisces from '/ASTRO-AI/client/src/assets/pisces.svg'

const signs = [
    { name: 'Aries', symbol: aries, date: 'Mar 21 - Apr 19' },
    { name: 'Taurus', symbol: taurus, date: 'Apr 20 - May 20' },
    { name: 'Gemini', symbol: gemini, date: 'May 21 - Jun 20' },
    { name: 'Cancer', symbol: cancer, date: 'Jun 21 - Jul 22' },
    { name: 'Leo', symbol: leo, date: 'Jul 23 - Aug 22' },
    { name: 'Virgo', symbol: virgo, date: 'Aug 23 - Sep 22' },
    { name: 'Libra', symbol: libra, date: 'Sep 23 - Oct 22' },
    { name: 'Scorpio', symbol: scorpio, date: 'Oct 23 - Nov 21' },
    { name: 'Sagittarius', symbol: sagittarius, date: 'Nov 22 - Dec 21' },
    { name: 'Capricorn', symbol: capricorn, date: 'Dec 22 - Jan 19' },
    { name: 'Aquarius', symbol: aquarius, date: 'Jan 20 - Feb 18' },
    { name: 'Pisces', symbol: pisces, date: 'Feb 19 - Mar 20' },
]
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: '-60px' })

    const initial = {
        opacity: 0,
        y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
        x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
        scale: direction === 'scale' ? 0.88 : 1,
    }

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
            transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    )
}
const Banner = () => {
    return (
        <div className="">

            <div className='h-72 bg-amber-950 flex justify-center items-center bg-[url("https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8fHww")]'>
                {/* Heading */}
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
                    AstroBuddy Daily Horoscope
                </h1>
            </div>
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 md:gap-6 px-8 md:px-36 mt-10">
                {signs.map((sign, i) => (
                    <AnimateOnScroll
                        key={sign.name}
                        delay={i * 0.05}
                        direction="scale"
                    >
                        <motion.div
                            whileHover={{ scale: 1.08, y: -5 }}
                            whileTap={{ scale: 0.94 }}
                            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                            className="bg-white border-2 border-transparent hover:border-orange-700
              transition-all duration-300 cursor-pointer rounded-xl p-4
              text-center flex flex-col items-center shadow-sm hover:shadow-lg"
                        >

                            {/* Image */}
                            <motion.img
                                className="w-14 h-14 rounded-full bg-gray-100 p-2"
                                src={sign.symbol}
                                alt={sign.name}
                                whileHover={{ rotate: 15 }}
                                transition={{ type: 'spring', stiffness: 200 }}
                            />

                            {/* Text */}
                            <h3 className="font-semibold mt-3 text-sm">
                                {sign.name}
                            </h3>

                            <h5 className="text-xs text-gray-600 mt-1">
                                {sign.date}
                            </h5>

                        </motion.div>
                    </AnimateOnScroll>
                ))}
            </div>
        </div>
    )
}

export default Banner