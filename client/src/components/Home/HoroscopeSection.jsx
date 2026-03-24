import design from '/ASTRO-AI/client/src/assets/design.png'
import aries from '/ASTRO-AI/client/src/assets/taurus.svg'
import Taurus from '/ASTRO-AI/client/src/assets/taurus.svg'
import gemini from '/ASTRO-AI/client/src/assets/Gemini1.svg'
import cancer from '/ASTRO-AI/client/src/assets/cancer.svg'
import leo from '/ASTRO-AI/client/src/assets/leo.svg'
import virgo from '/ASTRO-AI/client/src/assets/virgo.svg'
import libra from '/ASTRO-AI/client/src/assets/libra.svg'
import Scorpio from '/ASTRO-AI/client/src/assets/scorpio.svg'
import Sagittarius from '/ASTRO-AI/client/src/assets/sagittairus.svg'
import capricorn from '/ASTRO-AI/client/src/assets/capricorn.svg'
import aquarius from '/ASTRO-AI/client/src/assets/aquarius.svg'
import pisces from '/ASTRO-AI/client/src/assets/pisces.svg'


const signs = [
  { name: 'Aries', symbol: aries, date: 'Mar 21 - Apr 19' },
  { name: 'Taurus', symbol: Taurus, date: 'Apr 20 - May 20' },
  { name: 'Gemini', symbol: gemini, date: 'May 21 - Jun 20' },
  { name: 'Cancer', symbol: cancer, date: 'Jun 21 - Jul 22' },
  { name: 'Leo', symbol: leo, date: 'Jul 23 - Aug 22' },
  { name: 'Virgo', symbol: virgo, date: 'Aug 23 - Sep 22' },
  { name: 'Libra', symbol: libra, date: 'Sep 23 - Oct 22' },
  { name: 'Scorpio', symbol: Scorpio, date: 'Oct 23 - Nov 21' },
  { name: 'Sagittarius', symbol: Sagittarius, date: 'Nov 22 - Dec 21' },
  { name: 'Capricorn', symbol: capricorn, date: 'Dec 22 - Jan 19' },
  { name: 'Aquarius', symbol: aquarius, date: 'Jan 20 - Feb 18' },
  { name: 'Pisces', symbol: pisces, date: 'Feb 19 - Mar 20' },
]

const HoroscopeSection = () => {
  return (
    <section className="bg-[#f8f1e2] text-[#0a0a5f] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 flex justify-center items-center flex-col">
          <h2 className="text-3xl font-bold mb-2">Horoscope Forecasts</h2>
          <img className='mt-2' src={design} alt="" />
          <h4 className='mt-3'>It is a long established fact that a reader will be distracted by the readable content of a page <br /> when looking at its layout. The point of using Lorem Ipsum</h4>
        </div>

        {/* Signs Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {signs.map((sign) => (
            <div
              key={sign.name}
              className="bg-white border-2 border-transparent hover:border-orange-700 transition-all duration-300 ease-in-out cursor-pointer rounded-xl p-4 text-center flex justify-center items-center flex-col group"
            >
              <img className='w-15 h-15 rounded-full bg-[#ffff] p-3 ' src={sign.symbol} alt="" />
              <h3 className="font-semibold mt-3 text-sm">{sign.name}</h3>
              <h5 className="text-xs text-gray-600  mt-1">{sign.date}</h5>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default HoroscopeSection