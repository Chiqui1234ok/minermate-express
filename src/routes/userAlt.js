const { registerWallet } = require('../helpers/registerWallet');

const   router = require('express').Router(),
        { checkEmail } = require('../helpers/checkEmail'),
        { deleteUser } = require('../helpers/deleteUser'),
        { registerUser } = require('../helpers/registerUser'),
        { userExists } = require('../helpers/userExists');

// Alternative method for user registration without password. We use this route when one person want a quick registration, putting money in a new project instantly
// 1. ask for their email, wallet dir and wallet network
// 2. register user and their wallet
// 3. wait for admin aproval
router.route('/user/alt')
.put(async function (req, res) {
    let msg = '', newUser = null,  newWallet = null, registrationHalted = false;
    msg += checkEmail(req.body.email) ? '' : 'Este email es inválido. ';
    msg += userExists(req.body.email) ? 'Este email ya fue registrado. ' : '';
    if(msg == '') { // If user's input are correct
        newUser = await registerUser({
            email: req.body.email,
            password: 'placeholder' // Later, the user will change his password
        });
        if(newUser && newUser._id)
            msg += 'Usuario creado correctamente. Deberás asignar una contraseña nueva mediante el email que acabamos de enviarte. ';
        newWallet = await registerWallet({
            userId: newUser._id,
            address: req.body.address,
            network: req.body.network,
            symbol: req.body.symbol // user will select which token send to us
        });
        if(newWallet && newWallet._id) {
            msg += 'Billetera vinculada correctamente. ';
        } else {
            msg += 'Tu billetera no pudo registrarse. Intenta este proceso nuevamente en unos segundos. ';
            registrationHalted = true;
        }
        if(registrationHalted) {
           // If wallet can't be created, just delete the user too for start from beggining later on
           await deleteUser(newUser._id);
        } else { // If user and wallet are created, go on baby!
            // 1. send e-mail for password change
            // 2. notify admin for payment checking
            // 3. approve payment (this will be handled by another script)
            // code pending...
        }
    }
    res.send({
        success: newUser && newUser._id && !registrationHalted ? true :  false,
        data: {
            user: newUser,
            wallet: newWallet
        },
        msg: msg
    })
})