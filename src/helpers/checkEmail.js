const helpers = {};

helpers.checkEmail = function(email) {
    const regularExpression = /\S+@\S+\.\S+/;
    return regularExpression.test(email);
}

module.exports = helpers;