import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import design from '../../assets/design.png'
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
  { name: 'Aries',       symbol: aries,       date: 'Mar 21 - Apr 19', element: 'Fire',  lucky: '9, 41',  color: 'Red' },
  { name: 'Taurus',      symbol: Taurus,      date: 'Apr 20 - May 20', element: 'Earth', lucky: '6, 15',  color: 'Green' },
  { name: 'Gemini',      symbol: gemini,      date: 'May 21 - Jun 20', element: 'Air',   lucky: '5, 14',  color: 'Yellow' },
  { name: 'Cancer',      symbol: cancer,      date: 'Jun 21 - Jul 22', element: 'Water', lucky: '2, 7',   color: 'Silver' },
  { name: 'Leo',         symbol: leo,         date: 'Jul 23 - Aug 22', element: 'Fire',  lucky: '1, 19',  color: 'Gold' },
  { name: 'Virgo',       symbol: virgo,       date: 'Aug 23 - Sep 22', element: 'Earth', lucky: '3, 27',  color: 'Blue' },
  { name: 'Libra',       symbol: libra,       date: 'Sep 23 - Oct 22', element: 'Air',   lucky: '4, 13',  color: 'Pink' },
  { name: 'Scorpio',     symbol: Scorpio,     date: 'Oct 23 - Nov 21', element: 'Water', lucky: '8, 11',  color: 'Black' },
  { name: 'Sagittarius', symbol: Sagittarius, date: 'Nov 22 - Dec 21', element: 'Fire',  lucky: '3, 12',  color: 'Purple' },
  { name: 'Capricorn',   symbol: capricorn,   date: 'Dec 22 - Jan 19', element: 'Earth', lucky: '4, 22',  color: 'Brown' },
  { name: 'Aquarius',    symbol: aquarius,    date: 'Jan 20 - Feb 18', element: 'Air',   lucky: '7, 17',  color: 'Blue' },
  { name: 'Pisces',      symbol: pisces,      date: 'Feb 19 - Mar 20', element: 'Water', lucky: '3, 9',   color: 'Sea Green' },
];

// Static daily horoscopes (replace with API later)
const horoscopes = {
  Aries:       "Today is a powerful day for you, Aries. Your energy is at its peak — take bold steps toward your goals. A new opportunity may arrive unexpectedly. Trust your instincts.",
  Taurus:      "Patience brings rewards today, Taurus. Focus on your finances and long-term planning. A meaningful conversation with a loved one will bring clarity.",
  Gemini:      "Your mind is sharp today, Gemini. Communication flows easily — great for presentations or important talks. Avoid overthinking small decisions.",
  Cancer:      "Emotions run deep today, Cancer. Take time for self-care and reflection. A creative project you've been thinking about deserves your attention now.",
  Leo:         "You shine brightest today, Leo. Leadership opportunities are coming your way. Share your vision boldly — people are ready to listen and follow.",
  Virgo:       "Details matter today, Virgo. Your analytical skills will solve a problem others have overlooked. Stay organized and your hard work will be noticed.",
  Libra:       "Balance is your superpower today, Libra. Relationships are highlighted — strengthen bonds with honesty. A decision you've been avoiding needs your attention.",
  Scorpio:     "Transformation is in the air, Scorpio. Let go of what no longer serves you. Your intuition is exceptionally strong — trust what you feel deeply.",
  Sagittarius: "Adventure calls, Sagittarius! Expand your horizons through learning or travel. An exciting opportunity on the horizon will align with your bigger vision.",
  Capricorn:   "Discipline pays off today, Capricorn. Stay focused on your career goals — your efforts are about to be recognized. Avoid distractions and keep climbing.",
  Aquarius:    "Innovation is your theme today, Aquarius. Think outside the box and share unconventional ideas. A connection with a like-minded person sparks inspiration.",
  Pisces:      "Your intuition guides you perfectly today, Pisces. Artistic and spiritual activities bring joy. Listen to your dreams — they carry meaningful messages.",
};

// ── Animated wrapper ──────────────────────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === 'up' ? 40 : 0, scale: direction === 'scale' ? 0.85 : 1 }}
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

// ── Modal Component ───────────────────────────────────────────────────────────
const HoroscopeModal = ({ sign, onClose }) => {
  if (!sign) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // click outside to close
    >
      <motion.div
        className="bg-white rounded-2xl p-8 max-w-md w-full relative shadow-2xl"
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-orange-500 text-2xl font-bold transition cursor-pointer"
        >
          ✕
        </button>

        {/* Sign Icon + Name */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={sign.symbol}
            alt={sign.name}
            className="w-20 h-20 rounded-full bg-orange-50 p-4 mb-3"
          />
          <h2 className="text-2xl font-bold text-[#0a0a5f]">{sign.name}</h2>
          <p className="text-sm text-gray-500">{sign.date}</p>
        </div>

        {/* Today's Horoscope */}
        <div className="bg-orange-50 rounded-xl p-4 mb-4">
          <h4 className="text-orange-500 font-semibold mb-2">🔮 Today's Horoscope</h4>
          <p className="text-gray-700 text-sm leading-relaxed">{horoscopes[sign.name]}</p>
        </div>

        {/* Sign Details */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Element</p>
            <p className="text-sm font-semibold text-[#0a0a5f]">{sign.element}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Lucky No.</p>
            <p className="text-sm font-semibold text-[#0a0a5f]">{sign.lucky}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-400 mb-1">Lucky Color</p>
            <p className="text-sm font-semibold text-[#0a0a5f]">{sign.color}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
const HoroscopeSection = () => {
  const [selectedSign, setSelectedSign] = useState(null);

  return (
    <section className="text-[#0a0a5f] py-24 px-3">
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
              Stay ahead with accurate, AI-powered horoscope predictions tailored to your zodiac sign. <br />
              Get daily insights, guidance, and clarity to make better life decisions.
            </h4>
          </AnimateOnScroll>
        </div>

        {/* Signs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {signs.map((sign, i) => (
            <AnimateOnScroll key={sign.name} delay={i * 0.05} direction="scale">
              <motion.div
                onClick={() => setSelectedSign(sign)}
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="group bg-white border-2 border-zinc-200 hover:border-orange-400
                           transition-colors duration-300 cursor-pointer rounded-xl p-4
                           text-center flex justify-center items-center flex-col"
              >
                <motion.img
                  className="w-15 h-15 rounded-full bg-orange-50 p-3"
                  src={sign.symbol}
                  alt={sign.name}
                  whileHover={{ rotate: 15 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                />
                <h3 className="group-hover:text-orange-500 font-semibold mt-3 text-[15px]">{sign.name}</h3>
                <h5 className="text-[12px] text-gray-600 mt-1">{sign.date}</h5>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>

      {/* Modal */}
      <HoroscopeModal sign={selectedSign} onClose={() => setSelectedSign(null)} />
    </section>
  );
};

export default HoroscopeSection;