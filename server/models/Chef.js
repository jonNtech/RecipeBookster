const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Chef', ChefSchema);