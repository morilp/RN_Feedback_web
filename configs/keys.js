//keys.js -- figure out what set of credentials to use.
if (process.env.NODE_ENV === 'production')
    // In production, use the production keys
    module.exports = require('./prod');
else
    // In development, use the development keys
    module.exports = require('./dev');