console.log("Starting spotify.js");

//node liri.js spotify-this-song '<song name here>'
//This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base.

const fs = require("fs");
const os = require("os");
const request = require("request");
const _ = require("lodash");
const dotenv = require("dotenv");
const util = require("util");
const secretKeys = require("./secretkeys.js");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");
//const doAThing = require("./doAThing.js");

var spotifyUser = `${secretKeys.ClientID}`;
var spotifyPass = `${secretKeys.ClientSecret}`;

var nodeArgs = process.argv;
var searchTerm = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    searchTerm = searchTerm + "+" + nodeArgs[i];
  } else {
    searchTerm += nodeArgs[i];
  }
}

var spotify = new Spotify({
  id: spotifyUser,
  secret: spotifyPass
});

module.exports.lookup = () =>
  spotify.search({ type: "track", query: searchTerm }, (err, data) => {
    if (err) {
      return console.log("Error occurred: " + err);
    }

    for (let i = 0; i < 21; i++) {
      console.log("------------------------------------------------");
      var album = data.tracks.items[i].album.name;
      var artist = data.tracks.items[i].artists[0].name;
      var song = data.tracks.items[i].name;
      var prev = data.tracks.items[i].preview_url;
      console.log("Artist: " + artist); //Artist Name
      console.log("Album Name: " + album); //Album Name
      console.log("Song Name :" + song); //Song Name

      if (prev == null) {
        console.log('"The Sign" by Ace of Base');
        //console.log("song link");
      } else {
        console.log(data.tracks.items[i].preview_url); //Song Preview
      }
      var allData =
        "Artist: " + artist + ". Album Name: " + album + ". Song Name :" + song;
      fs.appendFileSync("logs.txt", allData);
    }
  });

//search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

//var i = 0;

//console.log(util.inspect(data, { showHidden: false, depth: null }));
//console.log(data);
// console.log(data.tracks.items[i].album.name); //Album Name
// console.log(data.tracks.items[i].artists[0].name); //Artist Name
// console.log(data.tracks.items[i].name); //Song Name

// prev = data.tracks.items[i].preview_url;
// //console.log(prev);

// if (prev == null) {
//   console.log('"The Sign" by Ace of Base');
//   console.log("song link");
// } else {
//   console.log(data.tracks.items[i].preview_url); //Song Preview
// }

// var aceOfBase = () =>
//   spotify.search({ type: "track", query: "The Sign" }, (err, data) => {
//     if (err) {
//       return console.log("Error occurred: " + err);
//     }
//     var i = 4;
//     //console.log(util.inspect(data, { showHidden: false, depth: null }));
//     //console.log(data);
//     console.log(data.tracks.items[i].album.name); //Album Name
//     console.log(data.tracks.items[i].artists[0].name); //Artist Name
//     console.log(data.tracks.items[i].name); //Song Name

//     prev = data.tracks.items[i].preview_url;
//     //console.log(prev);

//     if (prev == null) {
//       console.log('"The Sign" by Ace of Base');
//       console.log("song link");
//     } else {
//       console.log(data.tracks.items[i].preview_url); //Song Preview
//     }
//   });

// aceOfBase();
