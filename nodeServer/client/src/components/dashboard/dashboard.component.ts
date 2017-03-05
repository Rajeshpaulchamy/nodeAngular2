/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Dashboard componet file
 */

/*
 * retrieve the required modules
 */
import { Component, OnInit } from '@angular/core';

import { User } from '../../models/index';
import { UserService } from '../../services/user/index';

/*
 * Component metadata
 */
@Component({
	/*
	 * directives used in this component
	 */
	/*directives: [],*/

	/*
	 * template URL
	 */
	templateUrl: './dashboard.html',
})

/*
 * define Component class
 */
export class DashboardComponent {
	/*
	 * private members
	 */
	user: User;
	userService: UserService;


	/*
	 * constructor
	 */
	constructor(usrServ: UserService) { 
		this.userService = usrServ;
	}

	/*
	 * on init
	 */
	ngOnInit() {
		/*
		 * get users from secure api end point
		 */
		var user = JSON.parse(localStorage.getItem('currentUser'));
		this.userService.getUser(user.username)
		.subscribe((user) => {
			this.user = user;
		});
	}
}


