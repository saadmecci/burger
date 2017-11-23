//import MySQL connection
var connection = require("./connection.js");


// elper function for SQL syntax
// helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(number) {
	var array = [];

	for (var i = 0; i < number; i++) {
		array.push("?");
	}

	return array.toString();
}

//helper function to convert object key/value pairs to SQL syntax
function objectToSql(object) {
	var array = [];

	//loop through the keys and push the key/value as a string int arr
	for (var key in object) {
		var value = object[key];
		// check to skip hidden properties
		if (Object.hasOwnProperty.call(object, key)) {
			//if string with spaces, add quotations (Big Burger => "Big Burger")
			if (typeof value === "string" && value.indexOf(" ") >= 0) {
				value = "'" + value + "'";
      		}
      		//{eaten: true} => ["eaten=true"]
			array.push(key + "=" + value);
    	}
	}
	//translate array of strings to a single comma-separated string
	return array.toString();
}

//object for the SQL functions that will be called later
var orm = {
	selectAll: function (tableInput, callback) {
		//set variable to use in MySQL connection.query function
		var queryString = "SELECT * FROM " + tableInput + ";";
		//selects everything in the table to be viewed
		connection.query(queryString, function (error, results) {
			//if function errors, stop script
			if (error) {
				throw error;
			}
			//return the results from the MySQL query into the selectAll method
			callback(results);
		});
	},
	insertOne: function (table, columns, values, callback) {
		//set variable to use in MySQL connection.query function
		var queryString = "INSERT INTO " + table;
		//updates variable with the clumn name and corresponding value to be entered
		queryString += " (";
	    queryString += columns.toString();
	    queryString += ") ";
	    queryString += "VALUES (";
	    queryString += printQuestionMarks(values.length);
	    queryString += ") ";
	    //inserts a row into the table based on column name and value
	    connection.query(queryString, function (error, results) {
	    	//if function errors, stop script
	    	if (error) {
	    		throw error;
	    	}
	    	//return the results from MySQL query into the insertOne method
	    	callback(results);
	    });
	},
	updateOne: function (table, objectColumnValues, condition, callback) {
		//set variable to use in MySQL connection.query function
		var queryString = "UPDATE " + table;
		//updates variable with the clumn name and corresponding value to be entered
		queryString += " SET ";
	    queryString += objectToSql(objectColumnValues);
	    queryString += " WHERE ";
	    queryString += condition;
	    //updates an existing entry in the SQL table
	    connection.query(queryString, function (error, results) {
	    	//if function errors, stop script
	    	if (error) {
	    		throw error;
	    	}
	    	//return the results from MySQL query into the updateOne method
	    	callback(results);
	    });
	}
};
//exports the orm object for the model (burger.js)
module.exports = orm;