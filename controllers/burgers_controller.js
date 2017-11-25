//require the npm express package
var express = require("express");
var router = express.Router();
//import the burger model database functions
var burger = require("../models/burger.js");

router.post("/api", function (request, response) {
	burger.insertOne(["burger_name", "devoured"
	], [
		request.body.name, request.body.devoured
	], function (result) {
		response.json({ id: result.insertId });
	});
});

router.put("/:id", function (request, response) {
	var condition = "id = " + request.params.id;

	burger.updateOne({
		devoured: request.body.devoured
	}, condition, function (result) {
		if (result.changedRows == 0) {
			return response.status(404).end();
		} else {
			response.status(200).end();
		}
	});
});

//export routes to be used by (server.js)
module.exports = router;