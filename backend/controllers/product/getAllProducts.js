const Product = require('../../models/Product');

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

module.exports = { getAllProducts }