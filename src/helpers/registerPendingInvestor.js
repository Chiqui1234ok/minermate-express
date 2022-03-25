const   helpers = {},
        PendingInvestor = require('../models/PendingInvestor');

helpers.registerPendingInvestor = async function (data) {
    try {
        let intentionToPay = {
            projectID: data.projectID,
            stocks: data.stocks,
            paymentMethod: data.paymentMethod,
            amount: data.amount,
            symbol: data.symbol
        };
        let pendingInvestor = await PendingInvestor.findByIdAndUpdate({userID: data.userID}, { 
            $push: {'intentionToPay': intentionToPay} 
        });
        if(!pendingInvestor || !pendingInvestor._id) {
            pendingInvestor = new PendingInvestor({
                userID: data.userID,
                intentionToPay: intentionToPay
            });
            await pendingInvestor.save();
        }
        if(pendingInvestor && pendingInvestor._id)
            return pendingInvestor;
        return false;
    } catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;