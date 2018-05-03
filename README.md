# LIRI bot ![CI status](https://img.shields.io/badge/build-beta-brightgreen.svg)

LIRI stands for Language Interpretation and Recognition Interface. LIRI bot is a command line node app that takes in parameters and returns data.

## NPM Dependencies
* dotenv
* twitter
* node-spotify-api
* request
* fs

## API Integration
* Twitter
* Spotify
* OMDB


## Usage
### The following commands run without user input:
```
$ node liri.js my-tweets
$ node liri.js spotify-this-song
$ node liri.js movie-this
$ node liri.js do-what-it-says
```

### These commands accept user input:
```
$ node liri.js spotify-this-song 'El Paso'
$ node liri.js movie-this 'Snakes On A Plane'
```
