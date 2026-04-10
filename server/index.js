const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectDB = require('./config/db')
const horoscopeRoutes = require('./routes/horoscopeRoutes')
const kundaliRoutes = require('./routes/kundaliRoutes')
const kundaliMatchingRoutes = require('./routes/kundaliMatchingRoutes')
const aiRoutes = require('./routes/aiRoutes')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/horoscope', horoscopeRoutes)
app.use('/api/kundali', kundaliRoutes)
app.use('/api/kundali-matching', kundaliMatchingRoutes)
app.use('/api/ai', aiRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'AstroBuddy API is running!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})