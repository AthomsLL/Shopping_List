const passport = require("passport");
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
require('dotenv').config();
const User = require('../models/User');
const googleAuth = require('../controllers/auth/googleAuth.js');

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

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (profile, done) => {
      const account = profile;
      console.log(account);
    }
    // googleAuth.googleLoginOrSignup
));