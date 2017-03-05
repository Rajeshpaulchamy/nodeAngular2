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
let logger = require("../../utils/logger.js"),
	config = require("../../config/config.js"),
	userDao = require('../models/dao/userDao');

const bcrypt = require('bcryptjs');
const moment = require('moment');
const jwt = require('jwt-simple');


/*
 * encodeToken
 */
function encodeToken(user) {
	const playload = {
		exp: moment().add(14, 'days').unix(),
		iat: moment().unix(),
		sub: user.id
	};

	return jwt.encode(playload, config.secretKey);
}

/*
 * decodeToken
 */
function decodeToken(token, callback) {
	var payload;
	var now;

	try {
		payload = jwt.decode(token, config.secretKey);
		now = moment().unix();

	} catch (ex) {
		callback("Token is not valid");
		return;
	}

	/*
	 * check if the token has expired
	 */
	if (now > payload.exp) { 
		callback('Token has expired.');
	} else {
		callback(null, payload);
	}
}

/*
 * Compare Password
 */
function comparePassword(userPassword, databasePassword) {                 
	return bcrypt.compareSync(userPassword, databasePassword);           
}                                                                      

/*
 * Check authentication
 */
function isAuthenticated(req, res, next) {                         
	if (!(req.headers && req.headers.authorization)) {                   
		return res.status(400).json({                                      
			status: 'Please log in'                                          
		});                                                                
	}                                                                    
	// decode the token                                                  
	const header = req.headers.authorization.split(' ');                 
	const token = header[1];                                             

	decodeToken(token, function(err, payload) {                     
		if (err) {
			logger.debug(__filename, __line, "User token expired");

			return res.status(401).json({                                    
				status: 'Token has expired'                                    
			});                                                              
		} else {                                                           

			return userDao.dao.getUser({id: payload.sub})
				.then(function(user) {
					next();

					logger.debug(__filename, __line, "User authentication is valid");
				})
				.catch(function(err) {
					res.status(500).json({
						status: 'error'
					});

					logger.error(__filename, __line, "Exception occurred");
				});
		}                                                                  
	});                                                                  
}                                                                      


/* 
 * export to others 
 */
module.exports = {
  encodeToken,
  decodeToken,
  comparePassword,
  isAuthenticated
};

