const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const passwordValidator = require('../../middleware/passwordValidator');
const User = require('../../models/User');

const signup = (req, res, next) => {
    let isValid = true;
    let message = "";

    if(!emailValidator.validate(req.body.email)) {
        isValid = false;
        message = "Veuillez renseigner une adresse email correcte !";
    }
    if(!passwordValidator.validate(req.body.password)) {
        isValid = false;
        message = "Le mot de passe doit comporter au moins 8 caractères, dont au moins 1 majuscule, 1 minuscule et 1 chiffre !";
    }
    if(!emailValidator.validate(req.body.email) && !passwordValidator.validate(req.body.password)) {
        isValid = false;
        message = "Veuillez renseigner des identifiants de connexion corrects !";
    }

    if(!isValid) {
        res.status(403).json({ message });
    } else {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                username: req.body.username,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message : 'Utilisateur créé avec succès !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    }
}

module.exports = { signup }