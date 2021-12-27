const helpers = {};

helpers.checkPassword = function(password) {
    let success = true;
    if(password.length < 8)
        success = false;
    return success;
}

module.exports = helpers;