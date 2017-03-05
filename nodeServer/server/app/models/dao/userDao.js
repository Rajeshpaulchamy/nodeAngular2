/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     User DAO file added
 */

/*
 * retrieve the required modules
 */
var logger = require("../../../utils/logger.js"),
	driver = require('../driver').driver,
	db = require('../db').db,
	_ =  require('lodash');

const bcrypt = require('bcryptjs');

var userDao = {

	/*
	 * Add administrator
	 */
	addAdministratorUser: function(){

		/*
		 * check the presence of Administrator
		 */
		db.model.User.filter({
			username: "Administrator"
		}).run()
			.then(function(users){

				/*
				 * check for empty
				 */
				if (_.isEmpty(users)) {
					logger.debug(__filename, __line, "Administraor not found");

					var user = new db.model.User({
						username: "Administrator",
						password: "admin",
						email: "admin@oorasoft.com"
					});

					user.save(function(error, doc) {
						if (error) {
							logger.error(__filename, __line, "Error while saving Administraor User");
						}
						else {
							logger.debug(__filename, __line, "Added Administraor User");
						}
					});

				} else {
					logger.debug(__filename, __line, "Administraor exists");
				}

			}).catch(driver.dberror.DocumentNotFound, function(err) {

				logger.error(__filename, __line, "Document not found exception");

			}).error(function(error) {
				logger.error(__filename, __line, "Unresolved DB error");
			});
	},

	/*
	 * Add user
	 */
	addUser: function(req, res){

		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(req.body.password, salt);

		/*
		 * add new user
		 */
		var user = new db.model.User({
			username: req.body.username,
			email: req.body.email,
			password: hash
		});

		return user.save();
	},

	/*
	 * Get user
	 */
	getUser: function(userSearchField){

		return db.model.User.filter(userSearchField).run()
	}
}


exports.dao = userDao;

