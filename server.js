var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: "./VideoHustle-026dd1b7d7c8.json",
  databaseURL: "https://videohustle-d80dd.firebaseio.com/"
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var videosApi = require('./backend/video.js');

app.use(bodyParser.json())

app.use(express.static('dist'));

app.use('/api/videos', videosApi);

app.listen(3000, function () {
  console.log('VideoHustle is waiting you, master, at port 3000');
});