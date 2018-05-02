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
        console.log("preview song: " + songs[i].preview_url);
        console.log("----------------------------------------------------");
      }
    }
  );
};
// =====================================
// Function for running a OMDB Search
// _____________________________________
var callOMDBAPI = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};
// =====================================
// Function for determining which command is executed
// _____________________________________
var userCommand = function(caseData, functionData) {
  switch (caseData) {
    // use twitter api
    case "my-tweets":
    callTwitterAPI();
    break;
    // use spotify api
    case "spotify-this-song":
    callSpotifyAPI(functionData);
    break;
    // use omdb api
    case "movie-this":
    callOMDBAPI(functionData);
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
