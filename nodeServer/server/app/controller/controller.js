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
	_ =  require('lodash'),
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
		var query = {
			username: req.body.username,
			password: req.body.password,
			email: req.body.email
		};

		return userDao.dao.addUser(query)
			.then(function(user) {

				if(_.isEmpty(user)) {
					logger.error(__filename, __line, "User record not saved");
					throw null;
				} 

				res.status(200).json({
					status: 'success',
				});
				logger.debug(__filename, __line, "User saved successfully");
			})
			.catch(function(err) {
				res.status(500).json({
					status: 'error'
				});
				logger.error(__filename, __line, "Not able to save the user");
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
				var isAuthenticated = false;

				if(_.isEmpty(user)) {
					logger.error(__filename, __line, "User not found");
					throw null;
				} 

				logger.debug(__filename, __line, "User retrieved successfully");

				isAuthenticated = authService.comparePassword(password, user.password);
				if(isAuthenticated) {
					logger.debug(__filename, __line, "User credentials are matching");
					return user;
				} else {
					logger.error(__filename, __line, "User credentials are not correct");
					throw null;
				}
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

		logger.debug(__filename, __line, "Get User", username);

		return userDao.dao.getUser({username: username})
			.then(function(user) {

				if(_.isEmpty(user)) {
					logger.error(__filename, __line, "User not found");
					throw null;
				} 

				logger.debug(__filename, __line, "User retrieved successfully", user);

				return user;
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

