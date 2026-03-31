import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '/ASTRO-AI/client/src/assets/logo.png'
import { Sun } from 'lucide-react'
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
      { label: 'Numerology', to: 'services/numerology' },
      { label: 'Panchang', to: 'services/panchang' },
      { label: 'Calculator', to: 'services/calculator' },
      { label: 'Free Kundli', to: '/services/Kundali' },
      { label: 'Kundli Matching', to: '/services/kundali-matching' },
    ],
  },
]

const ChevronIcon = ({ isOpen }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }}
  >
    <path
      d="M2 4L6 8L10 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  // Close dropdown on route change
  useEffect(() => {
    setDropdown(null)
    setIsOpen(false)
  }, [location])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name)
  }
  const isActive = (path) => location.pathname === path

  return (
    <nav
      ref={navRef}
      style={{ fontFamily: "Arial,Helvetica,sans-serif" }}
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          {/* Fallback logo if image fails */}
          <img className='w-16' src={logo} alt="" />
          <span className="text-3xl font-bold text-[#0a0a5f] transition-colors duration-200">
            ASTRO<span className="text-orange-500">AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-sm font-bold gap-5">

          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${isActive(link.to)
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Dynamic Dropdowns */}
          {DROPDOWNS.map((dd) => (
            <li key={dd.name} className="relative">
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors duration-200 ${dropdown === dd.name
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </button>

              {/* Dropdown Menu */}
              {dropdown === dd.name && (
                <ul
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-64 z-50 py-1 overflow-hidden"
                  style={{ animation: 'dropIn 0.15s ease' }}
                >
                  {dd.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${isActive(item.to)
                          ? 'text-orange-500 bg-orange-50 font-medium'
                          : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <Link
              to="/contact"
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${isActive('/contact')
                ? 'text-orange-500 bg-orange-50'
                : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
            >
              Contact Us
            </Link>
          </li>


          <li>


          </li>
        </ul>

        <div className='flex gap-2'>
          <div className="mt-2 mr-4 hidden md:block">
            <Link
              to="/login"
              className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-3 rounded-md transition-colors duration-200 font-semibold text-sm"
            >
              Log In
            </Link>
          </div>

          <div className=' bg-zinc-200 p-2 rounded-md '>
            <Sun className='text-orange-600' />
          </div>
          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
            />
          </button>

        </div>


      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-1 text-sm">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-2.5 rounded-lg transition-colors ${isActive(link.to)
                ? 'text-orange-500 bg-orange-50 font-medium'
                : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                }`}
            >
              {link.label}
            </Link>
          ))}
          {/* Dynamic Dropdowns */}
          {DROPDOWNS.map((dd) => (
            <li key={dd.name} className="relative">
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors duration-200 ${dropdown === dd.name
                  ? 'text-orange-500 bg-orange-50'
                  : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </button>

              {/* Dropdown Menu */}
              {dropdown === dd.name && (
                <ul
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-64 z-50 py-1 overflow-hidden"
                  style={{ animation: 'dropIn 0.15s ease' }}
                >
                  {dd.items.map((item) => (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${isActive(item.to)
                          ? 'text-orange-500 bg-orange-50 font-medium'
                          : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}


          <Link
            to="/contact"
            className="px-3 py-2.5 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 sm:px-2 sm:py-2  text-white md:px-8 md:py-3 rounded-md transition-colors duration-200 font-semibold text-sm"
          >
            Log In
          </Link>
          <div className='bg-zinc-200 p-2 rounded-md '>
            <Sun className='text-orange-600' />
          </div>

        </div>
      )}

      {/* Dropdown animation */}
      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  )
}

export default Navbar