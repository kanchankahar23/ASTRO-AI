import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import design from '../../assets/design.png';
import palm from '../../assets/palm.png';
import { Brain, Star, Moon, Sun, Eye, Sparkles } from 'lucide-react';

// ─── Animate On Scroll ────────────────────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-60px' });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
      scale: direction === 'scale' ? 0.85 : 1,
    },
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const leftServices = [
  {
    title: 'Numerology',
    desc: 'Uncover the hidden power of numbers and their influence on your destiny.',
    Icon: Brain,
  },
  {
    title: 'Panchang',
    desc: 'Daily Vedic almanac with auspicious timings, tithis, and planetary positions.',
    Icon: Moon,
  },
  {
    title: 'Calculator',
    desc: 'Calculate your lucky numbers, life path, and zodiac compatibility instantly.',
    Icon: Sun,
  },
];

const rightServices = [
  {
    title: 'Kundali',
    desc: 'Generate your Vedic birth chart with precise planetary placements.',
    Icon: Star,
  },
  {
    title: 'Kundali Matching',
    desc: 'Match horoscopes for marriage compatibility using the Ashtakoot system.',
    Icon: Eye,
  },
  {
    title: 'Compatibility',
    desc: 'AI-powered cosmic forecasts tailored to your unique zodiac profile.',
    Icon: Sparkles,
  },
];

const ServiceCard = ({ title, desc, Icon, align = 'left', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: align === 'left' ? -40 : 40 }
      }
      transition={{ duration: 0.55, delay, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ scale: 1.03, y: -4 }}
      className={`
        group relative flex items-start gap-4
md:p-32 sm:p-5 lg:p-8
        rounded-2xl w-full
       
        border border-[#c9a84c]/20 shadow-lg shadow-black/40
        backdrop-blur-sm cursor-pointer overflow-hidden
        flex-row text-left
      `}
    >
      {/* Icon */}
      <div className="shrink-0 mt-1 p-2.5 sm:p-3 rounded-xl
        bg-[#c9a84c]/10 border border-[#c9a84c]/20
        group-hover:bg-[#c9a84c]/20 group-hover:border-[#c9a84c]/40
        transition-all duration-300">
        <Icon size={20} className="text-[#0a0a5f]" />
      </div>

      {/* Text */}
      <div className="min-w-0">
        <h3
          className="font-semibold text-sm sm:text-base text-[#0a0a5f] tracking-wide mb-1"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {title}
        </h3>
        <p
          className="text-xs text-[#0a0a5f]/80 leading-relaxed"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const ServicesSection = () => {
  return (
    <section
      className="relative text-[#0a0a5f] py-14 sm:py-16 lg:py-20 px-4 sm:px-6 overflow-hidden"
    >
      {/* Ambient glow blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full
        bg-[#4a1a8c]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full
        bg-[#c9a84c]/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16 flex flex-col items-center">

          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl font-bold mb-2">Horoscope Forecasts</h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <img className="mt-2" src={design} alt="" />
          </AnimateOnScroll>


          <AnimateOnScroll delay={0.2} direction="up">
            <h4 className="mt-3 text-[#0a0a5f]">
              It is a long established fact that a reader will be distracted by the readable
              content of a page <br /> when looking at its layout. The point of using Lorem Ipsum
            </h4>
          </AnimateOnScroll>
        </div>

        {/* Mobile & Tablet (hidden on lg+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 lg:hidden">
          {[...leftServices, ...rightServices].map((service, i) => (
            <ServiceCard
              key={i}
              title={service.title}
              desc={service.desc}
              Icon={service.Icon}
              align="left"
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* Desktop only (hidden below lg) */}
        <div className="hidden lg:flex items-center justify-center gap-8 xl:gap-10">

          {/* Left column */}
          <div className="flex flex-col gap-5 w-[300px] xl:w-[340px]">
            {leftServices.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                desc={service.desc}
                Icon={service.Icon}
                align="left"
                delay={i * 0.12}
              />
            ))}
          </div>

          {/* Center palm */}
          <AnimateOnScroll delay={0.2} direction="scale">
            <div className="relative flex items-center justify-center flex-shrink-0">
              <div className="absolute w-60 xl:w-72 h-60 xl:h-72 rounded-full
                bg-gradient-to-br from-[#c9a84c]/10 to-[#4a1a8c]/10
                border border-[#c9a84c]/15 blur-sm" />
              <img
                src={palm}
                alt="palm reading"
                className="relative w-52 xl:w-64 object-contain
                  drop-shadow-[0_0_40px_rgba(201,168,76,0.25)]"
              />
            </div>
          </AnimateOnScroll>

          {/* Right column */}
          <div className="flex flex-col gap-5 w-[300px] xl:w-[340px]">
            {rightServices.map((service, i) => (
              <ServiceCard
                key={i}
                title={service.title}
                desc={service.desc}
                Icon={service.Icon}
                align="right"
                delay={i * 0.12}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicesSection;