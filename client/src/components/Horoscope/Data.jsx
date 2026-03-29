import React from 'react'

const Data = () => {

    const stats = [
        { title: "शारीरिक गठन", percent: "40%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit.lorem sd sdsdc dsfsf ssfs sfsfcs ssfs sssfsfs sdfsfsf sfsfsf" },
        { title: "मानसिक स्थिति", percent: "60%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "धन स्थिति", percent: "75%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "प्रेम जीवन", percent: "50%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "स्वास्थ्य", percent: "65%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
        { title: "करियर", percent: "80%", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit." }
    ]

    return (

        <>
            <div className="md:p-10 sm:p-20 md:px-36 mt-20  min-h-screen flex flex-col">

                <div className='flex justify-between '>
                    <div className="flex items-center  gap-4  p-2  rounded-xl">
                        <img
                            src="https://media.istockphoto.com/id/1442485126/photo/white-cheeked-barbet-sitting-on-the-tree-trunk-with-beautiful-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=FXd7lxBVNnqND3GFvX7g_MxJh1lMGWLJ1YycIlBKi8Q="
                            alt="zodiac"
                            className="w-16 h-16 rounded-full border border-orange-400 border-4"
                        />
                        <div>
                            <h1 className="text-xl text-[#0a0a5f] font-bold">Aries</h1>
                            <p className="text-gray-500">27 March 2026</p>
                        </div>
                    </div>

                    {/* Dropdown */}
                    <div className="mt-4">
                        <select className="p-2 px-4 border border-[#0a0a5f] rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                {/* Lucky Info */}
                <div className="mt-4 flex gap-6 justify-between bg-pink-50 p-4 rounded-xl shadow">
                    <div className="flex gap-2 items-center">
                        <p className="text-gray-500 text-sm">शुभ रंग:</p>
                        <span className="font-semibold text-red-500">🔴 Red</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <p className="text-gray-500 text-sm">शुभ अंक:</p>
                        <span className="font-semibold text-[#0a0a5f]">✨ 9</span>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-6 grid grid-cols-1 gap-4">
                    {stats.map((item, index) => (
                        <div key={index} className="bg-white p-4 w-full flex flex-col rounded-xl shadow">

                            {/* Title + Percent */}
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-base text-gray-800">{item.title}</h3>
                                <span className="text-sm font-semibold text-[#0a0a5f]">{item.percent}%</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                                <div
                                    className="bg-[#0a0a5f] h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${item.percent}%` }}
                                />
                            </div>

                            {/* Description */}
                            <p className="text-gray-600 text-sm">{item.desc}</p>

                        </div>
                     ))}
                </div>

            </div>
        </>

    )
}

export default Data