const   helpers = {},
        User = require('../models/User');

helpers.userExists = async function(email) {
    try {
        const user = await User.findOne({email: email});
        return user && user._id ? user : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;