const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { scoreCalculator, findUserWords } = require('../components/stats.component');

var jsonParser = bodyParser.json();

router.post('/getScore', jsonParser, scoreCalculator);
router.get('/getDifficultWords', jsonParser, findUserWords);

module.exports = router;