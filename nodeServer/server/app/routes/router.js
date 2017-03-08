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
	 * post requests
	 */
	expressApp.post('/adduser', controller.ctrl.addUser);
	expressApp.post('/login', controller.ctrl.login);
	expressApp.post('/getuser', authService.isAuthenticated, controller.ctrl.getUser);

	/*
	 * sample curl commands
	 */
	//	curl -H "Content-Type: application/json" -X POST -d '{"username":"test7","password":"test7", "email": "test6@gmail.com"}' http://172.17.0.3:3000/adduser/
	//	curl -H "Content-Type: application/json" -X POST -d '{"username":"test7","password":"test7"}' http://172.17.0.3:3000/login/
	//	curl -H "Authorization: OAuth eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0OTAyMDE0ODUsImlhdCI6MTQ4ODk5MTg4NSwic3ViIjoidGVzdDcifQ.iP-N0F5mmn4kFCw4YmApTKV5lkd8RrLAC6JR3utqLf8" -X POST -d '{"username":"test7"}' http://localhost:3000/getuser/	

}

/* 
 * export to others 
 */
exports.route = route;

