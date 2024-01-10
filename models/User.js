// Import the Mongoose library for MongoDB interactions.
const mongoose = require('mongoose');

// Define a schema using Mongoose to structure the data for MongoDB.
const { Schema } = mongoose; // Equivalent to: const Schema = mongoose.Schema;

// Create a user schema specifying the structure of the 'users' collection in MongoDB.
const userSchema = new Schema({
    googleId: String
});

// Create a Mongoose model named 'users' using the defined schema.
// It will only be created if it does not already exist in the MongoDB database.
mongoose.model('users', userSchema);

