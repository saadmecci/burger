//import orm object to create database functions
var orm = require("../config/orm.js");

var burger = {
	selectAll: function (callback) {
		orm.selectAll("burgers", function (response) {
			callback(response);
		});
	},
	insertOne: function (columns, values, callback) {
		orm.insertOne("burgers", columns, values, function (response) {
			callback(response);
		});
	},
	updateOne: function (objectColumnValues, condition, callback) {
		orm.updateOne("burgers", objectColumnValues, condition, callback, function (response) {
			callback(response);
		});
	}
};
//export the database functions for the controller (burgers_controller.js).
module.exports = burger;