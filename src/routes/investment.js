const   router = require('express').Router(),
        { investmentExists } = require('../helpers/investmentExists'),
        { registerInvestment } = require('../helpers/registerInvestment');

router.put('/investment', async (req, res) => {
    let msg = '', investment = null;
    //
    // Check if investment already exists 👇
    msg = await investmentExists(req.body.name) ? 'Este proyecto ya existe. ' : '';
    //
    // Check input 👇
    msg += (req.body.name && req.body.powerConsumption && req.body.stockPrice) ? '' : 'Nombre, consumo en watts o precio de acción sin informar. ';
    //
    // If all valid, create investment 👇
    if(msg == '') {
        // Create investment 👇
        investment = await registerInvestment({
            name: req.body.name,
            powerConsumption: req.body.powerConsumption,
            stockPrice: req.body.stockPrice
        });
        msg += 'Proyecto creado correctamente. ';
    }
    res.send({
        success: investment && investment._id ? true : false,
        data: investment,
        msg: msg
    });
});

module.exports = router;