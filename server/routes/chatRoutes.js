// routes/chatRoutes.js
import express from 'express';
import { chatWithKaira } from '../controllers/chatController.js';

const router = express.Router();

// POST /api/ai/chat
router.post('/chat', chatWithKaira);

export default router;