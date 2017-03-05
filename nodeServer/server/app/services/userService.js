/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     User service file added
 */

/*
 * import libs
 */
let logger = require("../../utils/logger.js");

/*
 * Private functions
 */


/*
 * Functions exposed to outside
 */
let service = {

	/*
	 * handling request received from web client
	 */
	addUser: function (req, res) {
		let msg = req.query;

		logger.debug(__filename, __line, "WebClient POST request received for", msg.method);
	},

	/*
	 * handling request received from web client
	 */
	findUser: function (msg, callback) {
		if(msg.email == "test@test.com"){
			callback(user);
		}
	}

};

/* 
 * export to others 
 */
exports.service = service;

