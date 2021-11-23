const { getConnection } = require('../shared/connection');
const { isCorrectPassword } = require('../shared/auth/auth.functions');


const verifyUser = (req, res) => {
    const { userId, password } = req.body;

    const databaseConnection = getConnection();
    databaseConnection.collection('users').findOne({ userId }, (error, user) => {
        if(error) {
            res.status(400).send('⛔️ An error occurred verifying the user ... \n[Error]: ' + error);  
        } else if (!user) {
            res.status(401).send('⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect userId');
        } 
        else {
            let response = isCorrectPassword(password, user.password);
            if(!response) {
                res.status(401).send('⚠️ There are no users with the specified specifications ... \n[Error]: Incorrect userId or password');
            } else {
                res.status(200).send('Welcome to karaoke!');
            }
        }
    })
};

const getSingleUser = (req, res) => {
    let userId = req.params.userId;
    const databaseConnection = getConnection();
    databaseConnection.collection("users").findOne({"userId": userId}, { projection: { _id:0 } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
            } else {
                if(data === null){
                    res.status(404).send('⚠️ There are no users with the specified specifications ...');
                } else{
                    res.status(200).send(data);
                }
            }
      });
};


const updateFavorites = (req, res) => {
    let userId = req.params.userId;
    var newData = { $set: req.body };

    const databaseConnection = getConnection();
    databaseConnection.collection('users').updateOne({'userId': userId}, newData, 
        function(error) {
            if(error) {
                res.status(400).send('⛔️ An error occurred updating favorites ... \n[Error]: ' + error);  
            } else {
                res.status(200).send('☑️ The favorite list was modified successfully ... ');
            }
    });
};

const updatePlayedSongs = (req, res) => {
    let userId = req.params.userId;
    let  { currentSong } = req.body; 
    let songId = currentSong[0] + "&" + currentSong[1];
    let songName = currentSong[0];
    let songAuthor = currentSong[1];
    let songAlbum = currentSong[2];
    let songCover = currentSong[3];
    let score = currentSong[4];

    const databaseConnection = getConnection();
    databaseConnection.collection("users").findOne({"userId": userId}, { projection: { _id:0 } }, 
        function(error, data) {
            if (error) {
                res.status(400).send('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
            } else { 
                var songs = [];
                for(var k in data.playedSongs){
                    songs.push(data.playedSongs[k][0]);
                }
                if(songs.includes(songName)){
                    for(var k in data.playedSongs){
                        if(data.playedSongs[k][0] === songName){
                            var timesPlayed = data.playedSongs[k][4] + 1;
                            data.playedSongs[k][4] = timesPlayed;

                            if(score > data.playedSongs[k][5]){
                                data.playedSongs[k][5] = score;
                            }

                            var updatedData = { $set: { playedSongs: data.playedSongs } };

                            databaseConnection.collection('users').updateOne({'userId': userId},  updatedData, 
                            function(error) {
                                if(error) {
                                    res.status(400).send('⛔️ An error occurred updating played ... \n[Error]: ' + error);  
                                } else {
                                     console.log('☑️ [1] My list modified successfully  ... ');
                                }
                            });

                        }
                    }

                } else {
                    var oldData = data.playedSongs;
                    var newData = [songName, songAuthor, songAlbum, songCover, 1, score];
                    oldData.push(newData);
                    var finalData = { $set: { playedSongs: oldData } };

                    
                    databaseConnection.collection('users').updateOne({'userId': userId},  finalData, 
                    function(error) {
                        if(error) {
                            res.status(400).send('⛔️ An error occurred updating played ... \n[Error]: ' + error);  
                        } else {
                             console.log('☑️ [1] My list modified successfully ... ');
                        }
                    });
                    
                }

                databaseConnection.collection("Songs").findOne({"id": songId}, { projection: { _id:0 } }, 
                function(error, data) {
                    if (error) {
                        res.status(400).send('⛔️ An error occurred getting single song ... \n[Error]: ' + error);
                    } else {
                        var setNewPlayed = data.played + 1;
                        var played = { $set: { played: setNewPlayed } };

                        databaseConnection.collection('Songs').updateOne({'id': songId},  played, 
                        function(error) {
                            if(error) {
                                res.status(400).send('⛔️ An error occurred updating song ... \n[Error]: ' + error);  
                            } else {
                                res.status(200).send('☑️ The song was modified successfully ... ');
                            }
                        });
                    }
              });

            }
      });
};



module.exports = { verifyUser, getSingleUser,updateFavorites, updatePlayedSongs }