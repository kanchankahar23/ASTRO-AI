import bgImg from '/ASTRO-AI/client/src/assets/astrology-banner.jpg'

const HeroSection = () => {
  return (
    <section
    style={{backgroundImage:`url(${bgImg})`}}
    className=" bg-cover bg-center bg-no-repeat text-white min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16">

        {/* Left Content */}
        <div className=''>
          <p className="font-semibold text-3xl mb-2">
            Trust Our Astrologer
          </p>
          <h1 className="text-3xl md:text-5xl whitespace-nowrap  font-bold leading-tight mb-4">
            Start Control Your <br /> Professional Destiny
          </h1>
          <p className="text-gray-50 text-lg mb-8">
            Don't believe in luck. Get the right guidance according to your sign.
            Your sign says a lot about you.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a href="#services" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition">
              Explore Services
            </a>
            <a href="#astrologers" className="border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white px-6 py-3 rounded-full font-semibold transition">
              Meet Astrologers
            </a>
          </div>

          <div className="flex gap-8 mt-12 flex-wrap">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-400">500+</h3>
              <p className="text-gray-400 text-sm">Trusted Clients</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-400">30+</h3>
              <p className="text-gray-400 text-sm">Years Experience</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-orange-400">10+</h3>
              <p className="text-gray-400 text-sm">Qualified Astrologers</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src=""
            alt="Astrologer"
            className="w-80 md:w-96 rounded-full shadow-2xl border-4 border-orange-400"
          />
        </div>

      </div>
    </section>
  )
}

export default HeroSection