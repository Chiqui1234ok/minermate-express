const   helpers = {},
        User = require('../models/User');

helpers.registerUser = async function(data) {
    // Set administrative rol for 1st user
    const rol = await User.countDocuments() == 0 ? 1 : 3;
    try {
        // Create user with user's input
        const user = new User({
            email: data.email,
            password: data.password,
            rol: rol
        });
        //
        // Encrypt password
        const encryptedPassword = await user.encryptPassword(data.password);
        user.password = encryptedPassword;
        //
        // Save user
        await user.save();
        return user;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;