const   helpers = {},
        Payout = require('../models/Payout');

helpers.registerPayout = async function(data) {
    try {
        const payout = new Payout({
            userId: data.userId,
            investmentId: data.investmentId,
            walletId: data.walletId,
            amount: data.amount,
            symbol: data.symbol,
            tx: data.tx
        });
        await payout.save();
        return payout;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;