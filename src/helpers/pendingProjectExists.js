const   helpers = {},
        PendingProject = require('../models/PendingProject');

helpers.pendingProjectExists = async function(name) {
    try {
        const pendingProject = await PendingProject.findOne({name: name});
        return pendingProject && pendingProject._id ? pendingProject : false;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
};

module.exports = helpers;