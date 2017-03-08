/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 04-Mar-2017  
 *     WebServer config file added
 */

module.exports = {
	database: {
		/*
		 * for docker connect
		 */
		//url: 'mongodb://mongodburl:27017/dmsdb',
		/*
		 * to run idependently
		 */
		url: 'mongodb://172.17.0.2:27017/dmsdb',
		port: 27017,
		db: 'dmsdb',
		createDatabase: true
	},

	secretKey: "MySecretKey"
};
