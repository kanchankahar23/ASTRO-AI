import design from '/ASTRO-AI/client/src/assets/design.png'
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
    <section className=" py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 flex flex-col justify-center items-center">
          <h2 className="text-3xl text-center text-[#0a0a5f] font-bold mb-2">Our Services</h2>
          <div>
  <img className='mt-3 text-center' src={design} alt="" />
          </div>
        
          <h4 className="text-[#0a0a5f] max-w-xl mx-auto mt-5">
            Harmony crafts spaces aligning Vastu, Astrology, and Numerology,
            fostering positive energy and well-being in every design.
          </h4>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-zinc-100 hover:bg-orange-500 transition rounded-xl p-6 text-center group cursor-pointer"
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