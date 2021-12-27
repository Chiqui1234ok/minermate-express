const   helpers = {},
        Wallet = require('../models/Wallet');

helpers.walletExists = async function(direction) {
    try {
        const wallet = await Wallet.findOne({direction: direction});
        return wallet && wallet._id ? wallet : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;