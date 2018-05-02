// _____________________________________
// DEPENDENCIES
// =====================================
// _____________________________________
// Read and set environment variables
// _____________________________________
require("dotenv").config();
// _____________________________________
// Import the Twitter NPM package.
// _____________________________________
var Twitter = require("twitter");
// Import the API keys
var keys = require("./keys");
// _____________________________________
// Import the request npm package.
// _____________________________________
var request = require("request");
// _____________________________________
// FUNCTIONS
// =====================================
// _____________________________________
// Function for running a Twitter Search
// _____________________________________
var getMyTweets = function() {
  var client = new Twitter(keys.twitter);
  var params = {
    screen_name: "bootcampstuden1"
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
};
// _____________________________________
// Function for determining which command is executed
// _____________________________________
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;

    default:
      console.log("LIRI doesn't know that");
  }
};
// _____________________________________
// Function which takes in command line arguments and executes correct function accordigly
// _____________________________________
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};
// _____________________________________
// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv[3]);
