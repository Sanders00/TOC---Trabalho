const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  headers: {
    type: Object,
    required: false,
  },
  body: {
    type: Object,
    required: false,
  },
});

module.exports = mongoose.model('Log', LogSchema);
