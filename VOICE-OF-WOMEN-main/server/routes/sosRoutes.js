import express from 'express';
import { triggerSOS, getActiveAlerts } from '../controllers/sosController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/trigger', protect, triggerSOS);
router.get('/active', protect, getActiveAlerts); // admin/control room Route

export default router;
