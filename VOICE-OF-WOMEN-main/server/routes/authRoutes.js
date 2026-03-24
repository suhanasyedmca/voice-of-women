import express from 'express';
import { registerUser, loginUser, getMe, forgotPassword, resetPassword } from '../controllers/authController.js';
import { verifyAadhaar, sendAadhaarOTP, verifyAadhaarOTP } from '../controllers/aadhaarController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Aadhaar specific auth routes
router.post('/verify-aadhaar', protect, verifyAadhaar);
router.post('/send-otp', protect, sendAadhaarOTP);
router.post('/verify-otp', protect, verifyAadhaarOTP);

export default router;
