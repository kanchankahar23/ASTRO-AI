import React, { useState } from 'react'
import Banner from '../components/Horoscope/Banner'
import Data from '../components/Horoscope/Data'

const Horoscope = () => {
  const [selectedSign, setSelectedSign] = useState(null);

  return (
    <>
      <Banner selectedSign={selectedSign} setSelectedSign={setSelectedSign} />
      {selectedSign && <Data selectedSign={selectedSign} />}
    </>
  )
}

export default Horoscope