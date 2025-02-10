const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['ERROR', 'STATUS'],
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    required: function () {
      return this.type === 'STATUS';
    },
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Event', EventSchema);
