const Trade = require('../models/Trade');
exports.getTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('userId eventId');
    const trade = await Trade.findById(tradeId);
    if (outcome === 'win') {
      trade.status = 'won';
    } else {
      trade.status = 'lost';
    }
    res.json(trades);
  } catch (err) {
    conosle.log(err,"error")
    res.status(500).json({ message: err.message });
  }
};

exports.placeTrade = async (req, res) => {
  try {
    const trade = new Trade({
      userId: req.user.id,
      eventId: req.body.eventId,
      amount: req.body.amount,
      status: 'pending',
    });
    await trade.save();
    res.status(201).json(trade);

    // Emit trade update via WebSocket
    req.app.get('io').emit('newTrade', trade);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
