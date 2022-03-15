const   router = require('express').Router(),
        PendingProject = require('../models/PendingProject'),
        { investmentExists } = require('../helpers/investmentExists'),
        { patchInvestment } = require('../helpers/patchInvestment'),
        { pendingProjectExists } = require('../helpers/pendingProjectExists'),
        { registerInvestment } = require('../helpers/registerInvestment'),
        { registerPendingProject } = require('../helpers/registerPendingProject'),
        { registerReceipt } = require('../helpers/registerReceipt'),
        { transferReceipt } = require('../helpers/transferReceipt'),
        { upload } = require('../helpers/upload.js');
        

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

router.route('/investment/receipt')
.get(async (req, res) => {
    let msg = '', placeholder = null;
    console.log(req.headers);
    res.send({
        success: true,
        data: placeholder,
        msg: msg
    });
})
.put(async (req, res) => {
    let msg = '', receipt = null;
    // Not necesary to check if receipt's duplicate

    // Check input
    msg += req.body.userID && req.body.userID.length == 24 ? '' : 'Es necesario vincular este comprobante con un usuario válido. ';
    msg += req.body.pendingProjectID && req.body.pendingProjectID.length == 24 ? '' : 'Favor de vincular este comprobante con un proyecto pendiente válido. ';
    msg += req.files.receipt ? '' : 'Falta adjuntar el comprobante. ';
    msg += req.body.amount && req.body.amount > 0 ? '' : 'Indica el monto pagado de este comprobante. ';
    msg += req.body.symbol && req.body.symbol.length >= 3 ? '' : 'Indicá el símbolo de tu moneda, ej: "USD", "BTC", "ETH", etc. ';

    if(msg == '') {
        receipt = await registerReceipt({
            userID: req.body.userID,
            pendingProjectID: req.body.pendingProjectID,
            // receipt: req.body.receipt,
            amount: req.body.amount,
            symbol: 'USD' // hard-coded
        });
        if(receipt) {
            msg += 'Comprobante registrado exitosamente. ';
            // upload helper :)
            msg += upload(uploadPath, req.files.receipt) ? 'La imágen del comprobante se registró correctamente. ' : 'La imágen no pudo subirse al servidor, por favor enviala por e-mail o WhatsApp. ';
        }
    }

    res.send({
        success: receipt ? true : false,
        data: receipt,
        msg: msg
    });
});

router.route('/investment/pending')
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
    let msg = '', pendingProject = null;

    // Check if Pending project already exists 👇
    msg += await pendingProjectExists(req.body.name) ? 'Este proyecto pendiente ya fue creado. ' : '';

    // Check input 👇
    msg += (req.body.name && req.body.name.length > 5) ? '' : 'El nombre debe tener más de 5 caracteres. ';
    msg += (req.body.description && req.body.description.length >= 40) ? '' : 'La descripción debe contar con al menos 40 caracteres. ';
    msg += (req.body.stockPrice && req.body.stockPrice > 0) ? '' : 'El precio de acción debe ser un numérico positivo. ';
    
    if(msg == '') {
        pendingProject = await registerPendingProject({
            name: req.body.name,
            description: req.body.description,
            stockPrice: req.body.stockPrice,
            stockQuantity: req.body.stockQuantity,
            thumbnail: req.body.thumbnail
        });
        if(pendingProject)
            msg += 'Proyecto pendiente de financiación creado exitosamente. ';
    }

    res.send({
        success: pendingProject ? true : false,
        data: pendingProject,
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