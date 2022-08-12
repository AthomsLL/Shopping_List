const express = require('express');
const passport = require('passport');
const router = express.Router();

const productCtrl = require('../controllers/product/product.js');

router.get(
    '/', 
    passport.authenticate('jwt', { session: true }),
    productCtrl.getAllProducts.getAllProducts
);

router.post(
    '/',
    passport.authenticate('jwt', { 
        session: true 
    }),
    productCtrl.addProduct.addProduct
);

router.put(
    '/:id',
    passport.authenticate('jwt', { 
        session: true 
    }),
    productCtrl.updateProduct.updateProduct
);

router.delete(
    '/:id',
    passport.authenticate('jwt', { 
        session: true 
    }),
    productCtrl.deleteProduct.deleteProduct
);

module.exports = router;