import React from 'react'

const AI_Kaira = () => {
    return (
        <div className="flex h-screen bg-gray-100">

            {/* 🔶 Sidebar */}
            <div className="w-1/4 bg-white shadow-md p-4 flex flex-col">
                <button className="bg-orange-500 text-white py-2 rounded-lg mb-4 hover:bg-orange-600 transition">
                    + New Chat
                </button>

                <h1 className="font-semibold text-lg mb-2">Your Chat History</h1>
                <hr className="mb-3" />

                <div className="space-y-2 text-sm text-gray-600">
                    <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Chat 1</p>
                    <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Chat 2</p>
                    <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Chat 3</p>
                    <p className="hover:bg-gray-100 p-2 rounded cursor-pointer">Chat 4</p>
                </div>
            </div>

            {/* 🔷 Chat Section */}
            <div className="w-3/4 flex flex-col justify-between p-6">

                {/* Chat messages */}
                <div className="space-y-6 overflow-y-auto">

                    {/* 🤖 AI Message */}
                    <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                            <img src="/ai.png" alt="AI" />
                        </div>
                        <div className="bg-white p-3 rounded-xl shadow max-w-md">
                            <p className="text-gray-700 text-sm">
                                Hello Kanchan! How can I help you today?
                            </p>
                        </div>
                    </div>

                    {/* 👤 User Message */}
                    <div className="flex items-start gap-3 justify-end">
                        <div className="bg-orange-500 text-white p-3 rounded-xl shadow max-w-md">
                            <p className="text-sm">
                                Tell me about my kundali
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-300">
                            {/* <img src="/user.png" alt="User" /> */}
                        </div>
                    </div>

                    {/* 🔮 Kundali Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg">
                        <h1 className="text-xl font-semibold mb-4 text-orange-500">
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

                {/* 🔻 Input Box */}
                <div className="mt-6 flex gap-3">
                    <input
                        type="text"
                        placeholder="Ask something..."
                        className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />
                    <button className="bg-orange-500 text-white px-5 rounded-lg hover:bg-orange-600 transition">
                        Send
                    </button>
                </div>

            </div>
        </div>
    )
}

export default AI_Kaira