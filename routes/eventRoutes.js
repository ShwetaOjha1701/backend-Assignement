const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
router.get('/', getEvents);
router.post('/', authMiddleware, createEvent);
module.exports = router;