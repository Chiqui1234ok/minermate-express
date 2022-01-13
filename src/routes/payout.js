const   router = require('express').Router(),
        Investment = require('../models/Investment'),
        User = require('../models/User'),
        Wallet = require('../models/Wallet'),
        { registerPayout } = require('../helpers/registerPayout');

router.route('/payout') // Register a payment to some investor/user
.put(async function (req, res) {
    let msg = '', payout = null;
    //
    // Check input 👇
    let     user = await User.findOne({email: req.body.user}),
            investment = await Investment.findOne({name: req.body.investment}),
            wallet = await Wallet.findOne({direction: req.body.wallet});
    msg += req.body.user && user._id ? '' : 'Este usuario no existe. ';
    msg += req.body.investment && investment._id ? '' : 'Este proyecto no existe. ';
    msg += req.body.wallet && wallet ? '' : 'Indica una billetera de criptomonedas válida. ';
    msg += req.body.amount ? '' : 'Indica el monto de este pago. ';
    msg += req.body.symbol ? '' : 'Indica el símbolo de este pago. Por ejemplo, "U$D", "ETH", etc. ';
    //
    if(process.env.DEV == 'true') { // If dev mode, inject default investmentId
        req.body.investmentId = await Investment.find().limit(1);
    }
    // If all valid, create payout 👇
    if(msg == '') {
        payout = await registerPayout({
            userId: user._id,
            investmentId: investment._id,
            walletId: wallet._id,
            amount: req.body.amount,
            symbol: req.body.symbol,
            tx: req.body.tx ? req.body.tx : '#'
        });
    }
    res.send({
        success: payout && payout._id ? true : false,
        data: payout,
        msg: msg
    });
});

router.route('/payout/pool') // Register pool payment in investment
.put(async function (req, res) {

});

module.exports = router;