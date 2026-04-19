import React from 'react'
import design from '/ASTRO-AI/client/src/assets/design.png'
const Contact = () => {
  return (
    <div className="bg-[#f8f7f4] min-h-screen py-16 px-4">

      {/* Section Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#1e2d5a] mb-3">
          Contact <span className="text-[#e8873a]">Us</span>
        </h1>
       <div className='flex justify-center items-center'>
        <img className='mt-2' src={design} alt="" />
       </div>
        <p className="text-[#6b7494] text-sm mt-2 max-w-md mx-auto leading-relaxed">
          A smart astrology platform providing accurate and personalized guidance using AI.
        </p>
      </div>


      {/* Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex flex-col md:flex-row">

          {/* Left Panel */}
          <div className="md:w-80 bg-gradient-to-br from-[#1e2d5a] to-[#162248] p-10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-14 -right-14 w-48 h-48 rounded-full bg-[#e8873a]/10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/5" />

            <div className="relative z-10">
              <h2 className="text-white text-xl font-bold mb-2">Get In Touch</h2>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Have something to say? We're here to help. Fill the form or reach out directly.
              </p>

              {/* Info Items */}
              {[
                { icon: '✉', label: 'Email', value: 'info@astroai.com' },
                { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
                { icon: '📍', label: 'Location', value: 'Mumbai, India' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3.5 border-b border-white/10 last:border-0">
                  <div className="w-10 h-10 rounded-xl bg-[#e8873a]/20 flex items-center justify-center flex-shrink-0 text-base">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-white text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              {/* Socials */}
              <div className="flex gap-2.5 mt-8">
                {['In', 'Li', 'Fb', 'Tw'].map((s, i) => (
                  <div key={i} className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 text-xs font-semibold hover:border-[#e8873a] hover:text-[#e8873a] cursor-pointer transition-all">
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="flex-1 p-10">
            <h3 className="text-xl font-bold text-[#1e2d5a] mb-6">Send a Message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[#1e2d5a] uppercase tracking-wide block mb-1.5">Full Name</label>
                <input type="text" placeholder="John Doe"
                  className="w-full border border-[#e2ddd7] rounded-xl px-4 py-3 text-sm text-[#1e2d5a] placeholder:text-[#a09d98] focus:outline-none focus:border-[#e8873a] focus:ring-2 focus:ring-[#e8873a]/10 transition-all" />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#1e2d5a] uppercase tracking-wide block mb-1.5">Email Address</label>
                <input type="email" placeholder="john@email.com"
                  className="w-full border border-[#e2ddd7] rounded-xl px-4 py-3 text-sm text-[#1e2d5a] placeholder:text-[#a09d98] focus:outline-none focus:border-[#e8873a] focus:ring-2 focus:ring-[#e8873a]/10 transition-all" />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-semibold text-[#1e2d5a] uppercase tracking-wide block mb-1.5">Subject</label>
              <input type="text" placeholder="How can we help?"
                className="w-full border border-[#e2ddd7] rounded-xl px-4 py-3 text-sm text-[#1e2d5a] placeholder:text-[#a09d98] focus:outline-none focus:border-[#e8873a] focus:ring-2 focus:ring-[#e8873a]/10 transition-all" />
            </div>

            <div className="mb-6">
              <label className="text-xs font-semibold text-[#1e2d5a] uppercase tracking-wide block mb-1.5">Your Message</label>
              <textarea rows={5} placeholder="Tell us what's on your mind..."
                className="w-full border border-[#e2ddd7] rounded-xl px-4 py-3 text-sm text-[#1e2d5a] placeholder:text-[#a09d98] resize-none focus:outline-none focus:border-[#e8873a] focus:ring-2 focus:ring-[#e8873a]/10 transition-all" />
            </div>

            <button className="w-full bg-gradient-to-r from-[#e8873a] to-[#d4702a] hover:from-[#f09245] hover:to-[#e8873a] text-white font-semibold py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(232,135,58,0.35)]">
              Send Message →
            </button>
            <p className="text-center text-[#a09d98] text-xs mt-3">🔮 We typically respond within 24 hours</p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact