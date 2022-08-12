const validate = require('mongoose-validator');

const titleValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 100],
        message: 'Le nom du produit doit faire entre {ARG[0]} et {ARG[1]} caractères',
    }),
    validate({
        validator: 'matches',
        arguments: /^[a-zA-Z0-9\u00c0-\u00FF\s]*$/,
        message: 'Le nom du produit ne doit contenir que des lettres et des chiffres'
    })
]

module.exports = { titleValidator };