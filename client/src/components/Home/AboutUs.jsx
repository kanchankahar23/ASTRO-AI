import React from 'react'
import design from '/ASTRO-AI/client/src/assets/design.png'
import aboutImg from '/ASTRO-AI/client/src/assets/about-img.webp'
const AboutUs = () => {
  return (
    <section className=" text-[#0a0a5f] py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14 flex justify-center items-center flex-col">
          <h2 className="text-3xl font-bold mb-3">About Astro<span className='text-orange-500'>AI</span></h2>

          {/* Decorative divider — golden ornament line */}
          <div className="flex items-center flex-col gap-2 my-3">
            <img src={design} alt="" />
          </div>

          <p className="text-gray-600 text-base mt-2 max-w-xl leading-relaxed">
            AstroBuddy provides its user a chance to meet Experienced Astrologers.
            <br />
            The one who actually reads user's Kundali.
          </p>
        </div>

        {/* Main Content — image left, text right */}
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Left — Astrologer Image */}
          <div className="w-full md:w-[500px]">
            <img
              src={aboutImg}
              alt="Experienced Astrologer"
              className="w-full h-[500px] max-w-md mx-auto rounded-lg object-cover shadow-md"
              style={{ aspectRatio: '4/5', objectPosition: 'top' }}
            />
          </div>

          {/* Right — Text Content */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">

            {/* Heading */}
            <h3 className="text-3xl font-bold text-[#0a0a5f] leading-snug">
              We Believe On Understanding Problem <br /> Rather Than Solutions
            </h3>

            {/* Yellow left-border quote block */}
            <div className="border-l-4 border-amber-600 pl-5 text-gray-600 text-[19px] leading-relaxed">
              There can be many ways by which people's history can be told, understood
              and realized. But there is only one way to predict their future or to provide
              solutions to their problems.
            </div>

            {/* "That Is What Makes Us" card */}
            <div className="flex items-center gap-4 rounded-full px-5 py-4 w-fit mt-2">
              {/* Icon circle */}
              <div className="w-18 h-18 rounded-full bg-[#f3e8d0] flex items-center justify-center flex-shrink-0">
                <svg width="35" height="35" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="15" cy="15" r="14" stroke="#c8922a" strokeWidth="1.5" />
                  <circle cx="15" cy="10" r="4" stroke="#c8922a" strokeWidth="1.5" />
                  <path d="M7 24c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#c8922a" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M19 13c2.5 0 5 2 5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                  <path d="M11 13c-2.5 0-5 2-5 5" stroke="#c8922a" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="2 2" />
                </svg>
              </div>
              <div>
                <p className="text-gray-500 text-sm">That Is What Makes Us</p>
                <p className="text-[#0a0a5f] text-xl font-bold">Astro Buddy</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}

export default AboutUs