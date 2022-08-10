const Product = require('../../models/Product');

const updateProduct = (req, res, next) => {
    const productObject = { ...req.body };

    Product
    .findOneAndUpdate({ _id: req.params.id }, { ...productObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Produit mis à jour avec succès !'}))
    .catch(error => res.status(400).json({ error }));
}

module.exports = { updateProduct }