const mongoose = require('mongoose');
require('dotenv').config();
const dbUrl = process.env.DATABASE_URL;

mongoose.connect(`${dbUrl}/test`, {
    useNewUrlParser: true,   
    useUnifiedTopology: true 
})

    .then(() => {
        console.log('database connect successfully');

    })
    .catch((err) => {
        console.log('database connection problrm', err);
    })

module.exports = mongoose;