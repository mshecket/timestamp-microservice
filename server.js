// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// main endpoint
app.get("/api/timestamp/:date_string?", function (req, res) {
  const dateString = req.params["date_string"]
  const date = dateString == null ? new Date() : new Date(dateString)
  if (isNaN(date.getTime())) {
    date.setTime(dateString)
    if (isNaN(date.getTime()))
      res.json({"error" : "Invalid Date" })
    else
      res.json({"unix": date.getTime(), "utc": date.toUTCString()})
  }
  else
    res.json({"unix": date.getTime(), "utc": date.toUTCString()})
});



module.exports = app;