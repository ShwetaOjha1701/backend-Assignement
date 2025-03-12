
const { Schema, model } = require('mongoose');
const TradeSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'pending' },
  });
  module.exports = model('Trade', TradeSchema);