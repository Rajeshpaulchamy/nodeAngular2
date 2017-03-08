/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     User table added
 */

/*
 * retrieve the required modules
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var userSchema = {
	/*
	 * Username field
	 */
	username: { type: String, required: true, unique: true },

	/*
	 * Password field
	 */
	password: { type: String, required: true },

	/*
	 * Email field
	 */
	email:  { type: String, required: true },


	created_at: Date,
	updated_at: Date

};


/*
 * we need to create a model using 
 * the above schema
 */
var User = mongoose.model('User', userSchema);

module.exports = User;

