import React from 'react'
import kundali_banner from '/ASTRO-AI/client/src/assets/globe.jpg'

const Kundali = () => {
  return (
    <div>

      {/* 🔶 Banner Section */}
      <div className="relative h-72 md:h-80 flex flex-col items-center justify-center text-center">

        <img
          src={kundali_banner}
          alt="Kundali Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white">
          Home / <span className="text-orange-400">Kundali</span>
        </h1>

        <p className="relative z-10 mt-3 text-gray-200 md:text-lg px-4 max-w-xl">
          See today’s cosmic forecast and plan your day with confidence.
        </p>
      </div>

      {/* 🔶 Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
          Free Kundli Online - Get Your Detailed Birth Chart
        </h2>
        <div className='h-0.5 bg-amber-500 w-96 mb-3'></div>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looking for your free Kundli from expert astrologers? You are at the right place.
          Get accurate insights about your career, love life, marriage, and future predictions.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laudantium perspiciatis esse fugit. Excepturi deleniti ab explicabo enim vel maiores deserunt, quia similique tempora nam maxime neque illum sed doloribus!
          Hic laborum perspiciatis atque harum dicta quae iusto fuga perferendis officia temporibus! Enim labore quas excepturi possimus laudantium? Et dolores impedit quia cupiditate eum perferendis. Quasi quo assumenda magni dolorem.
        </p>

        {/* 🔶 Form Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-16">

          <h3 className="text-2xl font-semibold mb-2 text-orange-500">
            New Kundli
          </h3>
          <div className='h-0.5 bg-amber-500 w-16 mb-5'></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Name */}
            <div>
              <label className="block mb-2 text-xl text-gray-600">Name</label>
              <input
                type="text"
                placeholder="Enter your Name"
                className="w-full border border-zinc-500 rounded-sm px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            {/* DOB */}
            <div>
              <label className="block mb-2 text-xl text-gray-600">Date of Birth</label>
              <input
                type="date"
                className="w-full border border-zinc-500 rounded-s px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block mb-2 text-xl text-gray-600">Time of Birth</label>
              <input
                type="time"
                className="w-full border border-zinc-500 rounded-s px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Place */}
            <div>
              <label className="block mb-2 text-xl text-gray-600">Place</label>
              <input
                type="text"
                placeholder="Enter your Birth Place"
                className="w-full border border-zinc-500 rounded-s px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            {/* Gender */}
            <div className="md:col-span-2">
              <label className="block mb-2 text-xl text-gray-600">Gender</label>
              <select
                className="w-full border border-zinc-500 rounded-s focus:border-orange-400 px-6 py-3 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>

          {/* Button */}
          <button className="mt-6 w-full md:w-auto bg-orange-500 hover:bg-orange-600 font-semibold text-white px-10 py-3 rounded-lg transition">
            Generate Kundali
          </button>

        </div>
      </div>

    </div>
  )
}

export default Kundali