// ============================================================
// 📦 IMPORTS
// ============================================================

import React, { useRef } from 'react'
// React  → required for JSX to work (behind the scenes JSX compiles to React.createElement)
// useRef → creates a reference to a DOM element
//          needed by useInView to watch a specific element's position on screen

import { motion, useInView } from 'framer-motion'
// motion   → enhanced HTML elements (motion.div, motion.img) with animation props
// useInView → hook that returns true/false based on whether element is in viewport
//             triggers scroll animations

import design from '../../assets/design.png'
// Decorative divider image shown below the heading
// Imported as module → Vite handles correct path in production

import aboutImg from '../../assets/about-img.webp'
// About section image shown on the left side
// .webp format → smaller file size than .jpg/.png → faster page load


// ============================================================
// 🎯 REUSABLE SCROLL ANIMATION WRAPPER
// ============================================================

const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
// Same reusable pattern as HeroSection — keeps animation logic DRY (Don't Repeat Yourself)
// children  → the JSX content wrapped inside this component
// delay     → seconds to wait before animation starts (creates stagger/cascade effect)
// direction → which direction element slides in from

  const ref = useRef(null)
  // ref will be attached to the motion.div below
  // useInView needs this to watch exactly THIS element

  const isInView = useInView(ref, { once: false, margin: '-60px' })
  // once: false  → re-animates every time element enters viewport (not just first time)
  // margin: '-60px' → starts animating 60px before element fully enters view
  //                   creates an earlier, smoother trigger compared to exact edge

  const initial = {
    opacity: 0,
    // Always starts invisible

    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    // 'up'   → element starts 40px below, slides UP to position
    // 'down' → element starts 40px above, slides DOWN to position
    // else   → no vertical movement

    x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
    // 'left'  → element starts 60px to the RIGHT, slides LEFT
    // 'right' → element starts 60px to the LEFT, slides RIGHT
    // else    → no horizontal movement

    scale: direction === 'scale' ? 0.9 : 1,
    // 'scale' → element starts at 90% size, grows to full size
    // This direction option didn't exist in HeroSection — this is an UPGRADE
  }

  return (
    <motion.div
      ref={ref}
      // Attaches the DOM reference so useInView can track this element

      initial={initial}
      // Starting animation state (invisible + offset position)

      animate={isInView ? { opacity: 1, y: 0, x: 0, scale: 1 } : initial}
      // In view  → animate to final visible position (opacity:1, no offset)
      // Out of view → reset back to initial hidden state
      // This is written inline here (vs variants object in HeroSection)
      // Both approaches work — inline is simpler for straightforward animations

      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      // duration: 0.6   → slightly faster than HeroSection (0.7s) — snappier feel
      // delay           → stagger delay passed from parent
      // ease: cubic-bezier → fast start, smooth deceleration at end (natural motion)
    >
      {children}
    </motion.div>
  )
}


// ============================================================
// 📖 ABOUT US SECTION
// ============================================================

const AboutUs = () => {
  return (
    <section className="text-[#0a0a5f] py-16 px-6">
    {/* text-[#0a0a5f] → sets default dark navy blue color for all text in this section */}
    {/* py-16 → vertical padding top and bottom (breathing room) */}
    {/* px-6  → horizontal padding (prevents content touching screen edges on mobile) */}

      <div className="max-w-7xl mx-auto">
      {/* max-w-7xl → limits width on large screens (content won't stretch too wide) */}
      {/* mx-auto   → centers the container horizontally */}

        {/* ── SECTION HEADING BLOCK ── */}
        <div className="text-center mb-14 flex justify-center items-center flex-col">
        {/* text-center → centers text */}
        {/* flex flex-col → stacks heading, divider image, subtitle vertically */}
        {/* justify-center items-center → centers everything inside */}
        {/* mb-14 → large bottom margin before the main content starts */}

          {/* Heading — first to animate */}
          <AnimateOnScroll delay={0} direction="up">
            <h2 className="text-3xl font-bold mb-3">
              About Astro<span className="text-orange-500">AI</span>
              {/* Split text coloring: "Astro" = navy, "AI" = orange */}
              {/* Matches the brand identity pattern used in the Navbar logo */}
            </h2>
          </AnimateOnScroll>

          {/* Decorative divider image — second to animate */}
          <AnimateOnScroll delay={0.1} direction="up">
            <div className="flex items-center flex-col gap-2 my-3">
              <img src={design} alt="" />
              {/* alt="" → intentionally empty because this is decorative */}
              {/* Screen readers skip decorative images with empty alt */}
            </div>
          </AnimateOnScroll>

          {/* Subtitle — third to animate (stagger cascade) */}
          <AnimateOnScroll delay={0.2} direction="up">
            <h4 className="text-base mt-2 max-w-xl leading-relaxed">
              A smart astrology platform providing accurate and personalized <br />
              predictions using AI.
              {/* max-w-xl → limits subtitle width for better readability */}
              {/* leading-relaxed → increases line height → easier to read */}
            </h4>
          </AnimateOnScroll>

        </div>

        {/* ── MAIN CONTENT: IMAGE + TEXT ── */}
        <div className="flex flex-col md:flex-row items-center gap-20">
        {/* flex-col    → stacked layout on mobile */}
        {/* md:flex-row → side by side on desktop */}
        {/* items-center → vertically aligns image and text block */}
        {/* gap-20 → large space between image and text */}

          {/* ── LEFT SIDE: About Image ── */}
          <AnimateOnScroll delay={0.1} direction="right">
          {/* direction="right" → image starts to the LEFT and slides RIGHT into place */}
          {/* This creates the effect of image coming in from the left side */}

            <div className="w-full sm:w-[800px] md:w-[600px]">
            {/* Responsive width: full on mobile, fixed on larger screens */}

              <motion.img
                src={aboutImg}
                alt="Experienced Astrologer"
                // Descriptive alt text → good for accessibility and SEO

                className="w-full h-[300px] md:h-[400px] max-w-full mx-auto rounded-lg object-cover shadow-md"
                // h-[300px] md:h-[400px] → fixed height so image doesn't distort layout
                // object-cover   → image fills container without stretching
                // rounded-lg     → slightly rounded corners (softer look)
                // shadow-md      → subtle shadow → image feels elevated

                style={{ objectPosition: 'top' }}
                // objectPosition: 'top' → when image is cropped by fixed height,
                // shows the TOP part of the image (usually the face/important part)
                // This can't be done with Tailwind alone for custom values

                whileHover={{ scale: 1.02 }}
                // Subtle zoom on hover → feels interactive without being distracting

                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                // type: 'spring' → physics-based animation (bouncy/elastic)
                // stiffness: 200 → how "tight" the spring is (higher = faster)
                // damping: 20    → how quickly it stops bouncing (higher = less bounce)
                // Combination creates a satisfying, natural hover effect
              />
            </div>
          </AnimateOnScroll>

          {/* ── RIGHT SIDE: Text Content ── */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
          {/* w-1/2 on desktop → takes up exactly half the row */}
          {/* flex flex-col gap-6 → stacks all text elements with even spacing */}

            {/* Main Heading */}
            <AnimateOnScroll delay={0.15} direction="left">
            {/* direction="left" → text starts to the RIGHT and slides LEFT */}
            {/* Opposite direction to image → both slide TOWARD each other = great effect */}

              <h3 className="text-3xl font-bold text-[#0a0a5f] leading-snug">
                We Believe On Understanding Problem <br /> Rather Than Solutions
                {/* leading-snug → tighter line height for bold headings (looks better) */}
                {/* <br /> → forces line break at a specific word for visual control */}
              </h3>
            </AnimateOnScroll>

            {/* Quote / Description Block */}
            <AnimateOnScroll delay={0.25} direction="left">
              <div className="border-l-4 border-amber-600 pl-5 text-gray-600 text-[19px] leading-relaxed">
              {/* border-l-4 border-amber-600 → left border = blockquote style */}
              {/* This is a classic UI pattern to visually separate a quote/key text */}
              {/* pl-5 → padding left so text doesn't touch the border */}
              {/* text-gray-600 → slightly lighter than headings → visual hierarchy */}
                There can be many ways by which people's history can be told...
              </div>
            </AnimateOnScroll>

            {/* Brand Identity Card */}
            <AnimateOnScroll delay={0.35} direction="left">
            {/* delay={0.35} → last element animates last in the cascade */}

              <motion.div
                whileHover={{ x: 6 }}
                // On hover → entire card slides 6px to the right
                // Subtle but satisfying micro-interaction

                transition={{ type: 'spring', stiffness: 300 }}
                // stiffness: 300 → snappier spring for hover (quicker response)

                className="flex items-center gap-4 rounded-full px-5 py-4 w-fit mt-2"
                // w-fit → card only as wide as its content (no full-width stretch)
                // rounded-full → pill shape
              >

                {/* SVG Icon Circle */}
                <motion.div
                  className="w-18 h-18 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0"
                  // bg-orange-50  → very light orange background for the icon circle
                  // flex-shrink-0 → prevents circle from shrinking when text is long

                  whileHover={{ rotate: 10, scale: 1.1 }}
                  // Icon rotates 10° and grows 10% when hovered
                  // Adds playful interactivity to a static icon

                  transition={{ type: 'spring', stiffness: 250 }}
                >
                  {/* Inline SVG — custom astrology/people icon */}
                  <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* viewBox="0 0 30 30" → coordinate system for the SVG paths */}
                  {/* fill="none" → no fill by default, strokes only */}

                    <circle cx="15" cy="15" r="14" stroke="#c8922a" strokeWidth="1.5" />
                    {/* Outer ring circle */}

                    <circle cx="15" cy="10" r="4" stroke="#c8922a" strokeWidth="1.5" />
                    {/* Head circle of the person icon */}

                    <path d="M7 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#c8922a" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Body/shoulders arc of the main person */}

                    <path d="M19 13c2.5 0 5 2 5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                    {/* Right side person — dashed line = secondary/background figure */}

                    <path d="M11 13c-2.5 0-5 2-5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                    {/* Left side person — dashed line = secondary/background figure */}
                    {/* Together these 3 paths form a "group of people" icon */}
                  </svg>
                </motion.div>

                {/* Text next to icon */}
                <div>
                  <p className="text-gray-500 text-sm">That Is What Makes Us</p>
                  {/* Small label above the brand name */}

                  <p className="text-[#0a0a5f] text-xl font-bold">ASTRO AI</p>
                  {/* Brand name in navy bold — reinforces identity */}
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
// Default export → imported as: import AboutUs from './AboutUs'