const { fetchDataFromExternalAPI } = require('../services/apiService');
const Event = require('../models/Event');
const Odds = require('../models/Odds');

exports.fetchExternalData = async (req, res) => {
  try {
    const externalData = await fetchDataFromExternalAPI();

    // Process and store the fetched data in MongoDB
    for (const eventData of externalData.events) {
      const event = new Event({
        name: eventData.name,
        date: eventData.date,
      });
      await event.save();

      for (const oddsData of eventData.odds) {
        const odds = new Odds({
          eventId: event._id,
          market: oddsData.market,
          value: oddsData.value,
        });
        await odds.save();
      }
    }

    res.status(200).json({ message: 'External data fetched and stored successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
