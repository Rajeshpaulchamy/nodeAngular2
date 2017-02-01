/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     Basic controller file added
 */

let logger = require("../utils/logger.js"),
	authService = require("../services/authService.js");

let ctrl = {

	/*
	 * handling messages received by POST method
	 */
	postMessage: function (req, res){
		let msg = req.query;

		try {
			var temp = msg.params;
			msg.params = JSON.parse(msg.params);
		} catch (e) {
			msg.params = temp;
		}

		/*
		 * find the corresponding service
		 */
		switch(msg.service) {

			/*
			 * Auth service
			 */
			case "authservice":
				/*
				 * call the method
				 */
				authService.auth.requestReceived(req, res);
				break;
		}
	}
};

/* 
 * export to others 
 */
exports.ctrl = ctrl;

