var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

//import routes and give the server access to them
var burgersController = require("./controllers/burgers_controller.js");

//import (burger.js) to use its database functions
var burger = require("./models/burger.js");

var port = process.env.PORT || 3000;

var app = express();

app.use(express.static("public"));

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));

//set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function (request, response) {
	burger.selectAll(function (results) {
		var burgerObject = {
			burgers: results
		};
		console.log(burgerObject);
    	response.render("index", burgerObject);
	});
});

app.use("/api/burgers", burgersController);

app.listen(port);