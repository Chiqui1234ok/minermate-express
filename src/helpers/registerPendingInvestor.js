const   helpers = {},
        PendingInvestor = require('../models/PendingInvestor');

helpers.registerPendingInvestor = async function (data) {
    try {
        // Arm intentionToPay object for future push into array 👇
        let intentionToPay = {
            projectID: data.projectID,
            stocks: data.stocks,
            paymentMethod: data.paymentMethod,
            amount: data.amount,
            symbol: data.symbol
        };
        // Find and update pendingInvestor, pushing more intentions to pay *
        let pendingInvestor = await PendingInvestor.findByIdAndUpdate({userID: data.userID}, { 
            $push: {'intentionToPay': intentionToPay} 
        });
        // * This could return null, so we check and save the pendingInvestor if didn't exists 👇
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