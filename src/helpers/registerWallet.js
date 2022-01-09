const   helpers = {},
        Wallet = require('../models/Wallet');

helpers.registerWallet = async function(data) {
    try {
        const wallet = new Wallet({
            userId: data.userId,
            address: data.address,
            network: data.network,
            symbol: data.symbol
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