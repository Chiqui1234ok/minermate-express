const   router = require('express').Router(),
        PendingProject = require('../models/PendingProject'),
        User = require('../models/User'),
        { registerPendingProject } = require('../helpers/registerPendingProject'),
        { registerReceipt } = require('../helpers/registerReceipt');

router.route('/autoGen/pendingProject')
.get(async (req, res) => {
    res.send('working');
})
.put(async (req, res) => {
    let msg = '', pendingProject = null;
    //
    const defaultNames = [
        'FLORIDA',
        'OLIVOS',
        'BOULOGNE',
        'SI',
        'PEPE',
        'SANTELMO',
        'MIAMI',
        'SAOPAULO',
        'CALIFORNIA',
        'SALTA',
        'MDP'
    ];
    const randomNumber = (Math.random()*10).toFixed(0);
    //
    pendingProject = await registerPendingProject({
        name: `PC-${defaultNames[randomNumber]}${randomNumber}`,
        description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos aspernatur molestiae dolores modi quod. Libero quaerat magni nihil. Illum nobis reiciendis doloribus consequuntur praesentium error velit corrupti rem hic ducimus.',
        stockPrice: 10
    });
    res.send({
        success: pendingProject && pendingProject._id ? true : false,
        data: pendingProject,
        msg: msg
    });
});

router.route('/autogen/pendingProjectReceipt')
.put(async (req, res) => {
    let msg = '', receipt = null, user = null, pendingProject = null;
    //
    const defaultSymbol = [
        'USD',
        'BTC',
        'ETH',
        'ARS',
        'EUR',
        'CPY',
        'RVN',
        'ALPH',
        'BNB'
    ];
    const   randomNumber = (Math.random()*10).toFixed(0),
            randomAmount = (Math.random()*10).toFixed(0),
            randomSymbol = (Math.random()*10).toFixed(0);
    //
    user = await User.find().limit(1);
    pendingProject = await PendingProject.find().limit(1);
    receipt = await registerReceipt({
        userID: user[0]._id,
        projectID: pendingProject[0]._id,
        receipt: '###',
        amount: randomAmount,
        symbol: randomSymbol
    });
    res.send({
        success: receipt && receipt._id ? true : false,
        data: {
            user,
            pendingProject,
            receipt
        },
        msg: msg
    });
});

module.exports = router;