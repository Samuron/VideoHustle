var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var db = firebase.database();
var videos = db.ref("/videos");

router.post('/', function (req, res) {
    var newVideo = videos.push(req.body);
    req.body.id = newVideo.key;
    res.send(req.body);
});

router.get('/', function (req, res) {
    videos.on("value", snapshot => res.send(snapshot.val()), err => console.log("The read failed: " + err.code));
});

module.exports = router;