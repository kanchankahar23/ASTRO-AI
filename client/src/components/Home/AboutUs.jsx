import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import design from '/ASTRO-AI/client/src/assets/design.png'
import aboutImg from '/ASTRO-AI/client/src/assets/about-img.webp'

// ── Reusable scroll-trigger wrapper ──────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-60px' })

  const initial = {
    opacity: 0,
    y: direction === 'up'    ?  40 : direction === 'down' ? -40 : 0,
    x: direction === 'left'  ?  60 : direction === 'right'? -60 : 0,
    scale: direction === 'scale' ? 0.9 : 1,
  }

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}

const AboutUs = () => {
  return (
    <section className="text-[#0a0a5f] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-14 flex justify-center items-center flex-col">

          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl font-bold mb-3">
              About Astro<span className="text-orange-500">AI</span>
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <div className="flex items-center flex-col gap-2 my-3">
              <img src={design} alt="" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="up">
            <h4 className="text-base mt-2 max-w-xl leading-relaxed">
              AstroBuddy provides its user a chance to meet Experienced Astrologers.
              <br />
              The one who actually reads user's Kundali.
            </h4>
          </AnimateOnScroll>

        </div>

        {/* ── Main Content ── */}
        <div className="flex flex-col md:flex-row items-center gap-20">

          {/* Left — Image slides in from left */}
          <AnimateOnScroll delay={0.1} direction="right">
            <div className="w-full sm:w-[800px] md:w-[600px]">
              <motion.img
                src={aboutImg}
                alt="Experienced Astrologer"
                className="w-full h-[300px]  md:h-[400px] max-w-full mx-auto rounded-lg object-cover shadow-md"
                style={{ aspectRatio: '3/5', objectPosition: 'top' }}
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              />
            </div>
          </AnimateOnScroll>

          {/* Right — Text slides in from right */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">

            <AnimateOnScroll delay={0.15} direction="left">
              <h3 className="text-3xl font-bold text-[#0a0a5f] leading-snug">
                We Believe On Understanding Problem <br /> Rather Than Solutions
              </h3>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.25} direction="left">
              <div className="border-l-4 border-amber-600 pl-5 text-gray-600 text-[19px] leading-relaxed">
                There can be many ways by which people's history can be told, understood
                and realized. But there is only one way to predict their future or to provide
                solutions to their problems.
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.35} direction="left">
              <motion.div
                whileHover={{ x: 6 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex items-center gap-4 rounded-full px-5 py-4 w-fit mt-2"
              >
                {/* Icon circle */}
                <motion.div
                  className="w-18 h-18 rounded-full bg-[#f3e8d0] flex items-center justify-center flex-shrink-0"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="15" cy="15" r="14" stroke="#c8922a" strokeWidth="1.5" />
                    <circle cx="15" cy="10" r="4" stroke="#c8922a" strokeWidth="1.5" />
                    <path d="M7 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#c8922a" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M19 13c2.5 0 5 2 5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                    <path d="M11 13c-2.5 0-5 2-5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                  </svg>
                </motion.div>
                <div>
                  <p className="text-gray-500 text-sm">That Is What Makes Us</p>
                  <p className="text-[#0a0a5f] text-xl font-bold">Astro Buddy</p>
                </div>
              </motion.div>
            </AnimateOnScroll>

          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutUs