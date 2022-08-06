const express = require('express');
const passport = require('passport');
const router = express.Router();

const productCtrl = require('../controllers/product/product');

router.get(
    '/', 
//    passport.authenticate('jwt', { session: false }),
    productCtrl.getAllProducts
);

router.post(
    '/',
//    passport.authenticate('jwt', { session: false }),
    productCtrl.addProduct
);

router.put(
    '/:id',
//    passport.authenticate('jwt', { session: false }),
    productCtrl.updateProduct
);

router.delete(
    '/:id',
//    passport.authenticate('jwt', { session: false }),
    productCtrl.deleteProduct
);

module.exports = router;