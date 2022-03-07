const   helpers = {},
        PendingProject = require('../models/PendingProject');

helpers.registerPendingProject = async function(data) {
    try {
        const pendingProject = new PendingProject({
            name: data.name,
            description: data.description,
            stockPrice: data.stockPrice,
            stockQuantity: data.stockQuantity && data.stockQuantity > 0 ? data.stockQuantity : 100,
            thumbnail: data.thumbnail && data.thumbnail.length > 0 ? data.thumbnail : 'https://minermate.net/assets/img/investments/default-mining-rig-mobile.webp'
        });
        await pendingProject.save();
        return pendingProject;
    }
    catch(err) {
        console.warn(err);
        return false;
    }
}

module.exports = helpers;