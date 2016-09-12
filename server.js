var express = require('express');
var app = express();

app.use(express.static('dist'));

app.listen(3000, function () {
  console.log('VideoHustle is waiting you, master, at port 3000');
});