import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 md:gap-30 gap-12">

        {/* Column 1 - Logo & Tagline */}
        <div>
          <div className='flex gap-1.5 text-center'>
            <img className='w-12' src={logo} alt="" />
            <h2 className="text-3xl text-center font-bold text-[#0a0a5f] mb-3">ASTRO <span className='text-orange-500'>AI</span></h2>
          </div>

          <p className="text-sm mt-2 text-gray-700 italic">
            "Astrology reveals the will of the gods. If you understand this language, the sky speaks to you."
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-[#06064b] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[15px] text-[#0a0a5f]">
            <li><Link to="/privacy-policy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400 transition">Terms & Conditions</Link></li>
            <li><Link to="/horoscope/daily" className="hover:text-orange-700 transition">My Daily Horoscope</Link></li>
            <li><Link to="/horoscope/weekly" className="hover:text-orange-700 transition">My Weekly Horoscope</Link></li>
            <li><Link to="/horoscope/yearly" className="hover:text-orange-700 transition">My Yearly Horoscope</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-lg font-semibold text-[#0a0a5f] mb-4">Contact Info</h3>
          <ul className="space-y-2 text-[15px] text-[#0a0a5f]">
            <li>📞 <a href="tel:+919294549294" className="hover:text-orange-400">+(91) 9294-54-9294</a></li>
            <li>📞 <a href="tel:+919294589294" className="hover:text-orange-400">+(91) 9294-58-9294</a></li>
            <li>📧 <a href="mailto:support@astro-buddy.com" className="hover:text-orange-400">support@Astro-AI.com</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-600">
        Copyright © 2026 ASTRO AI. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer