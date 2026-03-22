import { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [dropdown, setDropdown] = useState(null)

  const toggleDropdown = (name) => {
    setDropdown(dropdown === name ? null : name)
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-orange-400">🔮 AstroBuddy</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium">

          <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
          <li><a href="#about" className="hover:text-orange-400 transition">About Us</a></li>

          {/* Horoscope Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('horoscope')}
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              Horoscope ▾
            </button>
            {dropdown === 'horoscope' && (
              <ul className="absolute top-8 left-0 bg-gray-800 rounded shadow-lg w-44 z-50">
                <li><Link to="/horoscope/daily" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Daily Horoscope</Link></li>
                <li><Link to="/horoscope/weekly" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Weekly Horoscope</Link></li>
                <li><Link to="/horoscope/yearly" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Yearly Horoscope</Link></li>
              </ul>
            )}
          </li>

          {/* Services Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('services')}
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              Services ▾
            </button>
            {dropdown === 'services' && (
              <ul className="absolute top-8 left-0 bg-gray-800 rounded shadow-lg w-44 z-50">
                <li><Link to="/numerology" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Numerology</Link></li>
                <li><Link to="/panchang" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Daily Panchang</Link></li>
                <li><Link to="/get-yogas" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Get Yoga's</Link></li>
              </ul>
            )}
          </li>

          {/* Kundli Dropdown */}
          <li className="relative">
            <button
              onClick={() => toggleDropdown('kundli')}
              className="hover:text-orange-400 transition flex items-center gap-1"
            >
              Kundli ▾
            </button>
            {dropdown === 'kundli' && (
              <ul className="absolute top-8 left-0 bg-gray-800 rounded shadow-lg w-44 z-50">
                <li><Link to="/kundli/free" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Free Kundli</Link></li>
                <li><Link to="/kundli/matching" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Kundli Matching</Link></li>
                <li><Link to="/kundli/premium" className="block px-4 py-2 hover:bg-orange-500 hover:text-white">Premium Kundli</Link></li>
              </ul>
            )}
          </li>

          <li><Link to="/contact" className="hover:text-orange-400 transition">Contact Us</Link></li>

          <li>
            <Link to="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition font-semibold">
              Log In
            </Link>
          </li>

        </ul>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 flex flex-col gap-3 text-sm">
          <Link to="/" className="hover:text-orange-400">Home</Link>
          <Link to="/horoscope/daily" className="hover:text-orange-400">Daily Horoscope</Link>
          <Link to="/horoscope/weekly" className="hover:text-orange-400">Weekly Horoscope</Link>
          <Link to="/numerology" className="hover:text-orange-400">Numerology</Link>
          <Link to="/kundli/free" className="hover:text-orange-400">Free Kundli</Link>
          <Link to="/contact" className="hover:text-orange-400">Contact Us</Link>
          <Link to="/login" className="bg-orange-500 text-white px-4 py-2 rounded-full text-center">Log In</Link>
        </div>
      )}

    </nav>
  )
}

export default Navbar