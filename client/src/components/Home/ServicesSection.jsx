const services = [
  {
    icon: '🌟',
    title: 'Astrology',
    desc: 'Know effect of Zodiac signs, Planetary influences on your life.'
  },
  {
    icon: '🔢',
    title: 'Numerology',
    desc: 'Get life path insights with Number symbolism and patterns.'
  },
  {
    icon: '✋',
    title: 'Palmistry',
    desc: 'Read your future through the lines and mounts of your palm.'
  },
  {
    icon: '✍️',
    title: 'Signature Reading',
    desc: 'Signature Analysis Personality Test for deep insights.'
  },
]

const ServicesSection = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-2">Our Services</h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto mb-4"></div>
          <p className="text-gray-400 max-w-xl mx-auto">
            Harmony crafts spaces aligning Vastu, Astrology, and Numerology,
            fostering positive energy and well-being in every design.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-gray-800 hover:bg-orange-500 transition rounded-xl p-6 text-center group cursor-pointer"
            >
              <div className="text-5xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-400 group-hover:text-white text-sm">{service.desc}</p>
              <button className="mt-4 text-orange-400 group-hover:text-white font-semibold text-sm underline">
                Read More →
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection