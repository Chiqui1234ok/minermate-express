const   router = require('express').Router(),
        User = require('../models/User'),
        { deleteWallet } = require('../helpers/deleteWallet'),
        { registerEthWallet } = require('../helpers/registerEthWallet'),
        { registerWallet } = require('../helpers/registerWallet'),
        { walletExists } = require('../helpers/walletExists');

router.route('/wallet/legacy') // Doesn't create a real wallet, just stores the address
.put(async function(req, res) {
    let msg = '', user = await User.findOne({email: req.body.email}), wallet = null;
    msg += user ? '' : 'Este email no existe. ';
    msg += req.body.address ? '' : 'Indicá una billetera. ';
    msg += req.body.network ? '' : 'Indicá una red blockchain válida. ';
    msg += req.body.symbol ? '' : 'Indicá el símbolo de tu criptomoneda, ejemplo: ETH, BUSD, etc. ';
    if(msg == '') {
        wallet = await registerWallet({
            userId: user._id,
            address: req.body.address,
            network: req.body.network,
            symbol: req.body.symbol
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

router.route('/wallet/eth') // Creates a real Ethereum wallet
.put(async function(req, res) {
    let msg = '', wallet = null;
    wallet = await registerEthWallet(req.body.userId);
    msg += wallet && wallet._id ? 'La billetera se generó correctamente. ' : 'No se pudo generar esta billetera de Ethereum. ';
    res.send({
        success: wallet && wallet._id,
        data: wallet,
        msg: msg
    });
});

module.exports = router;