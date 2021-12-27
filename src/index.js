// Environment variables
require('dotenv').config();
const app = require('./server');
const db = require('./config/database');

const port = app.get('port');

// Listening at ${port}
app.listen(port, () => {
    console.log(`NodeJs server on port ${port}`)
});