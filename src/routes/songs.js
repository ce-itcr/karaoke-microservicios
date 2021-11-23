const express = require('express');
const parser = require('body-parser');
const router = express.Router();
const { getSong, postSong, updateSongInfo, deleteSelectedSong,
        getAllSongs, songSearch} = require('../components/songsComponent');


//Listo        http://localhost:5000/karaoke/getAllSongs
router.get('/getAllSongs', getAllSongs);

//Listo        http://localhost:5000/karaoke/getSong/{"songName":"Casin","songAuthor":"glue70"}
router.get('/getSong/:filter', getSong);

//Listo        http://localhost:5000/karaoke/createSong/{"songName":"La Cucaracha","songAuthor":"Yo","songAlmbum":"Nose","songLyrics":"La cucaracha ya no puede caminar","creationAuthor":"Agustin","creationDate":"Hoy","modificationAuthor":"Angelito","modificationDate":"hoy"}
router.post('/createSong', postSong);

//Listo        http://localhost:5000/karaoke/updateSong/{ "songName":"Casin", "songAuthor":"glue70"}/{"modificationAuthor":"Momboñombo Moñagallo"}
router.put('/updateSong/:filter', updateSongInfo);

//Listo        http://localhost:5000/karaoke/deleteSong/{"songName":"Mr Blue Sky", "songAuthor":"ELO"}
router.delete('/deleteSong/:filter', deleteSelectedSong);

//
router.get('/search/:data', songSearch);

module.exports = router;