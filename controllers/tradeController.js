const Trade = require('../models/Trade');
exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('userId eventId');
    res.json(trades);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.placeTrade = async (req, res) => {
  try {
    const trade = new Trade(req.body);
    await trade.save();
    res.status(201).json(trade);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
