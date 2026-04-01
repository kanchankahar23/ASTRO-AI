import { Send } from 'lucide-react'
import React from 'react'
import kaira from '/ASTRO-AI/client/src/assets/ai-astro.jpg'
import kanchan from '/ASTRO-AI/client/src/assets/kanchan.jpeg'


const AI_Kaira = () => {
    return (
        <div className="flex h-[600px] gap-6 p-4 bg-gray-100">

            {/* 🔶 Sidebar */}
            <div className="w-64 bg-white shadow-md p-4 flex flex-col rounded-xl">
                <h1 className="text-3xl font-bold text-gray-800 text-center font-serif">
                    Kaira <span className="text-orange-500">AI</span>
                </h1>
                <button className="bg-orange-500 text-white py-2 mt-3 rounded-lg mb-4 hover:bg-orange-600 transition">
                    + New Chat
                </button>

                <h1 className="font-semibold text-sm text-gray-700 mb-2">Your Chat History</h1>
                <hr className="mb-3 bg-grey-100" />

                <div className="space-y-2 text-sm text-gray-700">
                    <p className="hover:bg-orange-100 hover:text-orange-700 p-2 rounded-md cursor-pointer">Chat 1</p>
                    <p className="hover:bg-orange-100 hover:text-orange-700 p-2 rounded-md cursor-pointer">Chat 2</p>
                    <p className="hover:bg-orange-100 hover:text-orange-700 p-2 rounded-md cursor-pointer">Chat 3</p>
                </div>
            </div>

            {/* 🔷 Chat Section */}
            <div className="flex-1 bg-white rounded-xl shadow-md flex flex-col justify-between p-6">

                {/* Chat messages */}
                <div className="space-y-6 overflow-y-auto flex-1">

                    {/* AI Message */}
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <img src={kaira} alt="AI" />
                        </div>
                        <div className="bg-gray-100 p-3 rounded-xl max-w-md">
                            <p className="text-gray-700 text-sm">
                                Hello Kanchan! How can I help you today?
                            </p>
                        </div>
                    </div>

                    {/* User Message */}
                    <div className="flex items-start gap-3 justify-end">
                        <div className="border border-orange-500 text-grey-800  bg-orange-50 p-3 rounded-xl max-w-md">
                            <p className="text-sm">
                                Tell me about my kundali Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                            <img src={kanchan} alt="User" />
                        </div>
                    </div>

                </div>

                {/* Input Box */}
                <div className="mt-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Type your Message"
                        className="flex-1 border rounded-full border-zinc-400  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button className="w-12 h-12 bg-orange-600 flex justify-center items-center text-white rounded-full ">
                        <Send />
                    </button>
                </div>
            </div>

            {/* 🔮 Kundali Card */}
            <div className="w-80 h-48 bg-white p-6 rounded-2xl shadow-lg">
                <h1 className="text-xl font-semibold text-center mb-4 text-orange-500">
                    Kanchan Kahar
                </h1>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Date</p>
                        <p className="font-medium">22-08-2003</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Time</p>
                        <p className="font-medium">10:30 PM</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Location</p>
                        <p className="font-medium">Bhopal</p>
                    </div>

                    <div>
                        <p className="text-gray-500">Sign</p>
                        <p className="font-medium text-orange-500">
                            Gemini ♊
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AI_Kaira