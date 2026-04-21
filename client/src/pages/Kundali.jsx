import { useState } from 'react'
import axios from 'axios'
import kundali_banner from '../../assets/globe.jpg'

const Kundali = () => {


  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    time: '',
    place: '',
    gender: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  console.log('Kundali loaded!')
  console.log('formData:', formData)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {

    console.log('Button clicked!')
    console.log('formData:', formData)
    if (!formData.name || !formData.dob || !formData.time || !formData.place || !formData.gender) {
      setError('Please fill all fields!')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/kundali', formData)
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div>

      {/* Banner Section */}
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
          See today's cosmic forecast and plan your day with confidence.
        </p>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        <h2 className="text-2xl md:text-3xl font-semibold mb-3 text-gray-800">
          Free Kundli Online - Get Your Detailed Birth Chart
        </h2>
        <div className='h-0.5 bg-amber-500 w-96 mb-3'></div>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looking for your free Kundli from expert astrologers? You are at the right place.
          Get accurate insights about your career, love life, marriage, and future predictions.
        </p>

        {/* Form Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 md:p-16">
          <h3 className="text-2xl font-semibold mb-2 text-orange-500">New Kundli</h3>
          <div className='h-0.5 bg-amber-500 w-16 mb-5'></div>

          {/* Error */}
          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 text-xl text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your Name"
                className="w-full border border-zinc-500 rounded-sm px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-xl text-gray-600">Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-zinc-500 rounded-sm px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-xl text-gray-600">Time of Birth</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full border border-zinc-500 rounded-sm px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            <div>
              <label className="block mb-2 text-xl text-gray-600">Place</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                placeholder="Enter your Birth Place"
                className="w-full border border-zinc-500 rounded-sm px-6 py-3 focus:border-orange-400 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-xl text-gray-600">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-zinc-500 rounded-sm focus:border-orange-400 px-6 py-3 outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 w-full md:w-auto bg-orange-500 hover:bg-orange-600 font-semibold text-white px-10 py-3 rounded-lg transition"
          >
            {loading ? 'Generating...' : 'Generate Kundali'}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="mt-10 bg-white shadow-lg rounded-2xl p-6 md:p-10">

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-orange-500">{result.name}'s Kundali</h2>
              <p className="text-gray-500 mt-1">{result.dob} | {result.time} | {result.place}</p>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Zodiac Sign', value: result.zodiacSign },
                { label: 'Rising Sign', value: result.risingSign },
                { label: 'Moon Sign', value: result.moonSign },
                { label: 'Nakshatra', value: result.nakshatra },
              ].map((item) => (
                <div key={item.label} className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-gray-500 text-sm">{item.label}</p>
                  <p className="text-orange-500 font-bold text-lg mt-1">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Planets Table */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">🪐 Planetary Positions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border rounded-xl overflow-hidden">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-3">Planet</th>
                    <th className="px-4 py-3">Sign</th>
                    <th className="px-4 py-3">House</th>
                    <th className="px-4 py-3">Degree</th>
                  </tr>
                </thead>
                <tbody>
                  {result.planets.map((planet, index) => (
                    <tr key={planet.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold">{planet.name}</td>
                      <td className="px-4 py-3">{planet.sign}</td>
                      <td className="px-4 py-3">{planet.house}</td>
                      <td className="px-4 py-3">{planet.degree}°</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Predictions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {result.predictions.map((pred) => (
                <div key={pred.area} className="bg-orange-50 rounded-xl p-5">
                  <h4 className="font-bold text-orange-500 mb-2">{pred.area}</h4>
                  <p className="text-gray-600 text-sm">{pred.prediction}</p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

export default Kundali