const Product = require('../../models/Product');

const addProduct = (req, res, next) => {
    const productObject = { ...req.body };

    const newProduct = new Product({
        ...productObject
    })

    newProduct
    .save()
    .then(() => res.status(201).json({ message: 'Produit enregistré !'}))
    .catch(error => res.status(400).json({ error: error }));
}

module.exports = { addProduct }