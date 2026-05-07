// routes/horoscopeRoutes.js
import express from 'express';
import { getHoroscope, getAllSigns } from '../controllers/horoscopeController.js';

const router = express.Router();

// GET /api/horoscope/all     → all 12 signs info
// GET /api/horoscope/aries   → daily horoscope for aries
// GET /api/horoscope/taurus  → daily horoscope for taurus

router.get('/all', getAllSigns);
router.get('/:sign', getHoroscope);

export default router;