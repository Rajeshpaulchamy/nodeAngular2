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
	driver = require('./driver').driver;

/*
 * import dto models
 */
var user = require('./dto/user');


/*
 * stores all models
 */
var models = {};

/* 
 * Defines the routes of the expressApplication
 */
function initialize() {
	/*
	 * init tables
	 */
	models.User = driver.dbdriver.createModel("user", user);


	logger.debug(__filename, __line, "Initialized all models");
}

exports.db = {
	init: initialize,
	model: models
};

