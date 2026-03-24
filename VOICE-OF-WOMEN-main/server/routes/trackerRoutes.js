import express from 'express';
import { getTrackers, upsertTracker } from '../controllers/trackerController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, getTrackers)
  .post(protect, upsertTracker);

export default router;
