// Import passport library
const passport = require('passport');
// Import passport GoogleStrategy width client and secret keys
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Import essential keys for authentication.
const key = require('../configs/keys');

// Passport library is used to implement Google Authentication.
passport.use(
    new GoogleStrategy(
        {
            clientID: key.googleClientID,
            clientSecret: key.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Access Token', accessToken);
            console.log('Refresh Token', refreshToken);
            console.log('Profile', profile);
        }
    )
);