const   helpers = {},
        Office = require('../models/Office');

helpers.patchOffice = async function(officeID, data) {
    try {
        let office = null;
        office = await Office.findByIdAndUpdate(officeID, data, {new: true});
        return office && office._id ? office : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;