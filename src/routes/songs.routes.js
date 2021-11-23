const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const { getSingleSong, createSong, updateSong, removeSong, getAllSongs, songSearch} = require('../components/songs.component');

var jsonParser = bodyParser.json();

router.get('/all', getAllSongs);

router.get('/:songId', getSingleSong);

router.post('/', jsonParser, createSong);

router.put('/:songId', jsonParser, updateSong);

router.delete('/:songId', removeSong);

router.get('/search/:data', songSearch);

module.exports = router;