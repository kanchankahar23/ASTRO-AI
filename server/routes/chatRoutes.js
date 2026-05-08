import express from 'express';
import { chatWithKaira } from '../controllers/chatController.js';

const router = express.Router();

// ✅ Test route — open in browser
router.get('/', (req, res) => {
  res.json({ message: '🔮 Kaira AI is ready!' });
});

// ✅ Actual chat route — called from frontend
router.post('/api/ai/chat', chatWithKaira);

export default router;