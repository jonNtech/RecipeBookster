const mongoose = require('mongoose');

const ChelfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
})

module.exports = mongoose.model('Chef', ChelfSchema);