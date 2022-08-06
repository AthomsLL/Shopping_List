const express = require('express');
const bouncer = require('express-bouncer')(10000, 900000, 3);
const router = express.Router();

const authCtrl = require('../controllers/auth/auth.js');

router.post(
    '/signup', 
    authCtrl.userSignup.signup
);

router.post(
    '/login', 
    bouncer.block, 
    authCtrl.userLogin.login
);

module.exports = router;