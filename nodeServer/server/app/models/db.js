/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     Init database file added
 */

/*
 * retrieve the required modules
 */
var logger = require("../../utils/logger.js"),
	autoIncrement = require('mongoose-auto-increment'),
	mongoose = require('mongoose'),
	_ =  require('lodash'),
	userDao = require('../models/dao/userDao');
const config = require('../../config/config');


/*
 * import models
 */
var User = require('./dto/user');

/*
 * stores all models
 */
var models = {};

/*
 * add admin user
 */
function addAdminUser() {

	/*
	 * add user Administrator
	 */
	var adminQuery = {
		username: "Administrator"
	};

	return userDao.dao.getUser(adminQuery)
		.then(function(user) {
			if(_.isEmpty(user)) {
				return false;
			} 

			logger.debug(__filename, __line, "Admin user exists");
		})
		.catch(function(err) {

			/*
			 * add user Administrator
			 */
			var query = {
				username: "Administrator",
				password: "welcome",
				email: "admin@dms.com"
			};

			logger.debug(__filename, __line, "Not able to find Admin user");

			return userDao.dao.addUser(query)
				.then(function(user) {
					logger.debug(__filename, __line, "Added Admin user successfully");
				})
				.catch(function(err) {
					logger.error(__filename, __line, "Not able to add Admin user");
				});
		});
}

/*
 * initialize database
 */
function initialize() {
	/*
	 * start db connection
	 */
	mongoose.connect(config.database.url);
	const db = mongoose.connection;
	autoIncrement.initialize(db);


	db.on('error', function(){
		logger.error(__filename, __line, "Database connection error");
	});

	db.once('open', function() {
		logger.info(__filename, __line, "Database connection succeed");

		/*
		 * check and add admin user
		 */
		addAdminUser();
	}); 

}


exports.db = {
	init: initialize,
	model: models
};

