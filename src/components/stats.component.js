const { use } = require('chai');
const { co } = require('co');
const {getConnection} = require('../shared/connection');
const { getFullDate, jsonConcat } = require('../shared/utils/utils');

function scoreCalculator(req, res) {

    let userLyrics = req.body.text;
    let actualLyrics = req.body.lyrics;
    let currentUser = req.body.username;

    userLyrics = lineToList(userLyrics);
    actualLyrics = lineToList(extractLines(actualLyrics.trim()));

    var counter = 0;
    var lyricsWords = actualLyrics.length;
    var userWords = userLyrics.length;
    var successCounter = 0;
    var errorCounter = 0;
    var userData;
    var success = [];
    var errors = [];
    var response;

    while(counter < userWords){
        if(actualLyrics.includes(userLyrics[counter])){
            success.push(userLyrics[counter]);
            actualLyrics.splice(actualLyrics.indexOf(userLyrics[counter]),1);
            successCounter += 1;
        }else{
            errors.push(userLyrics[counter]);
            errorCounter += 1;
        }
        counter++;
    }

    errors = actualLyrics;

    score = ((successCounter - errorCounter)/lyricsWords) * 100
    accuracy = ((successCounter - errorCounter)/userWords) * 100

    response = {"score":Math.round(score), "accuracy":Math.round(accuracy), "successCounter":successCounter, "errorCounter":errorCounter}

    getDifficultyArrays(currentUser, success, errors);
    res.status(200).send(response);
};

function getDifficultyArrays(username, success, errors){
    const databaseConnection = getConnection();
    databaseConnection.collection("users").findOne({"userId": username}, { projection: { _id:0 } }, 
        function(error, data) {
            if (error) {
                console.log('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
                return null;
            } else {
                if(data === null){
                    console.log('⚠️ There are no users with the specified specifications ...');
                    return null;
                } else{
                    success.concat(data["lessDifficulty"]);
                    errors.concat(data["greaterDifficulty"]);
                    updateDifficultyArrays(username, errors, success, databaseConnection);
                }
            }
      });
};

function updateDifficultyArrays(username, diffWords, easyWords, databaseConnection){
    var newData = { $set: {"lessDifficulty":easyWords, "greaterDifficulty":diffWords}  };
    databaseConnection.collection('users').updateOne({'userId': username}, newData, 
        function(error) {
            if(error) {
                console.log('⛔️ An error occurred updating difficulties ... \n[Error]: ' + error);  
            } else {
                console.log("Datos actualizados");
            }
    });
};

function extractLines (lyrics){

    var flag = 0;
    var lenLyrics = lyrics.length;
    var results = "";
    
    var lineStartIndex;
    var lineEndIndex;
    var next;
    var phrase;

    while(flag == 0){

        phrase = "";
        lineStartIndex = lyrics.indexOf("]") + 1;
        lineEndIndex = lyrics.slice(lineStartIndex, lenLyrics).indexOf("[") -1;  

        if(lineEndIndex == -2){
            phrase = lyrics.slice(lineStartIndex, lenLyrics);
            flag = 1;
        }else{
            next = lyrics.slice(lineStartIndex, lenLyrics).indexOf("]") + 2;
            phrase = lyrics.slice(lineStartIndex, lineStartIndex + lineEndIndex);
            lyrics = lyrics.slice(next, lenLyrics);
        }
        if(phrase != null){
            results= results + phrase.trim() + " ";   
        }
    }
    return results;
}

function lineToList(line){

    var counter = 0;
    var word = "";
    result = [];

    while(counter < line.length){

        if(line[counter] != " " && line[counter] != "," && line[counter] != "¿" && line[counter] != "?" && line[counter] != "."){
            word += line[counter];
        }else if(line[counter] == " "){
            if(word != ''){
                result.push(word.toUpperCase());
            }
            word = "";   
        }
        counter++;
    }
    result.push(word.toUpperCase());
    return result;
}

function findUserWords(req, res){

    let currentUser = req.body.username;

    const databaseConnection = getConnection();
    databaseConnection.collection("users").findOne({"userId": currentUser}, { projection: { _id:0 } }, 
        async function(error, data) {
            if (error) {
                console.log('⛔️ An error occurred getting single users ... \n[Error]: ' + error);
                return res.status(400).send("Error");
            } else {
                if(data === null){
                    console.log('⚠️ There are no users with the specified specifications ...');
                    return res.status(400).send("Error");
                } else{
                    var wordsList = await findDifficulty(data["lessDifficulty"], data["greaterDifficulty"]);
                    console.log(wordsList)
                    var message = JSON.stringify({'mostDifficult': wordsList[0], 'leastDifficult': wordsList[1]});
                    console.log(message);
                    return res.status(200).send(message);
                }
            }
        });
}

function findDifficulty(Easy, Difficult){
    var easyList = [];
    var hardList = [];
    var exist = false;
    Easy.forEach(element => {
        easyList.forEach(subList => {
            if(subList.includes(element)){
                subList[1] += 1;
                exist = true
            }
        });
        if(!exist){
            easyList.push([element, 1]);
        }
        exist = false
    });
    orderSublist(easyList, easyList.length);
    if (easyList.length > 3){
        easyList = easyList.slice(-4,-1);
    }
    Difficult.forEach(element => {
        hardList.forEach(subList => {
            if(subList.includes(element)){
                subList[1] += 1;
                exist = true
            }
        });
        if(!exist){
            hardList.push([element, 1]);
        }
        exist = false
    });
    orderSublist(hardList, hardList.length);
    if (hardList.length > 3){
        hardList = hardList.slice(-4,-1);
    }
    return [hardList, easyList];
}

function swap(arr, xp, yp){
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
}

function orderSublist(List, n){
    var i, j;
    for(i = 0; i < n-1; i++){
        for(j = 0; j < n-i-1; j++){
            if(List[j][1] > List[j+1][1]){
                swap(List, j, j+1);
            }
        }
    }
}

module.exports = { scoreCalculator, findUserWords }