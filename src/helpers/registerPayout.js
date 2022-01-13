const   helpers = {},
        Investment = require('../models/Investment'),
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
        // Get investment
        let investment = await Investment.findById(data.investmentId);
        let availableBalanceIndex = investment.map(function(e) { return e.availableBalance; }).indexOf(data.symbol);
        investment.availableBalance[availableBalanceIndex].amount += data.amount;
        await investment.save();
        //
        return payout;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;