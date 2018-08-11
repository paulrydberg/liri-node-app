console.log("Starting OMDBmovies.js");

const fs = require("fs");
const request = require("request");

var nodeArgs = process.argv;
var movieName = "";

for (var i = 3; i < nodeArgs.length; i++) {
  if (i > 3 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  } else {
    movieName += nodeArgs[i];
  }
}

var apiKey = process.env.OMDB_ACCESS_TOKEN;

var queryUrl =
  "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=" + apiKey;

module.exports.lookup = () =>
  request(queryUrl, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var theGoods = JSON.parse(body);
      var movieTitle = "Movie Title: " + theGoods.Title; // Movie Title
      var year = "Year Movie Was Made: " + theGoods.Year; // Year Released
      var imdbSpelledOut = theGoods.Ratings[0].Source;
      var imdbRating = theGoods.Ratings[0].Value;
      var imdbScore = imdbSpelledOut + " Rating: " + imdbRating; // IMDB Score

      var country = "Country Movie Was Made In: " + theGoods.Country; // Movie Country
      var language = "Language(s) Movie Was Released In: " + theGoods.Language; // Movie Language
      var plot = "Movie Plot: " + theGoods.Plot; // Movie Plot
      var actors = "Actors In Movie: " + theGoods.Actors; // Movie Plot

      //console.log(theGoods);
      //console.log("-------------------------------------------------");

      console.log(movieTitle);
      console.log(year);

      console.log(imdbScore);

      if (theGoods.Ratings[1] == null || undefined || "") {
        console.log("This Movie Doesnt Have Rotton Tomato Score");
      } else {
        var tomatoSpelledOut = theGoods.Ratings[1].Source;
        var tomatoRating = theGoods.Ratings[1].Value;
        var tomatoScore = tomatoSpelledOut + " Rating: " + tomatoRating; // Tomato Score
        console.log(tomatoScore);
        //console.log("Show Rotton Score");
      }

      console.log(country);
      console.log(language);
      console.log(plot);
      console.log(actors);
      var allData =
        movieTitle +
        " " +
        year +
        " " +
        imdbScore +
        " " +
        tomatoScore +
        " " +
        country +
        " " +
        language +
        " " +
        plot +
        " " +
        actors;
      fs.appendFileSync("logs.txt", allData);
    }
  });
