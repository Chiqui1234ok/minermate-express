const   helpers = {},
        Wallet = require('../models/Wallet');

helpers.registerWallet = async function(data) {
    try {
        const wallet = new Wallet({
            userId: data.userId,
            direction: data.direction,
            network: data.network
        });
        await wallet.save();
        return wallet;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;