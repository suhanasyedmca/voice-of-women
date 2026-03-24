import mongoose from 'mongoose';

const trackerLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  type: {
    type: String,
    enum: ['water', 'steps', 'mood', 'sleep', 'period', 'nutrition'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
    // Example for water: { glasses: 5 }
    // Example for mood: { rating: 4, note: "Felt good" }
    // Example for period: { status: "start", symptoms: ["cramps"] }
  }
}, { timestamps: true });

const TrackerLog = mongoose.model('TrackerLog', trackerLogSchema);
export default TrackerLog;
