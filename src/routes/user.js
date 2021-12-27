const   router = require('express').Router(),
        { checkEmail } = require('../helpers/checkEmail'),
        { checkPassword } = require('../helpers/checkPassword'),
        { deleteUser } = require('../helpers/deleteUser'),
        { registerUser } = require('../helpers/registerUser'),
        { userExists } = require('../helpers/userExists');

router.route('/user')
.put(async function(req, res) {
    let msg = '', newUser = null;
    //
    // Check if user already exists 👇
    msg = await userExists(req.body.email) ? 'Este email ya fue registrado. ' : '';
    //
    // Check input 👇
    msg += checkEmail(req.body.email) ? '' : 'Tu email no es válido. ';
    msg += checkPassword(req.body.password) ? '' : 'Tu contraseña debe tener al menos 8 caracteres. ';
    //
    // If all valid, create user 👇
    if(msg == '') {
        newUser = await registerUser({
            email: req.body.email,
            password: req.body.password
        });
        msg += 'Usuario registrado correctamete. ';
    }
    res.send({
        success: newUser && newUser._id ? true : false,
        data: newUser,
        msg: msg
    });
})
.delete(async function (req, res) {
    let msg = '', user = null;
    // Check if user exists
    user = await userExists(req.body.email);
    msg = user ? '' : 'Este usuario no existe. ';
    if(msg == '') {
        user = await deleteUser(user._id);
        msg += user && user._id ? 'El usuario se eliminó correctamente. ' : 'El usuario no pudo eliminarse. ';
    }
    res.send({
        success: user && user._id ? true : false,
        data: user,
        msg: msg
    });
});

module.exports = router;