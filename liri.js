console.log("Starting liri.js");
//require("dotenv").config();

const fs = require("fs");
const os = require("os");
const request = require("request");
const _ = require("lodash");
const dotenv = require("./.env");
const keys = require("./keys.js");
const secretKeys = require("./secretkeys.js");
const findASong = require("./findASong.js");
const tweetTweet = require("./tweetTweet.js");
const OMDBmovies = require("./OMDBmovies.js");
const doAThing = require("./doAThing.js");

const util = require("util");

var tweetFind = "my-tweets";
var spotifyFind = "spotify-this-song";
var movieFind = "movie-this";
var doThing = "do-what-it-says";

var liriCommand = process.argv[2];
var commandQuery = process.argv[3];

var result;

if (liriCommand === spotifyFind) {
  ////////////////////////////////
  if (commandQuery == null || undefined || "") {
    console.log("Please Type A Song Name.");
  } else {
    result = findASong.lookup();
  }
  ////////////////////////////////
} else if (liriCommand === tweetFind) {
  result = tweetTweet.lookup();
} else if (liriCommand === movieFind) {
  ////////////////////////////////
  if (commandQuery == null || undefined || "") {
    console.log("Please Type A Movie Name.");
  } else {
    result = OMDBmovies.lookup();
  }
  ////////////////////////////////
} else if (liriCommand === doThing) {
  result = doAThing.lookup();
  //console.log(result);
} else {
  console.log("LIRI wasn't given a command.");
}

// End Working Code
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var result = notes.addNote();
// console.log(result);

// Prints the outputNumber
//console.log(outputNum);

// ### Create a README.md
// Add a `README.md` to your repository describing the project. Here are some resources
//for creating your `README.md`. Here are some resources to help you along the way:

// * [About READMEs](https://help.github.com/articles/about-readmes/)
// * [Mastering Markdown](https://guides.github.com/features/mastering-markdown/)

// ### BONUS ////////////////////////////////////////////////////////////////////////////////////////////////////
// * In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
// * Make sure you append each command you run to the `log.txt` file.
// * Do not overwrite your file each time you run a command.

// fs.appendFile("log.txt", `Blah Blah ${object.path}.`, err => {
//   if (err) {
//     console.log("Unable to write to file");
//   }
// });
////////////////////////////////////////////////////////////////////////////////////////////////////
