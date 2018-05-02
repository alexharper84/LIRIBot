// _____________________________________
// DEPENDENCIES
// =====================================
// Read and set environment variables
require("dotenv").config();
// Import the Twitter NPM package.
var Twitter = require("twitter");
// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");
// Import the API keys
var keys = require("./keys");
// Import the request npm package.
var request = require("request");
// Initialize the spotify API client with keys
var spotify = new Spotify(keys.spotify);
// _____________________________________
// FUNCTIONS
// =====================================
// Function for running a Twitter Search
// _____________________________________
var callTwitterAPI = function() {
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
// =====================================
// Function for running a Spotify Search
// _____________________________________
// grabs artist name
var getArtistNames = function(artist) {
  return artist.name;
};
// Function for running a Spotify search
var callSpotifyAPI = function(songName) {
  if (songName === undefined) {
    songName = "1999";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist: " + songs[i].artists.map(getArtistNames));
        console.log("song title: " + songs[i].name);
        console.log("track number: " + songs[i].track_number);
        console.log("album: " + songs[i].album.name);
        console.log("release date: " + songs[i].album.release_date);
        console.log("album type: " + songs[i].album.album_type);
        console.log("direct link to song: " + songs[i].album.href);
        console.log("preview song: " + songs[i].preview_url);
        console.log("----------------------------------------------------");
      }
    }
  );
};
// =====================================
// Function for determining which command is executed
// _____________________________________
var userCommand = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
    callTwitterAPI();
    break;

    case "spotify-this-song":
    callSpotifyAPI(functionData);
    break;

    default:
    console.log("LIRI can't understand your nonsense!");
  }
};
// =====================================
// Function which takes in command line arguments and executes switch statement accordigly
// _____________________________________
var cmdLnArgs = function(argOne, argTwo) {
  userCommand(argOne, argTwo);
};
// =====================================
// this takes in user input and assigns them as arguments
// _____________________________________
cmdLnArgs(process.argv[2], process.argv[3]);
