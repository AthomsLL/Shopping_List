const express = require('express');
const bouncer = require('express-bouncer')(10000, 900000, 3);
const router = express.Router();
const passport = require('passport');

const authCtrl = require('../controllers/auth/auth.js');

router.get(
    '/',
    (req, res) => {
        res.send("Hello Auth !");
    }
);

router.post(
    '/signup', 
    authCtrl.userSignup.signup,
);

router.post(
    '/login', 
    bouncer.block, 
    authCtrl.userLogin.login
);

router.get(
    '/google', 
    passport.authenticate("google", { 
        scope: "profile", 
    })
);

router.get(
    '/google/callback', 
    passport.authenticate("google", { 
        session: true
    })
);

module.exports = router;