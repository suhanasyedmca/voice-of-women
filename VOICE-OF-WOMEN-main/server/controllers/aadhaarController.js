import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { DemoDB } from '../utils/demoDB.js';

// Mock store for OTPs (In real app, use Redis or DB with TTL)
const otpStore = new Map();

export const sendAadhaarOTP = async (req, res) => {
  try {
    const { aadhaar } = req.body;
    if (!aadhaar || aadhaar.length !== 12) {
      return res.status(400).json({ msg: 'Invalid Aadhaar Number' });
    }

    // Mock OTP logic
    const otp = "123456";
    DemoDB.saveOTP(aadhaar, { otp, expires: Date.now() + 5 * 60 * 1000 });

    console.log(`--- Aadhaar OTP Simulation ---`);
    console.log(`Aadhaar: ${aadhaar}`);
    console.log(`OTP: ${otp}`);
    console.log(`------------------------------`);

    res.json({ msg: 'OTP sent to registered mobile' });
  } catch (error) {
    res.status(500).json({ msg: 'Error sending OTP', error: error.message });
  }
};

export const verifyAadhaarOTP = async (req, res) => {
  try {
    const { aadhaar, otp } = req.body;
    const stored = DemoDB.getOTP(aadhaar);

    if (!stored || stored.otp !== otp || stored.expires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Clear OTP after success
    DemoDB.deleteOTP(aadhaar);

    // Update user profile
    const lastFour = aadhaar.slice(-4);
    const maskedAadhaar = `XXXX-XXXX-${lastFour}`;

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const user = DemoDB.findUserById(req.user.id);
      if (user) {
        DemoDB.updateUser(req.user.id, { isAadhaarVerified: true, aadhaarLastFour: maskedAadhaar });
        return res.json({ msg: 'Aadhaar verified successfully (Demo Mode)!', isAadhaarVerified: true });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const aadhaarHash = await bcrypt.hash(aadhaar, salt);

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.aadhaarHash = aadhaarHash;
    user.aadhaarLastFour = maskedAadhaar;
    user.isAadhaarVerified = true;
    await user.save();

    res.json({ msg: 'Aadhaar verified successfully!', isAadhaarVerified: true });
  } catch (error) {
    res.status(500).json({ msg: 'Verification failed', error: error.message });
  }
};

export const verifyAadhaar = async (req, res) => {
  // Legacy single-step verification (keeping for compatibility if needed)
  try {
    const { aadhaarNumber } = req.body;
    
    // Validate length
    if (!aadhaarNumber || aadhaarNumber.length !== 12) {
      return res.status(400).json({ message: 'Invalid Aadhaar Number. Must be 12 digits.' });
    }

    const lastFour = aadhaarNumber.slice(-4);
    const maskedAadhaar = `XXXX-XXXX-${lastFour}`;
    
    const salt = await bcrypt.genSalt(10);
    const aadhaarHash = await bcrypt.hash(aadhaarNumber, salt);

    // Update user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.aadhaarHash = aadhaarHash;
    user.aadhaarLastFour = maskedAadhaar;
    user.isAadhaarVerified = true;
    
    await user.save();

    res.status(200).json({ 
      message: 'Aadhaar verified successfully',
      isAadhaarVerified: true,
      aadhaarLastFour: maskedAadhaar
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error during Aadhaar verification', error: error.message });
  }
};
