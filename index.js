// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api", function (req, res) {
  const utc = req.query.utc;
  const unix = req.query.unix;

  let date = null;

  if (utc) {
    if (isNaN(utc)) {
      res.json({
        error: "Invalid Date",
      });
      return;
    }
    date = new Date(Number(utc));
  } else if (unix) {
    if (isNaN(Date.parse(unix))) {
      res.json({
        error: "Invalid Date",
      });
      return;
    }
    date = new Date(Date.parse(unix));
  } else {
    date = new Date();
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/:input", function (req, res) {
  const input = req.params.input;

  if (isNaN(input) && isNaN(Date.parse(input))) {
    res.json({
      error: "Invalid Date",
    });
    return;
  }

  const date = isNaN(input)
    ? new Date(Date.parse(input))
    : new Date(Number(input));
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
