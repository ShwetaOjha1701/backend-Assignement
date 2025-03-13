
const mongoose = require('mongoose');

const OddsSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  market: { type: String, required: true },
  value: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Odds', OddsSchema);
