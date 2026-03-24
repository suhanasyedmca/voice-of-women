import mongoose from 'mongoose';

const sosAlertSchema = new mongoose.Schema({
  triggeredBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  zone: { type: String },
  pincode: { type: String, required: true },
  radiusRequested: { type: Number, default: 3 }, // in km
  
  status: { 
    type: String, 
    enum: ['active', 'resolved', 'escalated', 'cancelled'],
    default: 'active'
  },
  
  helpersNotified: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  helpersAccepted: [{
    helperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    acceptedAt: { type: Date, default: Date.now },
    aadhaarDetailsShared: { type: Boolean, default: false }
  }],
  
  incidentCode: { type: String, required: true }, // Short code for victim/helper co-ordination
  
}, { timestamps: true });

const SOSAlert = mongoose.model('SOSAlert', sosAlertSchema);
export default SOSAlert;
