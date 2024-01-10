// Import passport library
const passport = require('passport');
// Import passport GoogleStrategy width client and secret keys
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import essential keys for authentication.
const key = require('../configs/keys');
// Import Mongoose
const mongoose = require('mongoose');

// Import Models from mongoose
const User = mongoose.model('users');

// Serialize and Deserialize users to and from a session.
passport.serializeUser((user, done)=>{ done(null, user.id); });

passport.deserializeUser(
    (id, done) => {
        User.findById(id)
        .then(
            user => {
                done(null, user);
            }
        );
    }
);

// Passport library is used to implement Google Authentication.
passport.use(
    new GoogleStrategy(
        // Define clientID and clientSecret keys.
        {
            clientID: key.googleClientID,
            clientSecret: key.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id })
            .then(
                existingUser => {
                    if(existingUser)
                        done(null, existingUser);
                    else
                        new User({ googleId: profile.id })
                    .save()
                    .then(user => done(error=null, user));
                }
            );
        }
    )
);