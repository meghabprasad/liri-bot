require("dotenv").config();
var keys = require("./keys.js");
var inquirer = require("inquirer");
var axios = require("axios");
var Spotify = require('node-spotify-api');
var moment = require("moment");


var userInput = "";
inquirer.prompt([
    {
        type: "input",
        name: "task",
        message: "What would you like to do?",
    }
]).then(function(inquirerResponse){
    userInput = inquirerResponse.task;
    console.log(userInput);
    var userInputArr = userInput.split(" ");
    console.log(userInputArr);
    var inputName = userInputArr.splice(1).join(" ");
    //console.log(inputName);
    
    switch (userInputArr[0]){
        case "concert-this":
            axios.get("https://rest.bandsintown.com/artists/" + inputName + "/events?app_id=codingbootcamp").then(
                function(response){
                    //console.log((response.data[0].venue));
                    console.log("Venue name: " + response.data[0].venue.name);
                    console.log("Venue Location: " + response.data[0].venue.city);
                    var date = response.data[0].datetime;
                    var dateFormatted = moment(date).format("L");
                    console.log("Date of Event: ", dateFormatted);
                    //console.log("Venue location: " + JSON.stringify(response.data));
                    //console.log("Date of Event: " + JSON.stringify(response.data));
                }
            )
            .catch(function(error){
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                  } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                  } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                  }
            })
            break;
        
        case "spotify-this-song":
            var spotify = new Spotify(keys.spotify);
            
            spotify.search({ type: 'track', query: inputName }, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("Album Name: "+data.tracks.items[0].album.name);
            console.log("Song Name: "+data.tracks.items[0].name);
            console.log("Preview Link: ",data.tracks.items[0].preview_url);
            var artistsSpotify = data.tracks.items[0].artists;
            var artists = [];
            for (var i=0; i<artistsSpotify.length; i++){
                artists.push(artistsSpotify[i].name);
            } 
            console.log("Artists: " + artists.join(", "));
            }); 
            break;

        case "movie-this":
        // * Title of the movie.
        // * Year the movie came out.
        // * IMDB Rating of the movie.
        // * Rotten Tomatoes Rating of the movie.
        // * Country where the movie was produced.
        // * Language of the movie.
        // * Plot of the movie.
        // * Actors in the movie.
            axios.get("http://www.omdbapi.com/?t="+inputName+"&y=&plot=short&apikey=trilogy").then(
                function(response) {
                    //console.log(response.data);
                console.log(
                    "Title: " + response.data.Title + '\n' +
                    "IMDB Rating: " + response.data.imdbRating + '\n' +
                    "Year of Release: " + response.data.Year + '\n' +
                    "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + '\n' +
                    "Country of Production: " + response.data.Country + '\n' +
                    "Language: " + response.data.Language + '\n' +
                    "Plot: " + response.data.Plot  + '\n' +
                    "Actors: " + response.data.Actors
                    );
                })
                .catch(function(error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log("---------------Data---------------");
                    console.log(error.response.data);
                    console.log("---------------Status---------------");
                    console.log(error.response.status);
                    console.log("---------------Status---------------");
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an object that comes back with details pertaining to the error that occurred.
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log("Error", error.message);
                }
                console.log(error.config);
                }); 

    }
})


// switch (userInput){
//     case 'concert'
// }