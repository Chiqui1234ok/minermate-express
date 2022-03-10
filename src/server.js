const   express = require('express');
        session = require('express-session'),
        cors = require('cors'),
        morgan = require('morgan');
// Init             👇
const app = express();
const path = require('path');

// Global variables 👇


// CORS             👇
app.use(cors());

// Morgan             👇
morgan.token('body', req => {
    return JSON.stringify(req.body)
});
app.use(morgan(':method :url :body'))

// Settings         👇
app.set('port', process.env.PORT || 3000);

// Middlewares      👇
app.use(express.urlencoded({
    extended: false
})); // Convert form data to json
app.use(express.json());

// Session store
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 14400000, // 2.400.000 = 1 hour
        secure: process.env.DEV ? false : true
    }
}));

// Routes           👇
app.use(
    require('./routes/currency'),
    require('./routes/error'),
    require('./routes/index'),
    require('./routes/investment'),
    require('./routes/office'),
    require('./routes/payout'),
    require('./routes/user'),
    require('./routes/wallet')
);

// Static files     👇
app.use(express.static(path.join(__dirname, 'static')));

module.exports = app;