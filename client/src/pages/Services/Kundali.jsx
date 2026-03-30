import React from 'react'
import Banner from '../../components/Horoscope/Banner'
import kundali_banner from '/ASTRO-AI/client/src/assets/globe.jpg'

const Kundali = () => {
  return (
    <>
      <div>
        <div className='h-64 relative flex justify-center items-center'>

          {/* Background Image */}
          <div className='absolute inset-0'>
            <img
              src={kundali_banner}
              alt="planets background"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Dark overlay so text is readable */}
          <div className='absolute inset-0 bg-black/50' />

          {/* Heading */}
          <h1 className="relative z-10 text-2xl md:text-4xl font-bold text-center text-white">
            Astro <span className='text-orange-400'>AI</span> Daily Horoscope
          </h1>

        </div>

      </div>

    </>
  )
}

export default Kundali