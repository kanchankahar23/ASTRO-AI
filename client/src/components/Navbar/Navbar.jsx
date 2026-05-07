import { useState, useEffect, useRef } from 'react'
// useState  → local state management (dropdown open/close, scroll, hamburger)
// useEffect → side effects like event listeners, cleanup
// useRef    → direct DOM reference without re-rendering (click outside detection)

import { Link, useLocation } from 'react-router-dom'
// Link        → client-side navigation (no full page reload like <a> tag does)
// useLocation → reads current URL path — used to highlight active nav link

import { useUser, useClerk } from '@clerk/clerk-react'
// useUser  → gives access to current logged-in user's data (name, photo, email)
// useClerk → gives access to Clerk methods like signOut()

import { LogOut, LayoutDashboard } from 'lucide-react'
// Lucide icons — lightweight SVG icon library
// LogOut, LayoutDashboard → used in profile dropdown menu

import logo from '../../assets/logo.png'
// Importing logo as a module so Vite handles it correctly
// (Direct string paths like "/assets/logo.png" break in production build)


// ============================================================
// 📋 STATIC DATA — NAV LINKS & DROPDOWNS
// ============================================================

const NAV_LINKS = [
  { label: 'Home', to: '/' },
]
// Simple nav links array — easy to add/remove links without touching JSX
// Keeping data separate from UI = cleaner, more maintainable code

const DROPDOWNS = [
  {
    name: 'horoscope',    // unique key to track which dropdown is open
    label: 'Horoscope',  // display text in navbar
    items: [
      { label: 'Daily Horoscope', to: '/horoscope/daily' },
      { label: 'Weekly Horoscope', to: '/horoscope/weekly' },
      { label: 'Yearly Horoscope', to: '/horoscope/yearly' },
    ],
  },
  {
    name: 'services',
    label: 'Services',
    items: [
      { label: 'Numerology', to: '/services/numerology' },
      // { label: 'Panchang', to: '/services/panchang' }, 
      { label: 'AI Kaira', to: '/services/AI-Kaira' },
      { label: 'Free Kundli', to: '/services/kundali' },
      { label: 'Kundli Matching', to: '/services/kundali-matching' },
    ],
  },
]
// Array of dropdown objects — avoids repeating dropdown JSX for each menu
// This is the "data-driven UI" pattern — very common in production apps


// ============================================================
// 🔽 CHEVRON ICON — Animated Arrow
// ============================================================

const ChevronIcon = ({ isOpen }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      // ↑ Rotates arrow UP when dropdown is open, DOWN when closed
      transition: 'transform 0.2s ease',
      // ↑ Smooth rotation animation — better UX than instant flip
    }}
  >
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
    {/* currentColor → inherits text color from parent, so it auto-matches */}
  </svg>
)


// ============================================================
// 👤 PROFILE DROPDOWN COMPONENT
// ============================================================

const ProfileDropdown = () => {
  const { user } = useUser()
  // user object contains: imageUrl, fullName, firstName, primaryEmailAddress

  const { signOut } = useClerk()
  // signOut() → Clerk's built-in method to log the user out

  const [open, setOpen] = useState(false)
  // Controls whether the dropdown panel is visible or hidden

  const ref = useRef(null)
  // ref attached to the dropdown container div
  // Used to detect clicks OUTSIDE the dropdown → close it automatically

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
        // If click happened outside this component → close dropdown
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    // mousedown fires before click — more reliable for outside-click detection

    return () => document.removeEventListener('mousedown', handleClickOutside)
    // ⚠️ Cleanup: removes event listener when component unmounts
    // Without this → memory leak (listener keeps running even after component is gone)
  }, [])
  // [] → runs only once on mount (not on every re-render)

  // ── Extract user info with fallbacks ──
  const profileImage = user?.imageUrl          // Google profile photo from Clerk
  const fullName = user?.fullName || user?.firstName || 'User'
  // ?. (optional chaining) → safely access nested properties without crashing if null
  const email = user?.primaryEmailAddress?.emailAddress || 'No email'
  const initials = fullName.charAt(0).toUpperCase()
  // Used as fallback when no profile photo — shows first letter of name

  return (
    <div className="relative" ref={ref}>
    {/* relative → so the dropdown panel (absolute) positions relative to this div */}

      {/* ── Circular Profile Button ── */}
      <button
        onClick={() => setOpen(!open)}
        // Toggle: if open → close, if closed → open
        className="flex items-center gap-1.5 group"
        // group → allows child elements to react to parent hover with group-hover:
        aria-label="Profile menu"
        // aria-label → accessibility: screen readers know what this button does
      >
        <div className="w-10 h-10 rounded-full ring-2 ring-orange-400 ring-offset-1 overflow-hidden transition-all duration-200 group-hover:ring-orange-500 group-hover:scale-105">
          {/* rounded-full → circular shape */}
          {/* ring-2 ring-orange-400 → glowing orange border around circle */}
          {/* overflow-hidden → clips the image inside the circle boundary */}
          {/* group-hover:scale-105 → slight zoom on hover = better interactivity */}

          {profileImage ? (
            // If Clerk has a profile photo → show it
            <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
            // object-cover → fills circle without stretching the image
          ) : (
            // If no photo → show colored circle with initial letter
            <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          )}
        </div>

        <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
          <ChevronIcon isOpen={open} />
          {/* Arrow rotates based on open state */}
        </span>
      </button>

      {/* ── Dropdown Panel ── */}
      {open && (
        // Conditional rendering: only mounts DOM element when open = true
        // (better performance than display:none which keeps it in DOM always)
        <div
          className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
          // absolute → positions relative to parent (the "relative" div)
          // right-0 → aligns to right edge of button
          // top-full → starts just below the button
          // z-50 → appears above all other content
          style={{ animation: 'dropIn 0.15s ease' }}
          // dropIn → custom keyframe animation defined at bottom of file
        >

          {/* Header: photo + name + email */}
          <div className="px-4 py-4 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full ring-2 ring-orange-300 overflow-hidden flex-shrink-0">
                {/* flex-shrink-0 → prevents photo from shrinking when name is long */}
                {profileImage ? (
                  <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-base">
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                {/* min-w-0 → allows text truncation to work inside flex container */}
                <p className="text-sm font-semibold text-gray-800 truncate">{fullName}</p>
                {/* truncate → adds "..." if name is too long */}
                <p className="text-xs text-gray-500 truncate mt-0.5">{email}</p>
              </div>
            </div>
          </div>

          {/* Action Links */}
          <div className="py-1.5">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              // Close dropdown when user clicks a link — better UX
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
            >
              <LayoutDashboard size={15} className="text-gray-400" />
              My Dashboard
            </Link>

            <div className="my-1 border-t border-gray-100" />
            {/* Visual separator line between items */}

            {/* Logout Button */}
            <button
              onClick={() => { setOpen(false); signOut() }}
              // First close dropdown, THEN sign out — avoids UI flicker
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150"
            >
              <LogOut size={15} />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}


// ============================================================
// 🧭 MAIN NAVBAR COMPONENT
// ============================================================

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  // Controls mobile hamburger menu open/close

  const [dropdown, setDropdown] = useState(null)
  // Stores the NAME of the currently open dropdown (e.g., 'horoscope')
  // null = no dropdown open
  // Only one dropdown can be open at a time (single string, not array)

  const [scrolled, setScrolled] = useState(false)
  // Tracks if user has scrolled down — used to add shadow to navbar

  const navRef = useRef(null)
  // Ref on the entire <nav> element
  // Used to close dropdowns when clicking outside the navbar

  const location = useLocation()
  // Returns current URL path like "/horoscope/daily"
  // Used for active link highlighting and auto-closing dropdowns on navigation

  const { isSignedIn, user } = useUser()
  // isSignedIn → boolean: true if user is logged in
  // user → user data object (used in mobile menu)

  const { signOut } = useClerk()
  // Used in mobile menu logout button

  // ── Close everything on route change ──
  useEffect(() => {
    setDropdown(null)
    setIsOpen(false)
    // When user navigates to a new page → close mobile menu and dropdowns
    // Without this, menu stays open after navigation = bad UX
  }, [location])
  // [location] → runs every time the URL changes

  // ── Close dropdown on outside click ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
    // Cleanup prevents memory leak
  }, [])

  // ── Add shadow on scroll ──
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    // If user scrolled more than 10px → setScrolled(true) → shadow appears
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
    // Cleanup on unmount
  }, [])

  const toggleDropdown = (name) =>
    setDropdown(dropdown === name ? null : name)
  // If clicking the already-open dropdown → close it (toggle behavior)
  // If clicking a different dropdown → open that one (auto-closes previous)

  const isActive = (path) => location.pathname === path
  // Returns true if the given path matches current URL
  // Used to apply orange highlight color to active nav link

  return (
    <nav
      ref={navRef}
      // Attaching ref to track outside clicks
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      // sticky top-0 → navbar sticks to top of viewport when scrolling
      // z-50 → stays above all other content
      // shadow-md when scrolled → gives depth effect (common UI pattern)
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* max-w-7xl mx-auto → centers content with max width (responsive layout) */}
        {/* justify-between → logo on left, menu in center, button on right */}

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-1 group">
          <img className="w-16" src={logo} alt="AstroAI Logo" />
          {/* alt → accessibility: screen readers & broken image fallback */}
          <span className="text-3xl font-bold text-[#0a0a5f]">
            ASTRO<span className="text-orange-500">AI</span>
            {/* Two-color brand name: dark blue + orange accent */}
          </span>
        </Link>

        {/* ── Desktop Navigation Menu (hidden on mobile) ── */}
        <ul className="hidden md:flex items-center text-sm font-bold gap-5">
          {/* hidden md:flex → invisible on small screens, flex on medium+ screens */}

          {/* Simple links */}
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              {/* key={link.to} → unique key for React's reconciliation algorithm */}
              <Link to={link.to}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-orange-500 bg-orange-50'   // active: orange highlight
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'  // default
                }`}
              >{link.label}</Link>
            </li>
          ))}

          {/* Dropdown menus */}
          {DROPDOWNS.map((dd) => (
            <li key={dd.name} className="relative">
              {/* relative → dropdown panel positions relative to this li */}
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors duration-200 ${
                  dropdown === dd.name
                    ? 'text-orange-500 bg-orange-50'  // highlighted when open
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
                {/* Passes open state → rotates arrow accordingly */}
              </button>

              {/* Dropdown panel — only renders when this dropdown is active */}
              {dropdown === dd.name && (
                <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-64 z-50 py-1 overflow-hidden"
                  style={{ animation: 'dropIn 0.15s ease' }}>
                  {dd.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${
                          isActive(item.to)
                            ? 'text-orange-500 bg-orange-50 font-medium'
                            : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                        }`}
                      >{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <Link to="/contact"
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/contact')
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >Contact Us</Link>
          </li>
        </ul>

        {/* ── Right Side: Login Button or Profile ── */}
        <div className="flex gap-5 items-center">

          <div className="hidden md:block">
            {/* Only shows on desktop (md+), mobile has its own section below */}
            {isSignedIn ? (
              <ProfileDropdown />
              // If logged in → show circular profile photo with dropdown
            ) : (
              <Link to="/sign-in"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-3 rounded-md transition-colors duration-200 font-semibold text-[18px]"
              >Log In</Link>
              // If not logged in → show Log In button
            )}
          </div>

          {/* ── Mobile Hamburger Button ── */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
            // md:hidden → only visible on small screens
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {/* 3 lines that animate into X when menu opens */}
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            {/* Top line: moves down + rotates 45° → forms top of X */}
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            {/* Middle line: fades out when open */}
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
            {/* Bottom line: moves up + rotates -45° → forms bottom of X */}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu (full dropdown) ── */}
      {isOpen && (
        // Only renders when hamburger is clicked
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-1 text-sm">
          {/* md:hidden → this entire section is only for mobile */}

          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-2.5 rounded-lg transition-colors ${
                isActive(link.to) ? 'text-orange-500 bg-orange-50 font-medium' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >{link.label}</Link>
          ))}

          {DROPDOWNS.map((dd) => (
            <div key={dd.name}>
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors duration-200 ${
                  dropdown === dd.name ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </button>
              {dropdown === dd.name && (
                <div className="ml-3 flex flex-col gap-1 mt-1">
                  {/* ml-3 → slight indent to show hierarchy (parent → children) */}
                  {dd.items.map((item) => (
                    <Link key={item.to} to={item.to}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        isActive(item.to) ? 'text-orange-500 bg-orange-50 font-medium' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                      }`}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/contact" className="px-3 py-2.5 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors">
            Contact Us
          </Link>

          {/* ── Mobile: Profile section or Login ── */}
          {isSignedIn ? (
            <div className="mt-1 border border-orange-100 rounded-xl overflow-hidden">
              {/* User info card */}
              <div className="flex items-center gap-3 px-4 py-3 bg-orange-50">
                <div className="w-10 h-10 rounded-full ring-2 ring-orange-300 overflow-hidden flex-shrink-0">
                  {user?.imageUrl ? (
                    <img src={user.imageUrl} alt={user?.fullName || 'Profile'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                      {(user?.fullName || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  {user?.fullName && <p className="text-sm font-semibold text-gray-800 truncate">{user.fullName}</p>}
                  <p className="text-xs text-gray-500 truncate">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>

              {/* Logout in mobile */}
              <button
                onClick={() => signOut()}
                // No need to close menu — signOut() causes a full re-render anyway
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/sign-in" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-md font-semibold text-center">
              Log In
            </Link>
          )}
        </div>
      )}

      {/* ── Custom CSS Animations ── */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* dropIn → dropdown menus fade in while sliding down slightly */
        /* Creates a smooth, professional feel instead of instant appearance */
      `}</style>
    </nav>
  )
}

export default Navbar
// Named export not used here — default export means:
// import Navbar from './Navbar'  ← works without curly braces