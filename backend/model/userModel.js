const mongoose = require('../config/coneection');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;