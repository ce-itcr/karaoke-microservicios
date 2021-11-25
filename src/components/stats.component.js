const { use } = require('chai');
const { co } = require('co');
const {getConnection} = require('../shared/connection');
const { getFullDate, jsonConcat } = require('../shared/utils/utils');

const scoreCalculator = (req, res) => {

    let userLyrics = req.body.text
    let actualLyrics = req.body.lyrics

    console.log("\n\n\n")
    userLyrics = lineToList(userLyrics);
    console.log("\n\n\n")
    actualLyrics = lineToList(extractLines(actualLyrics));
    //console.log(result);

    res.status(400).send(' Entramos ');
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

    while(counter < line.length ){

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
    console.log(result);
    return result;
}

module.exports = { scoreCalculator }