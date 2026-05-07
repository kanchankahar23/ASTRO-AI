// routes/kundaliMatchingRoutes.js
import express from 'express';
import { matchKundali } from '../controllers/kundaliMatchingController.js';

const router = express.Router();

router.post('/', matchKundali);

export default router;