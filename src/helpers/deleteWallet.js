const   helpers = {},
        Wallet = require('../models/Wallet');

helpers.deleteWallet = async function(id) {
    try {
        wallet = await Wallet.findByIdAndDelete(id);
        return wallet;
    }
    catch(err) {
        console.warn(err);
        return false;
    }   
}

module.exports = helpers;