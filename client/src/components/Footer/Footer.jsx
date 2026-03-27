import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Column 1 - Logo & Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-orange-400 mb-3">ASTRO AI</h2>
          <p className="text-sm text-gray-400 italic">
            "Astrology reveals the will of the gods. If you understand this language, the sky speaks to you."
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-orange-400 transition">Terms & Conditions</Link></li>
            <li><Link to="/horoscope/daily" className="hover:text-orange-400 transition">My Daily Horoscope</Link></li>
            <li><Link to="/horoscope/weekly" className="hover:text-orange-400 transition">My Weekly Horoscope</Link></li>
            <li><Link to="/horoscope/yearly" className="hover:text-orange-400 transition">My Yearly Horoscope</Link></li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>📞 <a href="tel:+919294549294" className="hover:text-orange-400">+(91) 9294-54-9294</a></li>
            <li>📞 <a href="tel:+919294589294" className="hover:text-orange-400">+(91) 9294-58-9294</a></li>
            <li>📧 <a href="mailto:support@astro-buddy.com" className="hover:text-orange-400">support@astro-buddy.com</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        Copyright © 2026 AstroBuddy. All Rights Reserved.
      </div>

    </footer>
  )
}

export default Footer