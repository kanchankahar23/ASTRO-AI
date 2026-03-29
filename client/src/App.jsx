import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"

// Pages
import Home from "./pages/Home"
import Horoscope from "./pages/Horoscope"
import Kundali from "./pages/Kundali"


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>

        {/* Main pages */}
        <Route path="/" element={<Home />} />

        {/* Single dynamic route instead of 3 separate ones */}
        <Route path="/horoscope/:type" element={<Horoscope />} />

        {/* Kundali */}
        <Route path="/kundali" element={<Kundali />} />

        {/* 404 fallback */}
        <Route path="*" element={
          <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-purple-700">404</h1>
            <p className="text-gray-500 mt-2">Page not found</p>
          </div>
        } />

      </Routes>
      <Footer />
    </Router>
  )
}

export default App