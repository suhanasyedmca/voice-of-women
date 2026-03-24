import TrackerLog from '../models/TrackerLog.js';

// @desc    Get user's trackers for a specific date (defaults to today)
// @route   GET /api/trackers
// @access  Private
export const getTrackers = async (req, res) => {
  try {
    const dateQuery = req.query.date ? new Date(req.query.date) : new Date();
    // Normalize to start and end of the day
    dateQuery.setHours(0, 0, 0, 0);
    const endOfDay = new Date(dateQuery);
    endOfDay.setHours(23, 59, 59, 999);

    const logs = await TrackerLog.find({
      user: req.user._id,
      date: { $gte: dateQuery, $lt: endOfDay }
    });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trackers', error: error.message });
  }
};

// @desc    Upsert a tracker log (update if type exists today, otherwise create)
// @route   POST /api/trackers
// @access  Private
export const upsertTracker = async (req, res) => {
  try {
    const { type, data, date } = req.body;
    
    // Default to today if no date provided
    const logDate = date ? new Date(date) : new Date();
    logDate.setHours(0, 0, 0, 0);
    const endOfDay = new Date(logDate);
    endOfDay.setHours(23, 59, 59, 999);

    let tracker = await TrackerLog.findOne({
      user: req.user._id,
      type,
      date: { $gte: logDate, $lt: endOfDay }
    });

    if (tracker) {
      // Update existing
      tracker.data = { ...tracker.data, ...data };
      await tracker.save();
    } else {
      // Create new
      tracker = await TrackerLog.create({
        user: req.user._id,
        type,
        data,
        date: logDate
      });
    }

    res.status(200).json(tracker);
  } catch (error) {
    res.status(500).json({ message: 'Error saving tracker', error: error.message });
  }
};
