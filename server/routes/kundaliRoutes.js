// routes/kundaliRoutes.js
import express from 'express';
import { generateKundali } from '../controllers/kundaliController.js';

const router = express.Router();

// POST /api/kundali
router.post('/', generateKundali);

export default router;