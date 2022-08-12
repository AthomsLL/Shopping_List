const mongoose = require('mongoose');
const validate = require('../middleware/validators/inputValidator');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        default: null,
        validate: validate.titleValidator
    },
    quantity: {
        type: Number,
        required: false,
        default: 1
    },
    isBuyed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
        trim: true
    }
});

module.exports = mongoose.model('Product', productSchema);