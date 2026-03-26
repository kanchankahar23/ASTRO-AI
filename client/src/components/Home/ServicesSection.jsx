import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Hash, Hand, PenLine, Star, Home, Bot, Calculator, BookOpen,Heart } from 'lucide-react'
import design from '/ASTRO-AI/client/src/assets/design.png'

const services = [
  {
    Icon: Brain,
    title: 'Kundali',
    desc: 'Know the effect of Zodiac signs and planetary influences on your life.',
  },
  {
    Icon: Hash,
    title: 'Numerology',
    desc: 'Get life path insights with number symbolism and patterns.',
  },
  {
    Icon: BookOpen,         
    title: 'Panchang',
    desc: 'Explore auspicious timings, tithis, and daily cosmic guidance.',
  },
  {
    Icon: PenLine,
    title: 'Kundali Matching',
    desc: 'Check compatibility between two birth charts for harmonious relationships.',
  },
  {
    Icon: Bot,              
    title: 'AI Chatbot',
    desc: 'Get instant astrology answers powered by AI, available 24/7.',
  },
  {
    Icon: Star,           
    title: 'Horoscope',
    desc: 'Read your daily, weekly, and monthly horoscope based on your sun sign.',
  },
  {
    Icon: Calculator,     
    title: 'Calculator',
    desc: 'Compute your life path, lucky numbers, and planetary periods instantly.',
  },
  {
    Icon: Heart,
    title: 'Compatibility', 
    desc: 'Discover how well you and your partner align based on birth charts and zodiac signs.',  
  },


]

// ── Reusable scroll-trigger wrapper ──────────────────────────────────────────
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

// ── Service Card ──────────────────────────────────────────────────────────────
const ServiceCard = ({ Icon, title, desc, delay }) => {
  return (
    <AnimateOnScroll delay={delay} direction="scale">
      <motion.div
        whileHover={{ y: -6, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: 'spring', stiffness: 280, damping: 18 }}
        className="
    group relative bg-zinc-100 hover:border hover:border-orange-600
transition-colors duration-200 ease-in rounded-xl p-6 text-center
cursor-pointer h-full flex flex-col items-center"
      >
        {/* Icon wrapper — color shifts on group hover */}
        <div className="
          w-16 h-16 flex items-center justify-center rounded-full mb-4
          bg-orange-100 group-hover:bg-white/20 transition-colors duration-300
        ">
          <Icon
            size={32}
            className="text-orange-500  transition-colors duration-300"
          />
        </div>

        {/* Title — fixed: now changes color on group hover */}
        <h3 className="
          text-xl font-bold mb-2 text-[#0a0a5f]
           transition-colors duration-300
        
        ">
          {title}
        </h3>

        {/* Description */}
        <p className="
          text-gray-500 
          transition-colors duration-300 text-sm flex-grow
          mt-3
        ">
          {desc}
        </p>

        {/* CTA */}
        <button className="
          mt-2 text-orange-500 
          font-semibold text-sm underline transition-colors duration-300
        ">
          Read More →
        </button>
      </motion.div>
    </AnimateOnScroll>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────
const ServicesSection = () => {
  return (
    <section className="py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 flex flex-col items-center">

          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl text-[#0a0a5f] font-bold mb-2">
              Our Services
            </h2>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.1} direction="up">
            <img src={design} alt="" className="mt-3" />
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} direction="up">
            <p className="text-[#0a0a5f] max-w-xl mx-auto mt-5">
              Harmony crafts spaces aligning Vastu, Astrology, and Numerology,
              fostering positive energy and well-being in every design.
            </p>
          </AnimateOnScroll>

        </div>

        {/* Services Grid — 3 columns on md+, so 6 cards = 2 clean rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.title}
              Icon={service.Icon}
              title={service.title}
              desc={service.desc}
              delay={i * 0.07}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection