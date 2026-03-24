import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  identifier: { 
    type: String, 
    required: true,
    index: true 
  }, // could be email or phone number
  otpCode: { 
    type: String, 
    required: true 
  },
  expiresAt: { 
    type: Date, 
    required: true, 
    index: { expires: '5m' } // document will automatically delete itself after 5 minutes
  }
}, { timestamps: true });

export default mongoose.model('OTP', otpSchema);
