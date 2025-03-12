const { Schema, model } = require('mongoose');
const EventSchema = new Schema({
    name: { type: String, required: true },
    odds: { type: Number, required: true },
    status: { type: String, default: 'open' },
  });
  module.exports = model('Event', EventSchema);