const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { scoreCalculator } = require('../components/stats.component');

var jsonParser = bodyParser.json();

router.post('/getScore', jsonParser, scoreCalculator);

module.exports = router;