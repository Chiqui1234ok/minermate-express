const   helpers = {},
        PendingProjectReceipt = require("../models/PendingProjectReceipt");

helpers.transferReceipt = async function(pendingProjectID, finalProjectID) {
    let pendingProjectReceipt = await PendingProjectReceipt.find({
        projectID: pendingProjectID
    });
    for( let i = 0; i < pendingProjectReceipt.length; i++ ) {
        pendingProjectReceipt[i].projectID =  finalProjectID;
        await pendingProjectReceipt[i].save();
    }
    return pendingProjectReceipt;
}

module.exports = helpers;