const express = require('express');
const { placeTrade, getTrades } = require('../controllers/tradeController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
router.get('/', authMiddleware, getTrades);
router.post('/', authMiddleware, placeTrade);
module.exports = router;