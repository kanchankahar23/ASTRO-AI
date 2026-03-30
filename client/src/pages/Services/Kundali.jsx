import React from 'react'
import Banner from '../../components/Horoscope/Banner'
import kundali_banner from '/ASTRO-AI/client/src/assets/globe.jpg'

const Kundali = () => {
  return (
    <>
      <div>
           <div className="relative h-72 md:h-80 flex flex-col items-center justify-center">
      
                      {/* Background image */}
                      <img
                          src={kundali_banner}
                          alt="Astro AI Banner"
                          className="absolute inset-0 w-full h-full object-cover"
                      />
      
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/60" />
      
                      {/* Main heading */}
                      <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
                          Home / <span className="text-orange-400">Kundali</span>
                      </h1>{/* Subtitle / Description */}
        <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
          See today’s cosmic forecast and plan your day with confidence.
        </p>
                  </div>

      </div>

    </>
  )
}

export default Kundali