
const express = require('express');
const { fetchExternalData } = require('../controllers/apiController');
const router = express.Router();

router.get('/fetch-data', fetchExternalData);

module.exports = router;
