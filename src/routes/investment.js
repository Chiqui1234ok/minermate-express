const   router = require('express').Router(),
        { investmentExists } = require('../helpers/investmentExists'),
        { patchInvestment } = require('../helpers/patchInvestment'),
        { pendingProjectExists } = require('../helpers/pendingProjectExists'),
        { registerInvestment } = require('../helpers/registerInvestment'),
        { registerPendingProject } = require('../helpers/registerPendingProject');
        

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
        if(investment && investment._id)
            msg += 'Proyecto editado correctamente. ';
    }
    res.send({
        success: investment && investment._id ? true : false,
        data: investment,
        msg: msg
    });
});

router.route('/investment/receipt')
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
        msg += 'Proyecto pendiente de financiación creado exitosamente. ';
    }

    res.send({
        success: pendingProject && pendingProject._id ? true : false,
        data: pendingProject,
        msg: msg
    });
});

module.exports = router;