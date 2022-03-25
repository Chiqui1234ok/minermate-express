const   router = require('express').Router(),
        PendingProject = require('../models/PendingProject'),
        { investmentExists } = require('../helpers/investmentExists'),
        { patchInvestment } = require('../helpers/patchInvestment'),
        { registerInvestment } = require('../helpers/registerInvestment'),
        { transferReceipt } = require('../helpers/transferReceipt');
        
router.route('/investment')
.get(async (req, res) => {
    let msg = '', investment = null;
    console.log(req.headers);
    res.send({
        success: true,
        data: investment,
        msg: msg
    });
})
.put(async (req, res) => {
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
            officeID: req.body.officeID,
            name: req.body.name,
            powerConsumption: req.body.powerConsumption,
            stockPrice: req.body.stockPrice
        });
        if(investment && investment._id)
            msg += 'Proyecto creado correctamente. ';
    }
    res.send({
        success: investment && investment._id ? true : false,
        data: investment,
        msg: msg
    });
})
.patch(async (req, res) => {
    let msg = '', investment = null;
    // 
    // Check if investment already exists 👇
    msg = await investmentExists(req.body.name) ? '' : 'Este proyecto no existe y no puede editarse. ';
    //
    // Check input 👇
    msg += req.body.officeID ? '' : 'Vinculá una oficina a este proyecto. ';
    msg += (req.body.name && req.body.powerConsumption && req.body.stockPrice) ? '' : 'Nombre, consumo en watts o precio de acción sin informar. ';
    msg += req.body.stockQuantity && parseInt(req.body.stockQuantity) >= 100 ? '' : 'La cantidad de acciones emitidas debe ser de al menos 100. ';
    // 'availableBalance' & 'totalMined' are fields edited by the system, when submiting a new payment
    if(msg == '') {
        investment = await patchInvestment(req.body.name, {
            officeID: req.body.officeID,
            name: req.body.name,
            powerConsumption: req.body.powerConsumption,
            stockPrice: req.body.stockPrice,
            stockQuantity: req.body.stockQuantity,
            thumbnail: req.body.thumbnail ? req.body.thumbnail : '#'
        });
        if(investment)
            msg += 'Proyecto editado correctamente. ';
    }
    res.send({
        success: investment ? true : false,
        data: investment,
        msg: msg
    });
});

router.route('/investment/transform')
.get(async (req, res) => {
    let msg = '', investment = null;
    console.log(req.headers);
    res.send({
        success: true,
        data: investment,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', pendingProject = null, investment = null;
    
    pendingProject = await PendingProject.findByIdAndDelete(req.body.pendingProjectID);
    // 1. Create project
    investment = await registerInvestment({
        officeID: req.body.officeID,
        name: pendingProject.name,
        powerConsumption: req.body.powerConsumption,
        stockPrice: req.body.stockPrice,
        stockQuantity: req.body.stockQuantity
    });
    // 2. Transfer receipts from pendingproject to project/investment
    const receipt = await transferReceipt(pendingProject._id, investment._id); 
    // PENDING
    res.send({
        success:  true,
        data: {
            pendingProject,
            receipt
        },
        msg:  msg
    });
});

module.exports = router;