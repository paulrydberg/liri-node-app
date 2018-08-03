require("dotenv").config();

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var tweetFind = "my-tweets";
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

var spotifyFind = "spotify-this-song";
//node liri.js spotify-this-song '<song name here>'
//This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base.

var movieFind = "movie-this";

var doThing = "do-what-it-says";
