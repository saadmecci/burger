CREATE DATABASE burgers_db;

USE burgers_db;

DROP TABLE IF EXISTS burgers;

CREATE TABLE burgers(
	id INTEGER(10) AUTO_INCREMENT NOT NULL,
	burger_name VARCHAR(30),
	devoured BOOLEAN DEFAULT false,
	date TIMESTAMP,
	PRIMARY KEY(id)
);