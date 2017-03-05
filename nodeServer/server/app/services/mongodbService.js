/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 31-Jan-2017  
 *     Sample mongodb connection file added
 */

var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var myCollection;

app.get('/', function (req, res) {

	var db = MongoClient.connect('mongodb://mongodburl', function(err, db) {

		if(err) {
			throw err;
		}

		console.log("connected to the mongoDB !");
		myCollection = db.collection('test_collection');

		myCollection.insert({name: "doduck", description: "learn more than everyone"}, function(err, result) {
			if(err) {
				throw err;
			}

			console.log("entry saved");
		});

	});

	res.send('Hello Rajesh Mongo!');
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});


