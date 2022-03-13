const   helpers = {},
        PendingProjectReceipt = require('../models/PendingProjectReceipt');

helpers.registerReceipt = async function(data) {
    try {
        const receipt = new PendingProjectReceipt({
            userID: data.userID,
            pendingProjectID: data.pendingProjectID,
            receipt: data.receipt,
            amount: data.amount,
            symbol: data.symbol
        });
        await receipt.save();
        return receipt && receipt._id ? receipt : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;