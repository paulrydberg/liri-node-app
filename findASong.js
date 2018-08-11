console.log("Starting spotify.js");

const fs = require("fs");
const Spotify = require("node-spotify-api");

var spotifyUser = process.env.SPOTIFY_ID;
var spotifyPass = process.env.SPOTIFY_SECRET;

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
      console.log("Song Name: " + song); //Song Name

      if (prev == null) {
        console.log('No Audio Available-----you get "The Sign" by Ace Of Bass');

        console.log(
          "https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae991882ff?cid=5f1cfc7876a14cbfa073a976688d6745"
        );
        //console.log("song link");
      } else {
        console.log(data.tracks.items[i].preview_url); //Song Preview
      }
      var allData =
        "Artist: " + artist + ". Album Name: " + album + ". Song Name: " + song;
      fs.appendFileSync("logs.txt", allData);
    }
  });
