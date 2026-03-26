import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home"
import Footer from "./components/Footer/Footer"
import Horoscope from "./pages/Horoscope"

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/horoscope/daily" element={<Horoscope />} />
        <Route path="/horoscope/weekly" element={<Horoscope />} />
        <Route path="/horoscope/yearly" element={<Horoscope />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App