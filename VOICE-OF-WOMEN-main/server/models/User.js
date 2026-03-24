import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true, enum: ['Female', 'Male', 'Other'] },
  age: { type: Number, required: true },
  
  role: { type: String, default: 'user', enum: ['user', 'admin', 'Student', 'Professional', 'Homemaker', 'Volunteer', 'Other'] },
  
  resetOTP: { type: String },
  otpExpiry: { type: Date },
  
  location: {
    state: { type: String },
    city: { type: String },
    pincode: { type: String }
  },
  
  // Aadhaar specific fields
  aadhaarHash: { type: String },
  aadhaarLastFour: { type: String },
  isAadhaarVerified: { type: Boolean, default: false },
  
  // SOS & Help
  helperStatus: { type: Boolean, default: false }, // User opts-in to receive SOS alerts nearby
  
  // App specific
  avatarUrl: { type: String },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  
  trustedContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
