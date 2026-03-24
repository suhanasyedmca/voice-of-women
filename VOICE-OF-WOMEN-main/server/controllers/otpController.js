import OTP from '../models/Otp.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';
import { DemoDB } from '../utils/demoDB.js';

// Setup Ethereal Test Account
let transporter;
nodemailer.createTestAccount().then(account => {
  transporter = nodemailer.createTransport({
    host: account.smtp.host,
    port: account.smtp.port,
    secure: account.smtp.secure,
    auth: {
      user: account.user,
      pass: account.pass
    }
  });
  console.log('📧 Ethereal Email Ready: Ready to simulate live email delivery.');
}).catch(err => console.error('Failed to create Ethereal account', err));

// @desc    Generate and send OTP (Simulated via console)
// @route   POST /api/otp/send
// @access  Public
export const sendOTP = async (req, res) => {
  try {
    const { identifier } = req.body; // Can be email or phone number

    if (!identifier) {
      return res.status(400).json({ message: 'Please provide an email or phone number' });
    }

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const otpCode = "123456"; // Standard demo OTP
      const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
      
      DemoDB.saveOTP(identifier, { otpCode, expiresAt });
      
      console.log(`--- [DEMO MODE] General OTP ---`);
      console.log(`To: ${identifier}`);
      console.log(`OTP: ${otpCode}`);
      console.log(`-------------------------------`);
      
      return res.status(200).json({ message: 'OTP sent (Demo Mode: 123456)' });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await OTP.create({
      identifier,
      otpCode,
      expiresAt
    });

    let previewUrl = null;

    // If identifier is an email, actually send via Ethereal
    if (identifier.includes('@') && transporter) {
      try {
        const info = await transporter.sendMail({
          from: '"VOW Security" <secure@voiceofwomen.in>',
          to: identifier,
          subject: 'Your VOW OTP Verification Code',
          text: `Your VOW Registration Code is: ${otpCode}. It expires in 5 minutes.`,
          html: `<div style="font-family: sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                   <h2 style="color: #C2185B;">VOW Platform Verification</h2>
                   <p>Your OTP code is:</p>
                   <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${otpCode}</h1>
                   <p style="color: #666; font-size: 12px;">This code will expire in 5 minutes. If you did not request this, please ignore this email.</p>
                 </div>`
        });
        previewUrl = nodemailer.getTestMessageUrl(info);
      } catch (err) {
        console.error("Failed to send ethereal email:", err);
      }
    }

    // SIMULATED SENDING (Console Fallback)
    console.log(`\n===========================================`);
    console.log(`🚀 Simulated OTP Delivery`);
    console.log(`To: ${identifier}`);
    console.log(`Your VOW Verification Code is: ${otpCode}`);
    if (previewUrl) console.log(`👉 VIEW LIVE EMAIL: ${previewUrl}`);
    console.log(`===========================================\n`);

    res.status(200).json({ 
      message: 'OTP sent successfully (Check server console)',
      previewUrl 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/otp/verify
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { identifier, code } = req.body;

    if (!identifier || !code) {
      return res.status(400).json({ message: 'Please provide identifier and code' });
    }

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const record = DemoDB.getOTP(identifier);
      if (record && record.otpCode === code && new Date(record.expiresAt) > Date.now()) {
        DemoDB.deleteOTP(identifier);
        return res.status(200).json({ message: 'OTP verified successfully (Demo Mode)' });
      }
      return res.status(400).json({ message: 'Invalid or expired OTP (Demo Mode)' });
    }

    // Find the most recent OTP for this identifier
    const record = await OTP.findOne({ identifier }).sort({ createdAt: -1 });

    if (!record) {
      return res.status(400).json({ message: 'No OTP found or it has expired' });
    }

    if (record.otpCode !== code) {
      return res.status(400).json({ message: 'Invalid OTP code' });
    }

    // Successfully verified. Delete the OTP record so it can't be reused.
    await OTP.deleteOne({ _id: record._id });

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
};
