const   helpers = {},
        path = require('path'),
        fileUpload = require('express-fileupload');

helpers.uploadFile = async function(uploadPath, file) {
    // Curates the file name
    file.name = file.name.replace(/\s+/g, '-');
    console.log(file);
    const fileRoute = path.join(uploadPath, file.name);
    let fileMoved = file.mv(uploadPath, function(err) {
        if(err) {
            console.warn(err);
            return false;
        } else {
            return true;
        }
    });
    return fileMoved ? fileRoute : false;
}

module.exports = helpers;