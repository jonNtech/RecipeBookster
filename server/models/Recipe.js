const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    },
    ingredients: {
        type: String,
        required: true,
        minlength: 3,
    },
    steps: {
        type: String,
        required: true,
        minlength: 3,
    },
    chefId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chef',
        required: true
    }
})

module.exports = mongoose.model('Recipe', RecipeSchema);