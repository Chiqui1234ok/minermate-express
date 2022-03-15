const { search } = require("../routes/investment");

const   helpers = {},
        PendingProjectReceipt = require("../models/PendingProjectReceipt");

helpers.transferReceipt = async function(pendingProjectID, finalProjectID) {
    let pendingProjectReceipt = await PendingProjectReceipt.find({
        projectID: pendingProjectID
    });
    return pendingProjectReceipt;
}

module.exports = helpers;