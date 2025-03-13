const express = require('express');
const { placeTrade, getTrades } = require('../controllers/tradeController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
router.get('/getTrades', authMiddleware, getTrades);
router.post('/placeTrade', authMiddleware, placeTrade);
module.exports = router;