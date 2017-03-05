/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     Database driver file added
 */

/*
 * retrieve the required modules
 */
const config = require('../../config/config');
var thinky = require('thinky')(config.database);

var driver = {
	dbdriver: thinky,
	r: thinky.r,
	dberror: thinky.Errors,
	dbtypes: {
		TYPE_STRING: thinky.type.string(),
		TYPE_NUMBER: thinky.type.number() 
	}
};

exports.driver = driver;
