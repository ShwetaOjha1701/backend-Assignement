// const axios = require('axios');

// exports.fetchDataFromExternalAPI = async () => {
//   try {
//     const response = await axios.get('https://api.example.com/live-scores');
//     return response.data;
//   } catch (err) {
//     throw new Error('Error fetching data from external API');
//   }
// };

// fetchData.js
const axios = require('axios');
const Event = require('./models/Event');

exports.fetchDataFromExternalAPI = async () => {
  try {
    const response = await axios.get('https://api.statscore.com/v1/events', {
      headers: { 'Authorization': `Bearer ${process.env.API_KEY}` },
    });

    const events = response.data;

    for (const eventData of events) {
      const { id, name, date, odds } = eventData;

      await Event.findOneAndUpdate(
        { eventId: id },
        { name, date, odds },
        { upsert: true }
      );
    }

    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// module.exports = fetchAndStoreData;

