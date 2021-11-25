const { use } = require('chai');
const { co } = require('co');
const {getConnection} = require('../shared/connection');
const { getFullDate, jsonConcat } = require('../shared/utils/utils');

const scoreCalculator = (req, res) => {

    let userLyrics = req.body.text
    let actualLyrics = req.body.lyrics

    
    userLyrics = lineToList(userLyrics);
    actualLyrics = lineToList(extractLines(actualLyrics.trim()));

    console.log(userLyrics);
    console.log(actualLyrics);

    var counter = 0;
    var lyricsWords = actualLyrics.length;
    var userWords = userLyrics.length;
    var successCounter = 0;
    var errorCounter = 0;

    var errors = [];

    while(counter < userWords){
        if(actualLyrics.includes(userLyrics[counter])){
            actualLyrics.splice(actualLyrics.indexOf(userLyrics[counter]),1);
            successCounter += 1;
        }else{
            errors.push(userLyrics[counter]);
            errorCounter += 1;
        }
        counter++;
    }

    score = ((successCounter - errorCounter)/lyricsWords) * 100
    accuracy = ((successCounter - errorCounter)/userWords) * 100
    

    console.log(successCounter);
    console.log(errorCounter);

    var response = {"score":Math.round(score), "accuracy":Math.round(accuracy), "successCounter":successCounter, "errorCounter":errorCounter}

    res.status(200).send(response);
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

module.exports = { scoreCalculator }