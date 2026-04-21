import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useUser, useClerk } from '@clerk/clerk-react'
import { Sun, LogOut, LayoutDashboard } from 'lucide-react'
import logo from '/ASTRO-AI/client/src/assets/logo.png'

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
      { label: 'Panchang', to: '/services/panchang' },
      { label: 'AI Kaira', to: '/services/AI-Kaira' },

      
      { label: 'Free Kundli', to: '/services/kundali' },
      { label: 'Kundli Matching', to: '/services/kundali-matching' },
    ],
  },
]

const ChevronIcon = ({ isOpen }) => (
  <svg
    width="12" height="12" viewBox="0 0 12 12"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.2s ease',
    }}
  >
    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

// ✅ Profile Dropdown Component
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
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const profileImage = user?.imageUrl          // ✅ Clerk profile photo URL
  const fullName = user?.fullName || user?.firstName || 'User'
  const email = user?.primaryEmailAddress?.emailAddress || 'No email'
  const initials = fullName.charAt(0).toUpperCase()

  return (
    <div className="relative" ref={ref}>

      {/* ✅ Circular Profile Photo Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 group"
        aria-label="Profile menu"
      >
        {/* Circle — like the reference image */}
        <div className="w-10 h-10 rounded-full ring-2 ring-orange-400 ring-offset-1 overflow-hidden transition-all duration-200 group-hover:ring-orange-500 group-hover:scale-105">
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
        </div>
        <span className="text-gray-400 group-hover:text-orange-500 transition-colors">
          <ChevronIcon isOpen={open} />
        </span>
      </button>

      {/* ✅ Dropdown Panel */}
      {open && (
        <div
          className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 overflow-hidden"
          style={{ animation: 'dropIn 0.15s ease' }}
        >
          {/* Header with photo + name + email */}
          <div className="px-4 py-4 bg-gradient-to-br from-orange-50 to-white border-b border-orange-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full ring-2 ring-orange-300 overflow-hidden flex-shrink-0">
                {profileImage ? (
                  <img src={profileImage} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-500 flex items-center justify-center text-white font-bold text-base">
                    {initials}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">{fullName}</p>
                {/* ✅ Email */}
                <p className="text-xs text-gray-500 truncate mt-0.5">{email}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="py-1.5">
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
            >
              <LayoutDashboard size={15} className="text-gray-400" />
              My Dashboard
            </Link>

            <div className="my-1 border-t border-gray-100" />

            {/* ✅ Logout */}
            <button
              onClick={() => { setOpen(false); signOut() }}
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

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef(null)
  const location = useLocation()

  const { isSignedIn, user } = useUser()
  const { signOut } = useClerk()

  useEffect(() => { setDropdown(null); setIsOpen(false) }, [location])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setDropdown(null)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleDropdown = (name) => setDropdown(dropdown === name ? null : name)
  const isActive = (path) => location.pathname === path

  return (
    <nav
      ref={navRef}
      style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      className={`bg-white sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group">
          <img className="w-16" src={logo} alt="AstroAI Logo" />
          <span className="text-3xl font-bold text-[#0a0a5f]">
            ASTRO<span className="text-orange-500">AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center text-sm font-bold gap-5">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to}
                className={`px-3 py-2 rounded-md transition-colors duration-200 ${isActive(link.to) ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
              >{link.label}</Link>
            </li>
          ))}

          {DROPDOWNS.map((dd) => (
            <li key={dd.name} className="relative">
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`px-3 py-2 rounded-md flex items-center gap-1.5 transition-colors duration-200 ${dropdown === dd.name ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </button>

              {dropdown === dd.name && (
                <ul className="absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg w-64 z-50 py-1 overflow-hidden"
                  style={{ animation: 'dropIn 0.15s ease' }}>
                  {dd.items.map((item) => (
                    <li key={item.to}>
                      <Link to={item.to}
                        className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors duration-150 ${isActive(item.to) ? 'text-orange-500 bg-orange-50 font-medium' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
                      >{item.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          <li>
            <Link to="/contact"
              className={`px-3 py-2 rounded-md transition-colors duration-200 ${isActive('/contact') ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
            >Contact Us</Link>
          </li>
        </ul>

        {/* Right Side */}
        
        <div className="flex gap-5 items-center">
            <div className="bg-zinc-100 p-2 rounded-md">
            <Sun className="text-orange-600" />
          </div>
          <div className="hidden md:block">
            {isSignedIn ? (
              <ProfileDropdown />   // ✅ circular photo button
            ) : (
              <Link to="/sign-in"
                className="bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white px-8 py-3 rounded-md transition-colors duration-200 font-semibold text-sm"
              >Log In</Link>
            )}
          </div>

       

          {/* Mobile Hamburger */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pb-4 flex flex-col gap-1 text-sm">
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to}
              className={`px-3 py-2.5 rounded-lg transition-colors ${isActive(link.to) ? 'text-orange-500 bg-orange-50 font-medium' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
            >{link.label}</Link>
          ))}

          {DROPDOWNS.map((dd) => (
            <div key={dd.name}>
              <button
                onClick={() => toggleDropdown(dd.name)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-1.5 transition-colors duration-200 ${dropdown === dd.name ? 'text-orange-500 bg-orange-50' : 'text-gray-700 hover:text-orange-500 hover:bg-orange-50'}`}
              >
                {dd.label}
                <ChevronIcon isOpen={dropdown === dd.name} />
              </button>
              {dropdown === dd.name && (
                <div className="ml-3 flex flex-col gap-1 mt-1">
                  {dd.items.map((item) => (
                    <Link key={item.to} to={item.to}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${isActive(item.to) ? 'text-orange-500 bg-orange-50 font-medium' : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50'}`}
                    >{item.label}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <Link to="/contact"
            className="px-3 py-2.5 rounded-lg text-gray-700 hover:text-orange-500 hover:bg-orange-50 transition-colors"
          >Contact Us</Link>

          {/* ✅ Mobile: circular photo + email + logout */}
          {isSignedIn ? (
            <div className="mt-1 border border-orange-100 rounded-xl overflow-hidden">
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
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/sign-in"
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-md font-semibold text-center"
            >Log In</Link>
          )}
        </div>
      )}

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