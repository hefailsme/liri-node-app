// require is available because Node is installed
require("dotenv").config()
var keys = require("./keys.js")
// these variables take in users arguments to provide query information
var command = process.argv[2]
var query = process.argv[3]
console.log(command)
console.log(process.argv)
// in order to use the twitter npm 
  var Twitter = require('twitter')
  var client = new Twitter(keys.twitter)
// establishing the parameters to have the twitter api search hefailsme twitter
  var parameters = {
    screen_name: 'hefailsme', count: 20
  }
// 
if(command === "my-tweets") {
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

if(command === "spotify-this-song") {
  console.log("")
}

// var spotifyThisSong = function (songQuery) {

// var Spotify = require('node-spotify-api');
// var spotify = new Spotify(keys.spotify);

// if(songQuery === "") {
//   songQuery = "the sign ace of base"
// }

// spotify.search({ type: 'track', query: songQuery}, function (error, data) {
//   if (error) {
//     return console.log('Error occurred: ' + err);
//   } else {

//   }

//   console.log(data);
// })
// }