const { use } = require('chai');
const {getConnection} = require('../shared/connection');
const { getFullDate, jsonConcat } = require('../shared/utils/utils');

const scoreCalculator = (req, res) => {

    let userLyrics = req.body.text
    let actualLyrics = req.body.lyrics    

    res.status(400).send(' Entramos ');
};


module.exports = { scoreCalculator }