import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { LogOut, LayoutDashboard } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../assets/logo.png'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
]

const DROPDOWNS = [
  {
    name: 'horoscope',
    label: 'Horoscope',
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
      { label: 'AI Kaira', to: '/services/AI-Kaira' },
      { label: 'Free Kundli', to: '/services/kundali' },
      { label: 'Kundli Matching', to: '/services/kundali-matching' },
    ],
  },
]

const spring = {
  type: 'spring',
  stiffness: 260,
  damping: 20,
}

const ChevronIcon = ({ isOpen }) => (
  <motion.svg
    animate={{ rotate: isOpen ? 180 : 0 }}
    transition={{ duration: 0.2 }}
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.svg>
)

const ProfileDropdown = () => {
  const { user } = useUser()
  const { signOut } = useClerk()

  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const profileImage = user?.imageUrl
  const fullName = user?.fullName || user?.firstName || 'User'
  const email = user?.primaryEmailAddress?.emailAddress || 'No email'
  const initials = fullName.charAt(0).toUpperCase()

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 group"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 rounded-full ring-2 ring-orange-400 ring-offset-1 overflow-hidden"
        >
          {profileImage ? (
            <img
              src={profileImage}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
              {initials}
            </div>
          )}
        </motion.div>

        <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
          <ChevronIcon isOpen={open} />
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
          >
            <div className="px-4 py-4 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full ring-2 ring-orange-300 overflow-hidden flex-shrink-0">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-base">
                      {initials}
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {fullName}
                  </p>

                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            <div className="py-1.5">
              <Link
                to="/dashboard"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors"
              >
                <LayoutDashboard size={15} />
                My Dashboard
              </Link>

              <div className="my-1 border-t border-gray-100" />

              <button
                onClick={() => {
                  setOpen(false)
                  signOut()
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={15} />
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)

  const navRef = useRef(null)

  const location = useLocation()

  const { isSignedIn, user } = useUser()

  const { signOut } = useClerk()

  useEffect(() => {
    setDropdown(null)
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name)
  }

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={spring}
        >
          <Link to="/" className="flex items-center gap-1 group">
            <img className="w-16" src={logo} alt="AstroAI Logo" />

            <span className="text-3xl font-bold text-[#0a0a5f]">
              ASTRO<span className="text-orange-500">AI</span>
            </span>
          </Link>
        </motion.div>

        {/* DESKTOP MENU */}
        <ul className="hidden md:flex items-center text-sm font-bold gap-5">

          {NAV_LINKS.map((link) => (
            <motion.li
              key={link.to}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              <Link
                to={link.to}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                  isActive(link.to)
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            </motion.li>
          ))}

          {DROPDOWNS.map((dd) => (
            <li key={dd.name} className="relative">

              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
                onClick={() => toggleDropdown(dd.name)}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors duration-200 ${
                  dropdown === dd.name
                    ? 'text-orange-500 bg-orange-50'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </motion.button>

              <AnimatePresence>
                {dropdown === dd.name && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-64 z-50 py-1 overflow-hidden"
                  >
                    {dd.items.map((item) => (
                      <li key={item.to}>
                        <Link
                          to={item.to}
                          className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${
                            isActive(item.to)
                              ? 'text-orange-500 bg-orange-50 font-medium'
                              : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}

          <motion.li
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={spring}
          >
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${
                isActive('/contact')
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
              }`}
            >
              Contact Us
            </Link>
          </motion.li>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex gap-5 items-center">

          <div className="hidden md:block">
            {isSignedIn ? (
              <ProfileDropdown />
            ) : (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/sign-in"
                  className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-3 rounded-md transition-colors duration-200 font-semibold text-[18px]"
                >
                  Log In
                </Link>
              </motion.div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span
              animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 8 : 0,
              }}
              className="block w-5 h-0.5 bg-gray-700"
            />

            <motion.span
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              className="block w-5 h-0.5 bg-gray-700"
            />

            <motion.span
              animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? -8 : 0,
              }}
              className="block w-5 h-0.5 bg-gray-700"
            />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-1 text-sm overflow-hidden"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(link.to)
                    ? 'text-orange-500 bg-orange-50 font-medium'
                    : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {DROPDOWNS.map((dd) => (
              <div key={dd.name}>
                <button
                  onClick={() => toggleDropdown(dd.name)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors duration-200 ${
                    dropdown === dd.name
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  {dd.label}
                  <ChevronIcon isOpen={dropdown === dd.name} />
                </button>

                <AnimatePresence>
                  {dropdown === dd.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="ml-3 flex flex-col gap-1 mt-1 overflow-hidden"
                    >
                      {dd.items.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                            isActive(item.to)
                              ? 'text-orange-500 bg-orange-50 font-medium'
                              : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            <Link
              to="/contact"
              className="px-3 py-2.5 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
            >
              Contact Us
            </Link>

            {isSignedIn ? (
              <div className="mt-1 border border-orange-100 rounded-xl overflow-hidden">

                <div className="flex items-center gap-3 px-4 py-3 bg-orange-50">
                  <div className="w-10 h-10 rounded-full ring-2 ring-orange-300 overflow-hidden flex-shrink-0">

                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user?.fullName || 'Profile'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                        {(user?.fullName || 'U')
                          .charAt(0)
                          .toUpperCase()}
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    {user?.fullName && (
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user.fullName}
                      </p>
                    )}

                    <p className="text-xs text-gray-500 truncate">
                      {user?.primaryEmailAddress?.emailAddress}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                to="/sign-in"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-md font-semibold text-center"
              >
                Log In
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
