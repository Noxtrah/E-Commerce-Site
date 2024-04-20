// routes/databaseRoutes.js
const express = require('express');
const router = express.Router();
const databaseController = require('../Controllers/databaseController');

router.get('/records', databaseController.getAllRecords);

module.exports = router;
