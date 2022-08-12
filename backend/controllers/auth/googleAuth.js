const User = require('../../models/User');
const jwt = require('jsonwebtoken');

const googleLoginOrSignup = (req, res, profile) => {
    User.find().or([{ googleId: profile.sub }, { email: profile.email }])
        .then(userGoogle => {
            if(!userGoogle) {
                const user = new User({
                    email: profile.email,
                    username: profile.displayName,
                    googleId: profile.sub
                });
                user.save()
                .then(() => res.status(201).json({ message : "Utilisateur créé avec succès via Google !"}))
                .catch(error => res.status(400).json({ error }));
            } else {
                res.status(200).json({
                    userId: userGoogle._id,
                    token: jwt.sign(
                        { 
                            userId: userGoogle._id,
                            email: userGoogle.email,
                            username: userGoogle.username,
                            googleId: userGoogle.googleId,
                        },
                        process.env.SECRET,
                        { expiresIn: '1d' }
                    )
                })
            }
        })
        .catch(error => res.status(500).json({ error }));
}

module.exports = { googleLoginOrSignup }