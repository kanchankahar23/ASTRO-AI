import { useState } from 'react'
import axios from 'axios'
import bannerImg from '../../assets/kundalimatching.jpg'

const KundaliMatching = () => {
  const [male, setMale] = useState({ name: '', dob: '', time: '', place: '' })
  const [female, setFemale] = useState({ name: '', dob: '', time: '', place: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e, type) => {
    const { name, value } = e.target
    if (type === 'male') setMale(prev => ({ ...prev, [name]: value }))
    else setFemale(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    if (!male.name || !male.dob || !female.name || !female.dob) {
      setError('Please fill all required fields!')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/kundali-matching', { male, female })
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const getColorClass = (color) => {
    if (color === 'green') return 'text-green-500'
    if (color === 'blue') return 'text-blue-500'
    if (color === 'yellow') return 'text-yellow-500'
    return 'text-red-500'
  }

  const getBgClass = (color) => {
    if (color === 'green') return 'bg-green-50 border-green-200'
    if (color === 'blue') return 'bg-blue-50 border-blue-200'
    if (color === 'yellow') return 'bg-yellow-50 border-yellow-200'
    return 'bg-red-50 border-red-200'
  }

  return (
    <>
      {/* Banner Section */}
      <div className="relative h-72 md:h-80 flex flex-col items-center justify-center overflow-hidden">
        <img
          src={bannerImg}
          alt="Kundali Matching Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <h1 className="relative z-10 text-2xl md:text-4xl font-semibold text-white text-center">
          Home / <span className="text-orange-400">Kundali Matching</span>
        </h1>
        <p className="relative z-10 mt-3 text-center text-gray-200 md:text-lg px-4 max-w-xl">
          Find your perfect match through ancient Vedic Ashtakoota Guna Milan.
        </p>
      </div>

      {/* Form Section */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-10 text-[#0a0a5f] text-center">
            Match Your Kundali
          </h1>

          {error && (
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-10">

            {/* Male Section */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-2xl mb-6 text-[#0a0a5f]">👨 Male Details</h2>
              {['name', 'dob', 'time', 'place'].map((field) => (
                <div key={field} className="mb-4 flex flex-col">
                  <label className="text-[17px] font-medium capitalize text-[#0a0a5f]">{field}</label>
                  <input
                    type={field === 'dob' ? 'date' : field === 'time' ? 'time' : 'text'}
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 p-3 rounded-sm mt-1 focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    value={male[field]}
                    onChange={(e) => handleChange(e, 'male')}
                  />
                </div>
              ))}
            </div>

            {/* Female Section */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-2xl mb-6 text-[#0a0a5f]">👩 Female Details</h2>
              {['name', 'dob', 'time', 'place'].map((field) => (
                <div key={field} className="mb-4 flex flex-col">
                  <label className="text-[17px] font-medium capitalize text-[#0a0a5f]">{field}</label>
                  <input
                    type={field === 'dob' ? 'date' : field === 'time' ? 'time' : 'text'}
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 p-3 rounded-sm mt-1 focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    value={female[field]}
                    onChange={(e) => handleChange(e, 'female')}
                  />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2 text-center mt-6">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-10 py-3 rounded-md text-lg font-medium shadow-md hover:scale-105 transition duration-300"
              >
                {loading ? 'Matching...' : 'Match Kundali'}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Result Section */}
      {result && (
        <div className="max-w-6xl mx-auto px-4 pb-12">
          <div className="bg-white shadow-xl rounded-2xl p-8">

            {/* Score */}
            <div className={`text-center p-8 rounded-2xl border-2 mb-8 ${getBgClass(result.compatibility.color)}`}>
              <h2 className="text-3xl font-bold text-[#0a0a5f] mb-2">
                {result.male.name} <span className="text-5xl">💓</span> {result.female.name}
              </h2>
              <div className={`text-6xl font-bold my-4 ${getColorClass(result.compatibility.color)}`}>
                {result.totalScore}/{result.maxScore}
              </div>
              <div className={`text-2xl font-semibold mb-3 ${getColorClass(result.compatibility.color)}`}>
                {result.compatibility.level} Match — {result.percentage}%
              </div>
              <p className="text-gray-600 max-w-xl mx-auto">
                {result.compatibility.message}
              </p>
            </div>

            {/* Zodiac Signs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Male Zodiac</p>
                <p className="text-blue-600 font-bold text-xl mt-1">{result.male.zodiac}</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4 text-center">
                <p className="text-gray-500 text-sm">Female Zodiac</p>
                <p className="text-pink-600 font-bold text-xl mt-1">{result.female.zodiac}</p>
              </div>
            </div>

            {/* Guna Table */}
            <h3 className="text-xl font-bold text-gray-800 mb-4">⭐ Guna Milan Details</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border rounded-xl overflow-hidden">
                <thead className="bg-orange-500 text-white">
                  <tr>
                    <th className="px-4 py-3">Guna</th>
                    <th className="px-4 py-3">Points Scored</th>
                    <th className="px-4 py-3">Max Points</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {result.gunaDetails.map((guna, index) => (
                    <tr key={guna.name} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-semibold">{guna.name}</td>
                      <td className="px-4 py-3">{guna.scored}</td>
                      <td className="px-4 py-3">{guna.maxPoints}</td>
                      <td className="px-4 py-3">
                        <span className={guna.scored >= guna.maxPoints / 2 ? 'text-green-500 font-semibold' : 'text-red-500 font-semibold'}>
                          {guna.scored >= guna.maxPoints / 2 ? '✅ Good' : '❌ Weak'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* ✅ Relationship Predictions */}
{result.predictions && (
  <div className="mt-8">
    <h3 className="text-xl font-bold text-gray-800 mb-4">🔮 Relationship Predictions</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {result.predictions.map((pred) => (
        <div key={pred.area} className={`rounded-xl p-5 border ${getBgClass(result.compatibility.color)}`}>
          <h4 className={`font-bold mb-2 text-base ${getColorClass(result.compatibility.color)}`}>
            {pred.area}
          </h4>
          <p className="text-gray-600 text-sm leading-relaxed">{pred.prediction}</p>
        </div>
      ))}
    </div>
  </div>
)}

{/* ✅ Summary */}
{result.summary && (
  <div className="mt-6 p-5 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl text-center">
    <p className="text-orange-700 font-medium">✨ {result.summary}</p>
  </div>
)}

{/* ✅ Reset Button */}
<div className="text-center mt-8">
  <button
    onClick={() => {
      setResult(null)
      setMale({ name: '', dob: '', time: '', place: '' })
      setFemale({ name: '', dob: '', time: '', place: '' })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }}
    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium px-8 py-3 rounded-lg transition"
  >
    🔄 Match Again
  </button>
</div>

          </div>
        </div>
      )}
    </>
  )
}

export default KundaliMatching