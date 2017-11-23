var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

var port = 3000;

var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Set Handlebars.
var exphbs = require("express-handlebars");

