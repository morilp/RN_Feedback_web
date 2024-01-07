// Import express library
const express = require('express');

// Ensure that the Passport service is initialized when the server is running
require('./services/passport');

// Set up an Express.js application  
const app = express();

// Handle HTTP GET request on the root path and send a JSON response.
app.get('/', (req, res) => {
    res.send({ bye: 'dude' });
});

// Attach the authentication routes from the 'authRoutes' module to the Express app.
require('./routes/authRoutes')(app);

// Use the port specified by the deployment service, or default to port 5000 if not provided.
const PORT = process.env.PORT || 5000;


// Start listening on the specified PORT and log the server's address to the console.
app.listen(PORT, () => { console.log(`Server running at http://127.0.0.1:${PORT}`); });
