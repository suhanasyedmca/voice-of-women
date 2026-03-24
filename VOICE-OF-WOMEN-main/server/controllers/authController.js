import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { DemoDB } from '../utils/demoDB.js';

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, gender, age, role, location } = req.body;

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      if (DemoDB.findUserByEmail(email)) {
        return res.status(400).json({ message: 'User already exists (Demo Mode)' });
      }
      
      const newUser = {
        _id: Math.random().toString(36).substring(7),
        name, email, phone, gender, age, role, location,
        password: await bcrypt.hash(password, 10),
        isAadhaarVerified: false
      };
      DemoDB.saveUser(newUser);
      
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        isAadhaarVerified: false,
        token: generateToken(newUser._id, newUser.role)
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
      age,
      role,
      location,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAadhaarVerified: user.isAadhaarVerified,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const user = DemoDB.findUserByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isAadhaarVerified: user.isAadhaarVerified,
          token: generateToken(user._id, user.role),
        });
      }
      return res.status(401).json({ message: 'Invalid credentials (Demo Mode)' });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        isAadhaarVerified: user.isAadhaarVerified,
        token: generateToken(user._id, user.role),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = crypto.randomInt(100000, 999999).toString();

    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const user = DemoDB.findUserByEmail(email);
      if (!user) return res.status(400).json({ message: 'User not found (Demo Mode)' });
      
      user.resetOTP = otp;
      user.otpExpiry = Date.now() + 10 * 60 * 1000;
      DemoDB.updateUser(user._id, { resetOTP: otp, otpExpiry: user.otpExpiry });
      
      console.log(`--- [DEMO MODE] Password Reset OTP ---`);
      console.log(`Email: ${email}`);
      console.log(`OTP: ${otp}`);
      console.log(`--------------------------------------`);
      
      return res.json({ message: 'OTP sent to email (Check console in Demo Mode)' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    user.resetOTP = otp;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    // Use Ethereal for testing or real SMTP if configured
    let transporter;
    if (process.env.SMTP_USER) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Fallback to Ethereal for testing
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: { user: testAccount.user, pass: testAccount.pass },
      });
      console.log('--- OTP Simulation ---');
      console.log(`Email to: ${email}`);
      console.log(`OTP: ${otp}`);
      console.log(`Preview URL: ${nodemailer.getTestMessageUrl({ messageId: 'xyz' })}`);
      console.log('----------------------');
    }

    await transporter.sendMail({
      to: email,
      subject: 'VOW Password Reset OTP',
      text: `Your OTP for password reset is ${otp}. It expires in 10 minutes.`,
    });

    res.json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending OTP', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  try {
    // --- DEMO MODE SUPPORT ---
    if (global.isMockDB) {
      const user = DemoDB.findUserByEmail(email);
      if (!user || user.resetOTP !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ message: 'Invalid or expired OTP (Demo Mode)' });
      }
      
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      DemoDB.updateUser(user._id, { password: hashedPassword, resetOTP: undefined, otpExpiry: undefined });
      
      return res.json({ message: 'Password reset successful (Demo Mode)' });
    }

    const user = await User.findOne({ email });

    if (!user || user.resetOTP !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetOTP = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error resetting password', error: error.message });
  }
};
