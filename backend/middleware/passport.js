require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

// Logique d'authentification JWT
module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    })
    
    passport.deserializeUser((id, done) => {
        User.find({
            where: {
                id: id
            }
            .then((user) => {
                done(null, user);
            })
        })
    })

    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: `${process.env.SECRET}`
    }
    
    passport.use(new JwtStrategy(options, (jwt_payload, done) => {
        User.findOne({ id: jwt_payload.id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};