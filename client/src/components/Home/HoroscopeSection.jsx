import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import design from '/ASTRO-AI/client/src/assets/design.png'
import aries from '/ASTRO-AI/client/src/assets/taurus.svg'
import Taurus from '/ASTRO-AI/client/src/assets/taurus.svg'
import gemini from '/ASTRO-AI/client/src/assets/Gemini1.svg'
import cancer from '/ASTRO-AI/client/src/assets/cancer.svg'
import leo from '/ASTRO-AI/client/src/assets/leo.svg'
import virgo from '/ASTRO-AI/client/src/assets/virgo.svg'
import libra from '/ASTRO-AI/client/src/assets/libra.svg'
import Scorpio from '/ASTRO-AI/client/src/assets/scorpio.svg'
import Sagittarius from '/ASTRO-AI/client/src/assets/sagittairus.svg'
import capricorn from '/ASTRO-AI/client/src/assets/capricorn.svg'
import aquarius from '/ASTRO-AI/client/src/assets/aquarius.svg'
import pisces from '/ASTRO-AI/client/src/assets/pisces.svg'

const signs = [
  { name: 'Aries',       symbol: aries,       date: 'Mar 21 - Apr 19' },
  { name: 'Taurus',      symbol: Taurus,      date: 'Apr 20 - May 20' },
  { name: 'Gemini',      symbol: gemini,      date: 'May 21 - Jun 20' },
  { name: 'Cancer',      symbol: cancer,      date: 'Jun 21 - Jul 22' },
  { name: 'Leo',         symbol: leo,         date: 'Jul 23 - Aug 22' },
  { name: 'Virgo',       symbol: virgo,       date: 'Aug 23 - Sep 22' },
  { name: 'Libra',       symbol: libra,       date: 'Sep 23 - Oct 22' },
  { name: 'Scorpio',     symbol: Scorpio,     date: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: Sagittarius, date: 'Nov 22 - Dec 21' },
  { name: 'Capricorn',   symbol: capricorn,   date: 'Dec 22 - Jan 19' },
  { name: 'Aquarius',    symbol: aquarius,    date: 'Jan 20 - Feb 18' },
  { name: 'Pisces',      symbol: pisces,      date: 'Feb 19 - Mar 20' },
]

// ── Reusable scroll-trigger wrapper ──────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === 'up' ? 40 : 0,
        scale: direction === 'scale' ? 0.85 : 1,
      }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: direction === 'up' ? 40 : 0, scale: direction === 'scale' ? 0.85 : 1 }
      }
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

const HoroscopeSection = () => {
  return (
    <section className="bg-[#f8f1e2] text-[#0a0a5f] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 flex justify-center items-center flex-col">

          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl font-bold mb-2">Horoscope Forecasts</h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <img className="mt-2" src={design} alt="" />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="up">
            <h4 className="mt-3">
              It is a long established fact that a reader will be distracted by the readable
              content of a page <br /> when looking at its layout. The point of using Lorem Ipsum
            </h4>
          </AnimateOnScroll>

        </div>

        {/* Signs Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {signs.map((sign, i) => (
            <AnimateOnScroll
              key={sign.name}
              delay={i * 0.05}       // wave effect: each card 50ms after previous
              direction="scale"      // cards pop in with a scale effect
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="bg-white border-2 border-transparent hover:border-orange-700
                           transition-colors duration-300 cursor-pointer rounded-xl p-4
                           text-center flex justify-center items-center flex-col group"
              >
                {/* SVG icon — spins gently on hover */}
                <motion.img
                  className="w-15 h-15 rounded-full bg-white p-3"
                  src={sign.symbol}
                  alt={sign.name}
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
                <h3 className="font-semibold mt-3 text-sm">{sign.name}</h3>
                <h5 className="text-xs text-gray-600 mt-1">{sign.date}</h5>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HoroscopeSection