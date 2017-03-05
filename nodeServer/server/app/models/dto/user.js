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
var  driver = require('../driver').driver;

exports.user = {
	username: driver.dbtypes.TYPE_STRING,
	password: driver.dbtypes.TYPE_STRING,
	email: driver.dbtypes.TYPE_STRING
};

