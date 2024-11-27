const Log = require('../models/Log');

const logger = async (req, res, next) => {
  const logEntry = new Log({
    url: req.url,
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  try {
    await logEntry.save();
    console.log(`Log saved: ${req.method} ${req.url} at ${new Date()}`);
  } catch (err) {
    console.error('Error saving log:', err);
  }

  next();
};

module.exports = logger;
