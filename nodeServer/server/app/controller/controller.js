/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 28-Jan-2017  
 *     Basic controller file added
 */

let logger = require("../../utils/logger.js"),
	authService = require("../services/authService.js"),
	userDao = require('../models/dao/userDao');

let ctrl = {

	/*
	 * handling messages received by POST method
	 */
	postMessage: function (req, res){
		let msg = req.query;

		try {
			var temp = msg.params;
			msg.params = JSON.parse(msg.params);
		} catch (e) {
			msg.params = temp;
		}

		/*
		 * find the corresponding service
		 */
		switch(msg.service) {

			/*
			 * Auth service
			 */
			case "authservice":
				/*
				 * call the method
				 */
				authService.auth.requestReceived(req, res);
				break;
		}
	},

	/*
	 * Request to adduser
	 */
	addUser: function (req, res){
		return userDao.dao.addUser(req, res)
			.then(function(user) {

				logger.debug(__filename, __line, "User saved successfully");

				return authService.encodeToken(user);
			})
			.then(function(token) {
				res.status(200).json({
					status: 'success',
					token: token
				});

				logger.debug(__filename, __line, "Token generated successfully");
			})
			.catch(function(err) {
				res.status(500).json({
					status: 'error'
				});

				logger.error(__filename, __line, "Exception occurred");

			});
	},

	/*
	 * Request to login
	 */
	login: function (req, res){
		const username = req.body.username;
		const password = req.body.password;

		return userDao.dao.getUser({username: username})
			.then(function(user) {

				logger.debug(__filename, __line, "User retrieved successfully");

				authService.comparePassword(password, user[0].password);
				return user[0];
			})
			.then(function(user) {

				logger.debug(__filename, __line, "Start generate token");
				return authService.encodeToken(user);
			})
			.then(function(token) {
				res.status(200).json({
					status: 'success',
					token: token
				});

				logger.debug(__filename, __line, "Token generated successfully");
			})
			.catch(function(err) {
				res.status(500).json({
					status: 'error'
				});

				logger.error(__filename, __line, "Authentication Failed!!!");
			});
	},

	/*
	 * Request to get user
	 */
	getUser: function (req, res){
		const username = req.body.username;

		return userDao.dao.getUser({username: username})
			.then(function(user) {

				logger.debug(__filename, __line, "User retrieved successfully");

				return user[0];
			})
			.then(function(user) {
				res.status(200).json({
					status: 'success',
					username: user.username,
					email: user.email
				});

				logger.debug(__filename, __line, "User details sent successfully");
			})
			.catch(function(err) {
				res.status(500).json({
					status: 'error'
				});

				logger.error(__filename, __line, "User fetching Failed!!!");
			});
	}
};

/* 
 * export to others 
 */
exports.ctrl = ctrl;

