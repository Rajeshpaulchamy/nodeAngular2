/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 31-Jan-2017  
 *     Application router file added
 */


/*
 * retrieve the required modules
 */
let logger = require("../../utils/logger.js"),
	authService = require("../services/authService.js"),
	controller = require('../controller/controller.js');

/* 
 * Defines the routes of the expressApplication
 * @param {Object} expressApp The express object
 */
function route(expressApp) {
	/*
	 * client root
	 */
	//let clientRoot =  "/app/client/";
	let clientRoot =  "../client/src/";

	/*
	 * check user already logged-in or not
	 */
	function requireLogin (req, res, next) {
		if (!req.user) {
			res.redirect('/login');
		} else {
			next();
		}
	};

	/*
	 * get request for home page
	 */
	expressApp.get('/', requireLogin, function(req, res) {
		res.redirect('/main');
	});

	/*
	 * get request for main screen
	 */
	expressApp.get('/main', requireLogin, function(req, res) {
		res.sendFile("main.html", { root: clientRoot });
	});

	/*
	 * get request for login
	 */
	expressApp.get('/login', function(req, res) {
		res.sendFile("login.html", { root: clientRoot });
	});

	/*
	 * post requests
	 */

	/*
	 * only for login controller 
	 * the required login functionality is not needed
	 */
	expressApp.post('/logincontroller', controller.ctrl.postMessage);

	/*
	 * all other post requests 
	 * the required login functionality is must
	 */
	expressApp.post('/controller', requireLogin, controller.ctrl.postMessage);

	/*
	 * post request to register user
	 */
	expressApp.post('/adduser', controller.ctrl.addUser);

	/*
	 * post request for login
	 */
	expressApp.post('/login', controller.ctrl.login);

	/*
	 * post request to get user
	 */
	expressApp.post('/getuser', authService.isAuthenticated, controller.ctrl.getUser);

	/*
	 * sample get, put, delete
	 */
	//expressApp.get('/wines', wines.findAll);
	//expressApp.put('/wines/:id', wines.updateWine);
	//expressApp.delete('/wines/:year', wines.deleteWine);
}

/* 
 * export to others 
 */
exports.route = route;

