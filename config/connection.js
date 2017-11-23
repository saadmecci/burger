//initialize the mysql npm package
var mysql = require("mysql");

//create the connection for the sql database
var connection = mysql.createConnection({
	host: "127.0.0.1",
	user: "root",
	password: "",
	database: "burgers_db"
});

//connect to the mysql server and sql database
connection.connect(function (error) {
	if (error) {
		console.error("error connecting: " + error.stack);
    	return;	
    }
    console.log("Connected as id " + connection.threadId);
});

//export connection for ORM to use
module.exports = connection;