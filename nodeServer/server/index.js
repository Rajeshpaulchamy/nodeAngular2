/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     WebServer index file added
 */

/*
 * retrieve the required modules
 */
let server = require('./listener/server'),
	init = require('./app/init/init'),
	router = require('./app/routes/router');

/*
 * initialize the application 
 */
init.init();

/*
 * start the webserver module 
 */
server.start(router.route);

