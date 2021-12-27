const express = require('express');
// Init             👇
const app = express();
const path = require('path');

// Global variables 👇


// Settings         👇
app.set('port', process.env.PORT || 3000);

// Middlewares      👇
app.use(express.urlencoded({
    extended: false
})); // Convert form data to json

// Routes           👇
app.use(
    require('./routes/index'),
    require('./routes/user'),
    require('./routes/investment'),
    require('./routes/investmentRelation'),
    require('./routes/payout'),
    require('./routes/office'),
    require('./routes/wallet'),
    require('./routes/error')
);

// Static files     👇
app.use(express.static(path.join(__dirname, 'static')));

module.exports = app;