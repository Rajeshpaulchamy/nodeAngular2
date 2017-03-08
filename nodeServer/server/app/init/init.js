/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     WebServer init file added
 */

/*
 * retrieve the required modules
 */
const config = require('../../config/config');
let logger = require("../../utils/logger.js"),
	db = require('../models/db').db,
	userDao = require('../models/dao/userDao');

/* 
 * Defines the routes of the expressApplication
 */
function initialize() {
	/*
	 * init database
	 */
	db.init();
}

exports.init = initialize;

