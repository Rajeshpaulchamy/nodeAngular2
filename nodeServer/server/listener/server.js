/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     Server file added
 */

/*
 * retrieve the required modules
 */
let logger = require("../utils/logger.js"),
	express = require('express'),
	app = express(),
	http = require('http').Server(app),
	bodyParser = require('body-parser'),
	session = require('client-sessions'),
	authService = require("../services/authService.js");

/*
 * Start the server
 * @param {Object} router The router module
 */
function start(router) {

	/* configure the express */
	/* parse application/x-www-form-urlencoded */
	app.use(bodyParser.urlencoded({ extended: false }));
	/* parse application/json */
	app.use(bodyParser.json());

	/*
	 * session management
	 */
	app.use(session({
		cookieName: 'session',
		secret: 'random_string_goes_here',
		duration: 30 * 60 * 1000,
		activeDuration: 5 * 60 * 1000,
	}));

	app.use(function(req, res, next) {
		if (req.session && req.session.user) {
			let msg = {
				email: req.session.user.email
			}

			authService.auth.findUser(msg, function(user) {
				if (user) {
					req.user = user;
					delete req.user.password; // delete the password from the session
					req.session.user = user;  //refresh the session value
					res.locals.user = user;
				}
				// finishing processing the middleware and run the route
				next();
			});
		} else {
			next();
		}
	});

	/* 
	 * added for static path
	 * here the path 'client' specified is relative 
	 * to the path from where we are running the server
	 */
	app.use(express.static("/app/client/dist")); 
	/* configure the routes */
	router(app);

	/* start the server */
	http.listen(3000, function(){
		logger.debug(__filename, __line, 'listening on *:3000');
	});
}


/* 
 * export to others 
 */
exports.start = start;


