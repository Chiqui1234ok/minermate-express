const   helpers = {},
        User = require('../models/User');

helpers.deleteUser = async function (id) {
    try {
        const user = await User.findByIdAndRemove(id);
        return user && user._id ? user : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;