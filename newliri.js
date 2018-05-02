// =====================================
// DEPENDENCIES
// =====================================
require("dotenv").config();
// Import the Twitter NPM package.
var twitter = require("twitter");
// Import the request npm package.
var request = require("request");
// Import the API keys
var keys = require("./keys");
// =====================================
// FUNCTIONS
// =====================================
// Function for calling Twitter api
// _____________________________________
var callTwitter
