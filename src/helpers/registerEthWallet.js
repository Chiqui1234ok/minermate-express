const   helpers = {},
        ethereumjs = require('ethereumjs-wallet'),
        { registerWallet } = require('../helpers/registerWallet');

helpers.registerEthWallet = async function(userId) {
    try {
        let ethWallet = ethereumjs.default.generate(),
            address = ethWallet.getAddressString(),
            privateKey = ethWallet.getPrivateKeyString();

        let walletToDb = await registerWallet({
            userId: userId,
            address: address,
            network: 'ERC20',
        });
        //
        walletToDb = walletToDb.toObject(); // Mongoose doesn't allow extra properties, so I'll convert to plain object
        walletToDb.privateKey = privateKey; // Now, embed private key just for the user
        return walletToDb;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;