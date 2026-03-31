import React, { useState } from 'react'
import matching from '/ASTRO-AI/client/src/assets/Kundali_Matching.png'

const KundaliMatching = () => {

  const [male, setMale] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
  });

  const [female, setFemale] = useState({
    name: "",
    dob: "",
    time: "",
    place: "",
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "male") {
      setMale(prev => ({ ...prev, [name]: value }));
    } else {
      setFemale(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!male.name || !female.name) {
      alert("Please fill all fields");
      return;
    }

    console.log("Male:", male);
    console.log("Female:", female);
  };

  return (
    <>
      {/* 🔹 Hero Section */}
      <div className="relative h-72 md:h-80 flex items-center justify-center">

        <img
          src={matching}
          alt="Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold">
            Kundali <span className="text-orange-400">Matching</span>
          </h1>
          <p className="mt-3 text-gray-200">
            Discover compatibility with AI-powered astrology
          </p>
        </div>
      </div>

      {/* 🔹 Form Section */}
      <div className=" py-12 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl p-8">

          <h1 className="text-3xl font-bold mb-10 text-[#0a0a5f] text-center">
            Match Your Kundali
          </h1>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-10"
          >

            {/* Male Section */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm ">
              <h2 className="font-semibold text-2xl mb-6 text-[#0a0a5f]">
                👨 Male Details
              </h2>

              {["name", "dob", "time", "place"].map((field) => (
                <div key={field} className="mb-4 flex flex-col">
                  <label className="text-[17px] font-medium capitalize text-[#0a0a5f]">
                    {field}
                  </label>
                  <input
                    type={
                      field === "dob" ? "date" :
                        field === "time" ? "time" : "text"
                    }
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 p-3 rounded-sm mt-1 focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    value={male[field]}
                    onChange={(e) => handleChange(e, "male")}
                  />
                </div>
              ))}
            </div>

            {/* Female Section */}
            {/* Female Section */}
            <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-2xl mb-6 text-[#0a0a5f]">
                👩 Female Details
              </h2>

              {["name", "dob", "time", "place"].map((field) => (
                <div key={field} className="mb-4 flex flex-col">
                  <label className="text-[17px] font-medium capitalize text-[#0a0a5f]">
                    {field}
                  </label>
                  <input
                    type={
                      field === "dob" ? "date" :
                        field === "time" ? "time" : "text"
                    }
                    name={field}
                    placeholder={`Enter ${field}`}
                    className="border border-gray-300 p-3 rounded-sm mt-1 focus:ring-1 focus:ring-orange-400 focus:outline-none"
                    value={female[field]}
                    onChange={(e) => handleChange(e, "female")}
                  />
                </div>
              ))}
            </div>

            {/* Button */}
            <div className="col-span-2 text-center mt-6">
              <button className="bg-orange-500 text-white px-10 py-3 rounded-md text-lg font-medium shadow-md hover:scale-105 transition duration-300">
               Match Kundali
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default KundaliMatching