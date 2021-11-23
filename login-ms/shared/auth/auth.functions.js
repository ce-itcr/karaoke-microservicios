function isCorrectPassword(inputPassword, storedPassword) {
    if(inputPassword != storedPassword) {
        return false;
    } else {
        return true;
    }
}

module.exports = { isCorrectPassword }