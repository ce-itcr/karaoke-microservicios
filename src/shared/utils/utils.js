function getFullDate(){
    const date = new Date();
    var day = date.getDate().toString();
    var month = (date.getMonth()+1).toString();
    var year = date.getFullYear().toString();
    return month + "/" + day + "/" + year;
};

function jsonConcat(o1, o2) {
    for (var key in o2) {
        o1[key] = o2[key];
    }
    return o1;
}

module.exports = { getFullDate, jsonConcat } 