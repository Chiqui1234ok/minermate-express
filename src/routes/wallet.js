const Wallet = require('../models/Wallet');

const   router = require('express').Router(),
        User = require('../models/User'),
        { deleteWallet } = require('../helpers/deleteWallet'),
        { registerWallet } = require('../helpers/registerWallet'),
        { walletExists } = require('../helpers/walletExists');

router.route('/wallet')
.put(async function(req, res) {
    let msg = '', user = await User.findOne({email: req.body.email}), wallet = null;
    msg += user ? '' : 'Este email no existe. ';
    msg += req.body.direction ? '' : 'Indicá una billetera. ';
    msg += req.body.network ? '' : 'Indicá una red blockchain válida. ';
    if(msg == '') {
        wallet = await registerWallet({
            userId: user._id,
            direction: req.body.direction,
            network: req.body.network
        });
        msg += 'Billetera creada y vinculada correctamente. ';
    }
    res.send({
        success: wallet && wallet._id ? true : false,
        data: wallet,
        msg: msg
    });
})
.delete(async function(req, res) {
    let msg = '', wallet = null;
    wallet = await walletExists(req.body.direction);
    msg += wallet && wallet._id ? '' : 'Esta billetera no existe. ';
    if(msg == '') {
        wallet = await deleteWallet(wallet._id);
        msg += wallet && wallet._id ? 'La billetera se borró correctamente. ' : 'La billetera no pudo eliminarse. ';
    }
    res.send({
        success: wallet && wallet._id ? true : false,
        data: wallet,
        msg: msg
    })
});

module.exports = router;