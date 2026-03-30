import { Routes, Route } from 'react-router-dom'

// Pages
import Home from './Home'
import Horoscope from './Horoscope'

// Service pages
import Kundali from './Services/Kundali'
import Numerology from './Services/Numerology'
import Panchang from './Services/Panchang'
import Calculator from './Services/Calculator'
import KundaliMatching from './Services/Kundali_Matching'


// Contact
import Contact from './Contact'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Main pages */}
            <Route path="/" element={<Home />} />
            <Route path="/horoscope/:type" element={<Horoscope />} />

            {/* Service pages */}
            <Route path="services/Kundali" element={<Kundali />} />
            <Route path="services/Numerology" element={<Numerology />} />
            <Route path="services/Panchang" element={<Panchang />} />
            <Route path="services/Calculator" element={<Calculator />} />
            <Route path="services/Kundali-Matching" element={<KundaliMatching />} />

            <Route path='/contact' element={<Contact />}/>

                {/* 404 fallback */}
                {/* <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <h1 className="text-4xl font-bold text-purple-700">404</h1>
                    <p className="text-gray-500 mt-2">Page not found</p>
                </div>
            } /> */}
        </Routes>
    )
}

export default AppRoutes