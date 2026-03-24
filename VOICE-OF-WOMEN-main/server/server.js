import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Basic Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// --- GLOBAL MOCK DB FLAG ---
global.isMockDB = false;

// Start Server Function
const startServer = () => {
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://127.0.0.1:${PORT}`);
    if (global.isMockDB) {
      console.log('📢 [DEMO MODE] Active: Using Persistent DemoDB (demo_db.json)');
    } else {
      console.log('✅ [PRODUCTION] Active: Connected to MongoDB');
    }
  });
};

// Database Connection with Fallback
mongoose
  .connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vow_platform', {
    serverSelectionTimeoutMS: 2000 
  })
  .then(() => {
    global.isMockDB = false;
    startServer();
  })
  .catch((err) => {
    console.error('⚠️ MongoDB connection failed. Switching to [Demo Mode]...');
    global.isMockDB = true;
    startServer();
  });

// Routes Configuration
import authRoutes from './routes/authRoutes.js';
import sosRoutes from './routes/sosRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import trackerRoutes from './routes/trackerRoutes.js';
import otpRoutes from './routes/otpRoutes.js';

app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/chat', chatbotRoutes);
app.use('/api/trackers', trackerRoutes);
app.use('/api/otp', otpRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'success', 
    message: global.isMockDB ? 'VOW Backend is running in [DEMO MODE]' : 'VOW Backend is running with MongoDB' 
  });
});

// Socket.io SOS Logic
io.on('connection', (socket) => {
  socket.on('trigger-sos', (data) => {
    socket.broadcast.emit('incoming-sos', data); 
  });
});
