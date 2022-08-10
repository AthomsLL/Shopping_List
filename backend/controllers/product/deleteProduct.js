const Product = require('../../models/Product');

const deleteProduct = (req, res, next) => {
    Product
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit supprimé avec succès !'}))
    .catch(error => res.status(400).json({ error }));
}

module.exports = { deleteProduct }