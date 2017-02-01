/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     Authentication service file added
 */

/*
 * import libs
 */
let logger = require("../utils/logger.js");

/*
 * Private functions
 */
let user = {
	email: "test@test.com",
	name: "TEST"
};


/*
 * Functions exposed to outside
 */
let auth = {

	/*
	 * handling request received from web client
	 */
	requestReceived: function (req, res) {
		let msg = req.query;

		logger.debug(__filename, __line, "WebClient POST request received for", msg.method);

		/*
		 * find the corresponding method
		 */
		switch(msg.method) {

			/*
			 * login service
			 */
			case "login":

				let response = {
					result: false,
					data: undefined
				};

				/*
				 * check the login
				 */
				if((msg.params.email == "test@test.com") &&
					(msg.params.password == "test")	) {

					/*
					 * client root
					 */
					let clientRoot = __dirname + "/../../client/";
					response.result = true;

					// sets a cookie with the user's info
					req.session.user = user;
					res.redirect('/');

				} else {
					/*
					 * send the response to client
					 */
					res.send(response);
				}
				break;

			/*
			 * login service
			 */
			case "logout":

				/*
				 * reset the session
				 */
				req.session.reset();
				res.redirect('/');
				
				break;
		}
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
exports.auth = auth;

