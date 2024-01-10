// Import or create Require library and apps. 
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./configs/keys');

/* (START) Import or create Require library and apps */
// Ensure that the Passport service is initialized when the server is running
require('./models/User');
require('./services/passport');

//Connect to MongoDB database.
mongoose.connect(keys.mongoURI);

// Set up an Express.js application using the Express library.  
const app = express();

// Enable passport to use the cookieSession middleware to manage authentication data.
app.use(
    // Set up cookieSession middleware
    cookieSession(
        {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            keys: [keys.cookieKey]
        }
    )
);

// fix for passport new version
// Register regenerate & save after the cookieSession middleware initialization 
// app.use(function(request, response, next) {
//     if (request.session && !request.session.regenerate) {
//         request.session.regenerate = (cb) => {
//             cb();
//         };
//     }
//     if (request.session && !request.session.save) {
//         request.session.save = (cb) => {
//             cb();
//         };
//     }
//     next();
// });

// Initialize passport.
app.use(passport.initialize());

// Serialize and Deserialize users to and from a session.
app.use(passport.session());

// Attach the authentication routes from the 'authRoutes' module to the Express app.
require('./routes/authRoutes')(app);
/* (END) Import or create Require library and apps */

// Use the port specified by the deployment service, or default to port 5000 if not provided.
const PORT = process.env.PORT || 5000;
// Start listening on the specified PORT and log the server's address to the console.
app.listen(PORT, () => { console.log(`Server running at http://127.0.0.1:${PORT}`); });
