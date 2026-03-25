import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import bgImg from '/ASTRO-AI/client/src/assets/astrology-banner.jpg';
import aiAstro from '/ASTRO-AI/client/src/assets/ai-astro.jpg';

// Reusable animated wrapper — re-animates every time it enters view
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    margin: '-80px'
  });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
};

const HeroSection = () => {
  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      className="bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center"
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-10">

        {/* Left Content */}
        <div className='mt-10'>

          {/* Subtitle */}
          <AnimateOnScroll delay={0.1} direction="up">
            <p className=" text-xl text-left mb-2">
              AI Powered Astrology
            </p>
          </AnimateOnScroll>

          {/* Heading */}
          <AnimateOnScroll delay={0.2} direction="up">
            <h1 className="text-3xl md:text-6xl whitespace-nowrap font-bold leading-tight mb-4">
              Read your Future with <br /><span className='text-orange-500'> AI  Astrologer</span>
            </h1>
          </AnimateOnScroll>

          {/* Description */}
          <AnimateOnScroll delay={0.3} direction="up">
            <p className="text-gray-50 text-lg mb-8">
              Go beyond belief. Experience predictions that are calculated, personalized, and designed to guide your decisions with confidence.
            </p>
          </AnimateOnScroll>

          {/* Buttons */}
          <AnimateOnScroll delay={0.4} direction="up">
            <div className="flex gap-4 flex-wrap">
              <motion.a
                href="#services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-9 py-3 rounded-md font-semibold transition"
              >
                Chat Now
              </motion.a>
              <motion.a
                href="#astrologers"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-9 py-3 rounded-md font-semibold transition"
              >
                Sign Up
              </motion.a>
            </div>
          </AnimateOnScroll>


        </div>

        {/* Right Image */}
        <AnimateOnScroll delay={0.2} direction="left">
          <div className="flex justify-center md:ml-30">
            <motion.img
              src={aiAstro}
              alt="Astrologer"
              className="w-80 md:w-96 rounded-full shadow-2xl border-4 border-orange-400"
              // whileHover={{ scale: 1.03, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 200 }}
            />
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};

export default HeroSection;