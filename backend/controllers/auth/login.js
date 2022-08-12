require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const login = (req, res, next) => {
    User.find().or([{ email: req.body.login }, { username: req.body.login }])
        .then(user => {
            if(!user) {
                return res.status(401).json({ error: 'Utilisateur non reconnu !'});
            }
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid) {
                    return res.status(401).json({ error: 'Mot de passe incorrect !'});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        process.env.SECRET,
                        { expiresIn: '1d' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
}

module.exports = { login }