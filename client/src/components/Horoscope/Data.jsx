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
                            className="w-16 h-16 rounded-full"
                        />
                        <div>
                            <h1 className="text-xl font-bold">Aries</h1>
                            <p className="text-gray-500">27 March 2026</p>
                        </div>
                    </div>

                    {/* Dropdown */}
                    <div className="mt-4">
                        <select className="p-2 border rounded-lg">
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>


                {/* Lucky Info */}
                <div className="mt-4 flex gap-6 justify-between bg-pink-50 p-4 rounded-xl  shadow">
                    <div className='flex gap-2'>
                        <p className="text-gray-500">शुभ रंग:</p>
                        <h2 className="font-semibold">Red</h2>
                    </div>
                    <div className='flex gap-4'>
                        <p className="text-gray-500">शुभ अंक:</p>
                        <h2 className="font-semibold">9</h2>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-1 gap-4">
                    {stats.map((item, index) => (
                        <div key={index} className="bg-white p-4 w-full flex flex-col rounded-xl shadow">
                            <h1 className="font-bold text-lg">
                                {item.title} :- {item.percent}
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </>

    )
}

export default Data