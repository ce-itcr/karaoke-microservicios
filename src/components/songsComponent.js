
const Joi = require('joi');
const {song} = require('../shared/database');

// get song file
const getSong = async (req, res) => {
    const filter = JSON.parse(req.params.filter);
    await song.find(filter, (error, data) =>
    {
    if(error){
        res.status(400).send('Error');
    }else{
        console.log(data);
        res.status(200).send(data);
    }}).clone().catch(function(err){ console.log(err)})
};


// update song file
const updateSongInfo = (req, res) => {
    const filter = JSON.parse(req.params.filter);
    var body = req.body;
    body["modificationDate"] = getFullDate();
    song.updateOne(filter, req.body, (error, data) => {
        if(error){
            res.status(400).send('Error al modificar la cancion');
        }else{
            res.status(200).send('Cancion modificada correctamente');
        }});
};


// post song file
const postSong = (req, res) => {
    song.create(req.body, function (err, info) {
        if (err){
            res.status(400).send('Error al crear cancion');
        }else{
            res.status(200).send('Cancion creada');
        }
    });
};


// delete song file
const deleteSelectedSong = (req, res) => {
    const filter = JSON.parse(req.params.filter);
    song.deleteOne(filter, (error, data) => {
        if(error){
            res.status(400).send('Error al eliminar cancion');
        }else{
            res.status(200).send('Cancion eliminada correctamente');
        }
    });
    
};

// get all the songs
const getAllSongs = (req, res) => {
    song.find({}, (error, data) => {
        if(error){
            res.status(400).send('Error al buscar canciones');
        }else{
            res.status(200).send(data);
        }
    });
};

// search for matches within lyrics, author, and album
const songSearch = (req, res) => {
    var params = JSON.parse(req.params.data);
    var name = params.category;
    var regex = params.filter;
    var query;
    switch (name) {
        case "songLRC":
            query = {"songLRC": new RegExp(regex) };
            break;
        case "songName":
            query = {"songName": new RegExp(regex) };
            break;
        case "songAuthor":
            query = {"songAuthor": new RegExp(regex) };
            break;
        case "songAlbum":
            query = {"songAlbum": new RegExp(regex) };
            break;
    }
    console.log(query);
    song.find(query, (error, data) => {
        if(error){
            res.status(400).send('Error al buscar canciones');
        }else{
            res.status(200).send(data);
        }
    });
};

function getFullDate(){
    const date = new Date();
    var day = date.getDate().toString();
    var month = (date.getMonth()+1).toString();
    var year = date.getFullYear().toString();
    return month + "/" + day + "/" + year;
};

module.exports = {
    getSong, postSong, updateSongInfo, deleteSelectedSong,
    getAllSongs, songSearch,
}