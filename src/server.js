const   express = require('express');
        session = require('express-session'),
        cors = require('cors');
// Init             👇
const app = express();
const path = require('path');

// Global variables 👇


// CORS             👇
app.use(cors());

// Settings         👇
app.set('port', process.env.minermatePort || 3000);

// Middlewares      👇
app.use(express.urlencoded({
    extended: false
})); // Convert form data to json
app.use(express.json());

// Session store
app.use(session({
    secret: process.env.minermateSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14400000, // 2.400.000 = 1 hour
        secure: process.env.minermateDevelopment ? false : true
    }
}));

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