const mongoose = require('../config/coneection');


const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    coursesOffered: {
        type: String,  
        required: true
    },
    fees: {
        type: Number,
        required: true
    }
});

const College = mongoose.model('College', collegeSchema);
module.exports = College;

