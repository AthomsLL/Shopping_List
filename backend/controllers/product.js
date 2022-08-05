const Product = require('../models/Product');

const getAllProducts = (req, res, next) => {
    Product
    .find()
    .populate("owner")
    .then(products => {
        const arrayProducts = [];
        products.forEach(product => 
            arrayProducts.push({
                "title": product.title,
                "quantity": product.quantity,
                "isBuyed": product.isBuyed,
                "owner": product.owner
            })
        )
        return res.status(200).json(arrayProducts);
    })
    .catch(error => res.status(400).json({ error: error }))
}

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

const updateProduct = (req, res, next) => {
    const productObject = { ...req.body };

    Product
    .findOneAndUpdate({ _id: req.params.id }, { ...productObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Produit mis à jour avec succès !'}))
    .catch(error => res.status(400).json({ error }));
}

const deleteProduct = (req, res, next) => {
    Product
    .findOneAndDelete({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Produit supprimé avec succès !'}))
    .catch(error => res.status(400).json({ error }));
}

module.exports = { getAllProducts, addProduct, updateProduct, deleteProduct };