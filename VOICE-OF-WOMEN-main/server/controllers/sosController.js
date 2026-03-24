import SOSAlert from '../models/SOSAlert.js';
import User from '../models/User.js';

export const triggerSOS = async (req, res) => {
  try {
    const { pincode, zone } = req.body;
    
    // Create SOS Alert entry
    const newAlert = await SOSAlert.create({
      triggeredBy: req.user.id,
      pincode,
      zone: zone || 'Unknown Region',
      incidentCode: Math.random().toString(36).substring(2, 8).toUpperCase()
    });

    // In a real scenario, we'd query users based on distance from lat/long.
    // For VOW mock, we find users with the same or nearby pincode who are helpers
    const nearbyHelpers = await User.find({
      'location.pincode': pincode,
      helperStatus: true,
      _id: { $ne: req.user.id }
    }).select('_id name');

    // Attach to alert
    newAlert.helpersNotified = nearbyHelpers.map(h => h._id);
    await newAlert.save();

    res.status(201).json({
      message: 'SOS Alert triggered successfully',
      alert: newAlert,
      helpersNotifiedCount: nearbyHelpers.length
    });

  } catch (error) {
    res.status(500).json({ message: 'Error triggering SOS', error: error.message });
  }
};

export const getActiveAlerts = async (req, res) => {
  try {
    // For control room / admin
    const alerts = await SOSAlert.find({ status: 'active' })
      .populate('triggeredBy', 'name phone location')
      .sort('-createdAt');
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching alerts', error: error.message });
  }
};
