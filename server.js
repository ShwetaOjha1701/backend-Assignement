
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/authRoutes');
const eventRoutes = require('./routes/eventRoutes');
const tradeRoutes = require('./routes/tradeRoutes');
const { logger } = require('./utils/logger');
require('dotenv').config();

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => logger.info('MongoDB Connected')).catch(err => logger.error(err));

// WebSocket Setup
io.on('connection', (socket) => {
  logger.info('New WebSocket connection');

  // Listen for trade events and broadcast updates
  socket.on('newTrade', (trade) => {
    io.emit('tradeUpdate', trade);
  });

  // Listen for event updates and broadcast
  socket.on('eventUpdate', (event) => {
    io.emit('eventUpdate', event);
  });

  socket.on('disconnect', () => logger.info('WebSocket Disconnected'));
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/trades', tradeRoutes);
// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Trading Backend System');
});

// Start Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  logger.info(`🚀 Server running on http://localhost:${PORT}`);
});