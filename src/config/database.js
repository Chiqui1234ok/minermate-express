const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log(`Connected to ${process.env.MONGODB_URL}`))
.catch(err => console.log(err));