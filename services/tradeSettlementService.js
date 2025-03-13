const Trade = require('../models/Trade');
const User = require('../models/User');

const settleTrades = async (eventId, outcome) => {
  const trades = await Trade.find({ eventId, status: 'pending' });
  for (const trade of trades) {
    const user = await User.findById(trade.userId);
    if (trade.prediction === outcome) {
      user.balance += trade.amount * trade.odds;
      trade.status = 'won';
    } else {
      trade.status = 'lost';
    }
    await trade.save();
    await user.save();
  }
};

module.exports = settleTrades;
