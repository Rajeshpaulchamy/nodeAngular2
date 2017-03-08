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
	db = require('../db').db,
	_ =  require('lodash');
const bcrypt = require('bcryptjs');

/*
 * import models
 */
var User = require('../dto/user');


var userDao = {

	/*
	 * Add user
	 */
	addUser: function(query){

		const salt = bcrypt.genSaltSync();
		const hash = bcrypt.hashSync(query.password, salt);
		var query = 
		{
			username: query.username,
			email: query.email,
			password: hash
		};

		/*
		 * add new user
		 */
		return User.create(query);
	},

	/*
	 * Get user
	 */
	getUser: function(userSearchField){

		return User.findOne(userSearchField);	
	}
}


exports.dao = userDao;

