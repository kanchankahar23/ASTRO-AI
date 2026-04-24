// ============================================================
// 📦 IMPORTS
// ============================================================

import { motion } from 'framer-motion';
// motion → special HTML elements (motion.div, motion.button, motion.img)
// that have built-in animation superpowers (whileHover, whileTap, animate, etc.)

import { useInView } from 'framer-motion';
// useInView → a hook that tells us if an element is currently
// visible in the browser viewport (used for scroll-triggered animations)

import { useRef } from 'react';
// useRef → creates a reference to a DOM element
// useInView needs this ref to "watch" a specific element on screen

import bgImg from '../../assets/astrology-banner.jpg';
// Background image for the hero section
// Imported as module so Vite handles the correct path in production build
// (hardcoded strings like "/assets/..." break after Vite builds)

import aiAstro from '../../assets/ai-astro.jpg';
// The AI astrologer image shown on the right side of the hero

import { useUser } from '@clerk/clerk-react';
// useUser → gives us { isSignedIn } to check if user is logged in
// Used to show different buttons and navigate to different pages

import { useNavigate } from 'react-router-dom';
// useNavigate → programmatic navigation (redirect user without clicking a Link)
// Used inside button onClick handlers


// ============================================================
// 🎯 REUSABLE ANIMATED WRAPPER COMPONENT
// ============================================================

const AnimateOnScroll = ({ children, delay = 0, direction = 'up' }) => {
// children  → whatever JSX is wrapped inside this component
// delay     → how many seconds to wait before starting animation (stagger effect)
// direction → which direction the element slides in from (up/down/left/right)
// Both have DEFAULT values → safe to use without passing them

  const ref = useRef(null);
  // Creates a ref — we'll attach this to the motion.div below
  // useInView needs this to know WHICH element to watch

  const isInView = useInView(ref, {
    once: false,
    // once: false → animation replays every time element enters viewport
    // once: true  → would only animate the FIRST time (common for page load)
    margin: '-80px'
    // Triggers animation 80px BEFORE the element fully enters viewport
    // Gives a smoother, earlier feel — content starts animating just before visible
  });

  const variants = {
    // variants → named animation states in Framer Motion
    // Instead of writing animation values inline, we define them as objects
    // Makes code cleaner and reusable

    hidden: {
      opacity: 0,
      // Invisible when out of view

      y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
      // 'up'   → starts 40px BELOW final position (slides UP into place)
      // 'down' → starts 40px ABOVE final position (slides DOWN into place)
      // other  → no vertical movement

      x: direction === 'left' ? 60 : direction === 'right' ? -60 : 0,
      // 'left'  → starts 60px to the RIGHT (slides LEFT into place)
      // 'right' → starts 60px to the LEFT (slides RIGHT into place)
      // other   → no horizontal movement
    },

    visible: {
      opacity: 1,   // Fully visible
      y: 0,         // Back to original vertical position
      x: 0,         // Back to original horizontal position
      transition: {
        duration: 0.7,              // Animation takes 0.7 seconds
        delay,                      // Wait this many seconds before starting
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic-bezier curve
        // This curve = starts fast, decelerates smoothly at end
        // Much more natural than linear or default ease
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      // Attaches the ref so useInView can watch this element's position

      variants={variants}
      // Connects our hidden/visible animation states

      initial="hidden"
      // Start in "hidden" state (invisible, offset position)

      animate={isInView ? "visible" : "hidden"}
      // When element is in viewport → animate to "visible"
      // When element leaves viewport → animate back to "hidden"
      // This creates the re-play effect on scroll
    >
      {children}
      {/* Renders whatever is wrapped inside <AnimateOnScroll>...</AnimateOnScroll> */}
    </motion.div>
  );
};


// ============================================================
// 🦸 HERO SECTION COMPONENT
// ============================================================

const HeroSection = () => {

  const { isSignedIn } = useUser();
  // Destructure just isSignedIn — we only need to know IF user is logged in
  // No need to pull the full user object here

  const navigate = useNavigate();
  // navigate('/path') → redirects user programmatically
  // Used in button handlers below


  // ── Button Handler: Chat With Kaira ──
  const handleChatWithKaira = () => {
    if (isSignedIn) {
      navigate('/services/AI-Kaira');
      // Logged in → go directly to AI chat page
    } else {
      navigate('/sign-in');
      // Not logged in → redirect to login first
      // (protects the AI feature behind authentication)
    }
  };

  // ── Button Handler: Sign Up / Dashboard ──
  const handleSignUp = () => {
    if (isSignedIn) {
      navigate('/dashboard');
      // Already logged in → no need to sign up, go to dashboard instead
    } else {
      navigate('/sign-up');
      // Not logged in → go to registration page
    }
  };
  // ↑ This pattern = auth-aware navigation
  // The same button serves different purposes based on login state
  // Avoids confusing UX where logged-in users see "Sign Up"

  return (
    <section
      style={{ backgroundImage: `url(${bgImg})` }}
      // Inline style used for dynamic value (imported variable)
      // Tailwind can't use JS variables directly — so backgroundImage must be inline
      // Template literal `url(${bgImg})` → proper CSS background-image format

      className="bg-cover bg-center bg-no-repeat text-white flex items-center"
      // bg-cover   → image scales to cover entire section (no gaps)
      // bg-center  → image is centered (most important part stays visible)
      // bg-no-repeat → prevents image from tiling/repeating
      // text-white → all text in this section inherits white color
      // flex items-center → vertically centers inner content
    >

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center py-30">
        {/* max-w-7xl mx-auto → centers content with max width, prevents stretching on large screens */}
        {/* grid grid-cols-1 → single column on mobile (stacked layout) */}
        {/* md:grid-cols-2  → two columns on tablet/desktop (side by side) */}
        {/* gap-10 md:gap-20 → space between the two columns */}
        {/* items-center → vertically aligns both columns to their centers */}
        {/* py-30 → vertical padding (breathing room top and bottom) */}

        {/* ── LEFT COLUMN: Text Content ── */}
        <div className='mt-10'>
        {/* mt-10 → small top margin to push content down slightly */}

          {/* Subtitle — animates first */}
          <AnimateOnScroll delay={0.1} direction="up">
            <p className="text-xl text-left mb-2">
              AI Powered Astrology
            </p>
          </AnimateOnScroll>
          {/* delay={0.1} → starts animating 0.1s after entering view */}

          {/* Main Heading — animates second */}
          <AnimateOnScroll delay={0.2} direction="up">
            <h1 className="text-3xl md:text-6xl whitespace-nowrap font-bold leading-tight mb-4">
              Read your Future with <br />
              <span className='text-orange-500'>AI Astrologer</span>
              {/* <br /> → forces line break so "AI Astrologer" appears on its own line */}
              {/* whitespace-nowrap → prevents heading from wrapping awkwardly */}
              {/* leading-tight → reduces line spacing for tighter heading look */}
            </h1>
          </AnimateOnScroll>
          {/* delay={0.2} → slight stagger after subtitle for cascade effect */}

          {/* Description Paragraph — animates third */}
          <AnimateOnScroll delay={0.3} direction="up">
            <p className="text-lg mb-8">
              Go beyond belief. Experience predictions that are calculated,
              personalized, and designed to guide your decisions with confidence.
            </p>
          </AnimateOnScroll>
          {/* delay={0.3} → each element staggers 0.1s apart → cascade/waterfall effect */}

          {/* Action Buttons — animate last */}
          <AnimateOnScroll delay={0.4} direction="up">
            <div className="flex gap-4 flex-wrap">
            {/* flex → buttons side by side */}
            {/* gap-4 → space between buttons */}
            {/* flex-wrap → if screen is narrow, buttons wrap to next line (responsive) */}

              {/* PRIMARY CTA: Chat With Kaira */}
              <motion.button
                onClick={handleChatWithKaira}
                // Runs auth check → navigates to AI chat or sign-in

                whileHover={{ scale: 1.05 }}
                // On mouse hover → button grows 5% larger
                // Gives tactile, interactive feel

                whileTap={{ scale: 0.95 }}
                // On click/tap → button shrinks 5%
                // Simulates physical button press — better UX

                className="bg-orange-500 flex gap-2 hover:bg-orange-600 text-white text-xl px-9 py-3 rounded-md font-semibold transition cursor-pointer"
              >
                Chat With Kaira
              </motion.button>

              {/* SECONDARY CTA: Sign Up OR Dashboard */}
              <motion.button
                onClick={handleSignUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-orange-400 text-orange-400 text-xl hover:bg-orange-400 hover:text-white px-9 py-3 rounded-md font-semibold transition cursor-pointer"
                // Outlined style (ghost button) → visually secondary to the filled primary button
                // hover → fills with orange color (inverted effect)
              >
                {isSignedIn ? 'Go to Dashboard' : 'Sign Up'}
                {/* Dynamic label based on auth state */}
                {/* Logged in user sees "Go to Dashboard" instead of "Sign Up" */}
              </motion.button>

            </div>
          </AnimateOnScroll>

        </div>

        {/* ── RIGHT COLUMN: AI Astrologer Image ── */}
        <AnimateOnScroll delay={0.2} direction="left">
        {/* direction="left" → image slides in from the RIGHT side */}
        {/* delay={0.2} → matches heading stagger timing */}

          <div className="flex justify-center md:ml-30">
          {/* justify-center → centers image horizontally in its column */}
          {/* md:ml-30 → on desktop, pushes image slightly right for visual balance */}

            <motion.img
              src={aiAstro}
              alt="Astrologer"
              // alt → accessibility + SEO (describes image for screen readers, search engines)

              className="w-80 md:w-96 rounded-full shadow-2xl border-4 border-orange-400"
              // w-80 → 320px wide on mobile
              // md:w-96 → 384px wide on desktop (slightly larger)
              // rounded-full → perfect circle crop
              // shadow-2xl → deep shadow → image "floats" off the background
              // border-4 border-orange-400 → orange ring around the circle

              transition={{ type: 'spring', stiffness: 200 }}
              // spring physics → adds a natural bounce/elastic feel to animations
              // stiffness: 200 → medium bounce (higher = stiffer/faster spring)
            />
          </div>
        </AnimateOnScroll>

      </div>
    </section>
  );
};

export default HeroSection;
// Default export → imported anywhere as: import HeroSection from './HeroSection'