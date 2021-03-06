//node liri.js do-what-it-says
//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
// Feel free to change the text in that document to test out the feature for other commands.

//console.log("Starting doAThing.js");
//require("dotenv").config();

const fs = require("fs");
//^^^^ Used to append data to logs.txt and to read whats in the random.txt file.

const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

var spotifyUser = keys.spotify.id;
var spotifyPass = keys.spotify.secret;

var spotify = new Spotify({
  id: spotifyUser,
  secret: spotifyPass
});

module.exports.lookup = () =>
  fs.readFile("random.txt", "utf8", (error, data) => {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var command = dataArr[0];
    var song = dataArr[1];

    spotify.search({ type: "track", query: song }, (err, data) => {
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
        console.log("Song Name: " + song); //Song Name

        if (prev == null) {
          console.log(
            'No Audio Available-----you get "The Sign" by Ace Of Bass'
          );

          console.log(
            "https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=5f1cfc7876a14cbfa073a976688d6745"
          );
        } else {
          console.log(data.tracks.items[i].preview_url); //Song Preview
        }
        var allData =
          "Artist: " +
          artist +
          ". Album Name: " +
          album +
          ". Song Name :" +
          song;
        fs.appendFileSync("logs.txt", allData);
      }
    });
  });
