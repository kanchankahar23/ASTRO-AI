import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import design from "../../assets/design.png";
import {
  MessageSquare,
  Sun,
  Heart,
  FileText,
  Globe,
  Eye,
  Clock,
  Star,
  Music,
} from "lucide-react";

/* =========================
   Services Data (Outside)
========================= */
const servicesData = [
  {
    title: "Kaira AI Chat",
    description:
      "Ask unlimited questions about love, career, health, and finance. Get instant, personalised Vedic answers 24/7.",
    tag: "Core",
    icon: <MessageSquare size={20} />,
  },
  {
    title: "Horoscope",
    description:
      "Birth-chart-based predictions, not generic zodiac. Updated daily with transit-aware insights.",
    tag: "Daily",
    icon: <Sun size={20} />,
  },
  {
    title: "Kundli Matching",
    description:
      "Ashtakoota Guna Milan with 36-point compatibility scoring for marriage compatibility.",
    tag: "Popular",
    icon: <Heart size={20} />,
  },
  {
    title: "Kundali",
    description:
      "Comprehensive birth chart reports covering career, love, health, and finance based on Vedic astrology.",
    tag: "Premium",
    icon: <FileText size={20} />,
  },
  {
    title: "Panchang & Tithi",
    description:
      "Daily Panchang with Tithi, Nakshatra, Yoga, Karana, and auspicious muhurtas for every occasion.",
    tag: "Vedic",
    icon: <Star size={20} />,
  },
  {
    title: "Numerology",
    description:
      "Discover the power of your birth numbers. Get personalised numerology insights for name and career",
    tag: "Spiritual",
    icon: <Music size={20} />,
  },
];

/* =========================
   Animation Wrapper
========================= */
const AnimateOnScroll = ({ children, delay = 0, direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        y: direction === "up" ? 40 : 0,
        scale: direction === "scale" ? 0.9 : 1,
      }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

/* =========================
   Main Component
========================= */
const ServicesSection = () => {
  return (
    <div className="px-6 py-16 max-w-7xl mx-auto">
      
      {/* Heading */}
      <div className="text-center mb-12 flex flex-col items-center">
        
        <AnimateOnScroll>
          <h2 className="text-3xl text-[#0a0a5f] font-bold mb-2">
            Our Services
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <img className="mt-2" src={design} alt="design" />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="mt-3 text-gray-600 max-w-xl">
            Stay ahead with accurate, AI-powered horoscope predictions.
            Get daily insights and make better life decisions.
          </p>
        </AnimateOnScroll>

      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesData.map((service, index) => (
          <AnimateOnScroll key={service.title} delay={index * 0.08}>
            
            <motion.div
              whileHover={{ y: -8, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 shadow-sm 
              relative hover:shadow-xl transition-all duration-300"
            >
              
              {/* Tag */}
              <span className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 bg-orange-100 text-orange-500 rounded-full font-medium">
                {service.tag}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center text-[#0a0a5f] 
              rounded-xl bg-blue-50 mb-4 transition-transform duration-300 group-hover:scale-110">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-[#0a0a5f] mb-2">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.description}
              </p>

            </motion.div>

          </AnimateOnScroll>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;