import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react'

import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
const App = () => {
  return (
    <Router>
      <Navbar />
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App