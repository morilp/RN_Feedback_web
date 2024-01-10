// Import Passport for authentication
const passport = require('passport');


// Exporting a function to work with Express applications in the root directory of index.js
module.exports = app => {
    // Initiate Google Account Login and handle authentication information retrieval
    app.get(
        '/auth/google',
        passport.authenticate(
            'google',
            {
                // Define the data we want to access from the Google client
                scope: ['profile', 'email']
            }
        )
    );

    // After Google validates the client, redirect to this endpoint to effectively manage authentication data
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );

    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.send(req.user);
        }
    );

    app.get(
        '/api/current_user',
        (req, res) => {
            res.send(req.user);
        }
    );
};
