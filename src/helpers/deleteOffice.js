const   helpers = {},
        Office = require('../models/Office')
        { officeExists } = require('../helpers/officeExists');

helpers.deleteOffice = async function(officeName) {
    try {
        const officeBeforeDelete = await Office.findOneAndDelete({name: officeName});
        // If I can find the office...
        const officeAfterDelete = await Office.findOne({name: officeName});
        // ...return false, because deletion wasn't successfull
        return officeAfterDelete && officeAfterDelete._id ? false : officeBeforeDelete;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;