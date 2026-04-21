import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './Home'
import Horoscope from './Horoscope'

// Service pages
import Numerology from './Services/Numerology'
import Panchang from './Services/Panchang'
import Calculator from './Services/Calculator'

// Contact
import Contact from './Contact'
import Kundali from './Kundali'
import KundaliMatching from './Services/KundaliMatching'

import AI_Kaira from './AI_Kaira'
import SignInPage from './SignInPage'
import SignUpPage from './SignUpPage'
import Dashboard from './Dashboard'


const AppRoutes = () => {
    return (
        <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/horoscope/:type" element={<Horoscope />} />

            {/* Services */}
            <Route path="/services/kundali" element={<Kundali />} />
            <Route path="/services/numerology" element={<Numerology />} />
            <Route path="/services/panchang" element={<Panchang />} />  {/* ✅ Fixed */}
            <Route path="/services/calculator" element={<Calculator />} />
            <Route path="/services/AI-Kaira" element={<AI_Kaira />} />
            <Route path="/services/kundali-matching" element={<KundaliMatching />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Dashboard */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Auth */}
            <Route path="/sign-in/*" element={<SignInPage />} />
            <Route path="/sign-up/*" element={<SignUpPage />} />

            {/* 404 */}
            <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <h1 className="text-4xl font-bold text-purple-700">404</h1>
                    <p className="text-gray-500 mt-2">Page not found</p>
                </div>
            } />
        </Routes>
    )
}

export default AppRoutes