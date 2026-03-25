import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import design from '/ASTRO-AI/client/src/assets/design.png'

const services = [
  { icon: '🌟', title: 'Astrology',         desc: 'Know effect of Zodiac signs, Planetary influences on your life.' },
  { icon: '🔢', title: 'Numerology',        desc: 'Get life path insights with Number symbolism and patterns.' },
  { icon: '✋', title: 'Palmistry',         desc: 'Read your future through the lines and mounts of your palm.' },
  { icon: '✍️', title: 'Signature Reading', desc: 'Signature Analysis Personality Test for deep insights.' },
  { icon: '🔢', title: 'Numerology',        desc: 'Get life path insights with Number symbolism and patterns.' },
  { icon: '✋', title: 'Palmistry',         desc: 'Read your future through the lines and mounts of your palm.' },
  { icon: '✍️', title: 'Signature Reading', desc: 'Signature Analysis Personality Test for deep insights.' },
  { icon: '🔢', title: 'Numerology',        desc: 'Get life path insights with Number symbolism and patterns.' },
  { icon: '✋', title: 'Palmistry',         desc: 'Read your future through the lines and mounts of your palm.' },
  { icon: '✍️', title: 'Signature Reading', desc: 'Signature Analysis Personality Test for deep insights.' },
]

// ── Reusable scroll-trigger wrapper ──────────────────────────────────────────
const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: '-60px' })

  const initial = {
    opacity: 0,
    y:     direction === 'up'    ?  40 : direction === 'down'  ? -40 : 0,
    x:     direction === 'left'  ?  60 : direction === 'right' ? -60 : 0,
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

const ServicesSection = () => {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* ── Heading ── */}
        <div className="text-center mb-12 flex flex-col justify-center items-center">

          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl text-center text-[#0a0a5f] font-bold mb-2">
              Our Services
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <img className="mt-3 text-center" src={design} alt="" />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="up">
            <h4 className="text-[#0a0a5f] max-w-xl mx-auto mt-5">
              Harmony crafts spaces aligning Vastu, Astrology, and Numerology,
              fostering positive energy and well-being in every design.
            </h4>
          </AnimateOnScroll>

        </div>

        {/* ── Services Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <AnimateOnScroll
              key={`${service.title}-${i}`}   // unique key since titles repeat
              delay={i * 0.07}
              direction="scale"
            >
              <motion.div
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                className="bg-zinc-100 hover:bg-orange-500 transition-colors rounded-xl p-6 text-center group cursor-pointer h-full"
              >
                {/* Icon bounces on card hover */}
                <motion.div
                  className="text-5xl mb-4"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-400 group-hover:text-white text-sm">{service.desc}</p>

                <button className="mt-4 text-orange-400 group-hover:text-white font-semibold text-sm underline">
                  Read More →
                </button>
              </motion.div>
            </AnimateOnScroll>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection