// require is available because Node is installed
require("dotenv").config()
var keys = require("./keys.js")
// these variables take in users arguments to provide query information
var command = process.argv[2]
var query = process.argv[3]
// in order to use the twitter npm 
var Twitter = require('twitter')
var client = new Twitter(keys.twitter)
// in order to use the spotify npm
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
// in order to use the request npm
var request = require('request');
// in order to use the fs npm 
var fs = require("fs");
// establishing the parameters to have the twitter api search hefailsme twitter
var parameters = {
  screen_name: 'hefailsme',
  count: 20
}

if (command === "my-tweets") {
  client.get('statuses/user_timeline', parameters, function (error, tweets, response) {
    if (error) {
      console.log(error)
    } else {
      console.log("20 Recent Tweets")
      console.log("")

      for (var i = 0; i < tweets.length; i++) {
        console.log("(Tweet #:" + (i + 1) + " ) " + tweets[i].text)
        console.log("Tweeted: " + tweets[i].created_at)
        console.log("")
      }
    }
  })
}



if (command === "spotify-this-song") {

  function searchSpotify(songName) {
    console.log('spotifySongToSearch === ', songName)
    spotify.search({
      type: 'track',
      query: songName
    }, function (error, data) {
      if (error) {
        return console.log('Error occurred: ' + err)

      } else {
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
          if (i === 0) {
            console.log("Artist(s): " + data.tracks.items[0].artists[i].name);
          } else {
            console.log(" " + data.tracks.items[0].artists[i].name);
          }
        }
        console.log("Song:         " + data.tracks.items[0].name);
        console.log("Preview Link: " + data.tracks.items[0].preview_url);
        console.log("Album:        " + data.tracks.items[0].album.name);
      }
    })
  }

  var spotifySongToSearch = process.argv[3]
  if (spotifySongToSearch === undefined) {
    spotifySongToSearch = 'The Sign Ace of Base'
    searchSpotify(spotifySongToSearch)
  } else {
    searchSpotify(spotifySongToSearch)
  }
}

if (command === "movie-this") {
  function searchMovie(movieQuery) {
    request("http://www.omdbapi.com/?t=" + movieQuery + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("movieToSeach === ", movieQuery)
        console.log("* Title of the movie:         " + JSON.parse(body).Title);
        console.log("* Year the movie came out:    " + JSON.parse(body).Year);
        console.log("* IMDB Rating of the movie:   " + JSON.parse(body).imdbRating);
        console.log("* Country produced:           " + JSON.parse(body).Country);
        console.log("* Language of the movie:      " + JSON.parse(body).Language);
        console.log("* Plot of the movie:          " + JSON.parse(body).Plot);
        console.log("* Actors in the movie:        " + JSON.parse(body).Actors);

        for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
          if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
            console.log("* Rotten Tomatoes Rating:     " + JSON.parse(body).Ratings[i].Value)
            if (JSON.parse(body).Ratings[i].Website !== undefined) {
              console.log("* Rotten Tomatoes URL:        " + JSON.parse(body).Ratings[i].Website)
            }
          }
        }
      }
    })
  }
  var movieQuery = process.argv[3]
  if (movieQuery === undefined) {
    movieQuery = "mr nobody";
    searchMovie(movieQuery)
  } else {
    searchMovie(movieQuery)
  }
}

// node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
// Feel free to change the text in that document to test out the feature for other commands.

// App functionality from file read / loads fs npm package


if (command === "do-what-it-says") //function searchSpotify(data){
  {fs.readFile("random.txt", "utf-8", function (error, data) {
    var command;
    var query;
    if (data.indexOf(",") !== -1) {
      var dataArr = data.split(",");
      if (dataArr[0] === 'spotify-this-song') {
        spotifySongToSearch = (dataArr[1])
        // searchSpotify(spotifySongToSearch)
        console.log(dataArr)
      }
    }
  })
  // var spotifySongToSearch = process.argv[3]
  // if (spotifySongToSearch === "do-what-it-says") {
  //   searchSpotify(spotifySongToSearch)
  // } 
}