import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true }, // 'Remote', 'Mumbai', etc.
  type: { type: String, enum: ['Full-Time', 'Part-Time', 'Remote', 'Freelance'], required: true },
  salary: { type: String }, // e.g. "₹5,00,000 - ₹8,00,000"
  description: { type: String, required: true },
  womenFriendly: { type: Boolean, default: false }, // Women-friendly company badge
  applyLink: { type: String, required: true },
  industry: { type: String },
  savedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
export default Job;
