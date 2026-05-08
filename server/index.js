// index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

// Import Routes
import chatRoutes from './routes/chatRoutes.js';
import horoscopeRoutes from './routes/horoscopeRoutes.js';
// import panchangRoutes from './routes/panchangRoutes.js';
import kundaliRoutes from './routes/kundaliRoutes.js';
import kundaliMatchingRoutes from './routes/kundaliMatchingRoutes.js';
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── Middlewares ────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173', // Your React app URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json()); // Parse incoming JSON body

// ─── Routes ─────────────────────────────────────
app.use('/api/AI_Kaira', chatRoutes);
app.use('/api/horoscope', horoscopeRoutes);
// app.use('/api/panchang', panchangRoutes);
app.use('/api/kundali', kundaliRoutes);
app.use('/api/kundali-matching', kundaliMatchingRoutes);

// ─── Health Check Route ──────────────────────────
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: '🔮 ASTRO-AI Backend is Running!',
  });
});

// ─── Error Handler (always last) ─────────────────
app.use(errorHandler);

// ─── Start Server ────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});