var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var request = require('request');
var cheerio = require('cheerio');
var mongojs = require("mongojs");
var logger = require("morgan");
var mongoose = require("mongoose");

// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

var PORT = 3000;

// Sets up our express server
var app = express();

// Requiring our Note and Article models
var Note = require("./models/Notes.js");
var Article = require("./models/Article.js");

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/webscraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Use morgan and body parser with our app
app.use(logger("dev"));
// Body-parser code 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// handlebars setup
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Serve static content for app from "public" directory in the application directory.
app.use(express.static(path.join(__dirname, 'public')));

// routes
require('./routes/index.js')(app);

// start the server. 
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

