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
import { ViewChild, Component, OnInit } from '@angular/core';
/*
 * Angular2 Material Design
 */
import { MaterialModule } from '@angular/material';
import { MdSidenav } from '@angular/material';
import { Subscription }   from 'rxjs/Subscription';

import { User } from '../../models/index';
import { UserService } from '../../services/user/index';
import { SidenavService } from '../../services/sidenav/index';

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
	subscription: Subscription;


	/*
	 * this is the Material Design Sidenav class reference
	 */
	@ViewChild('sidenav') sidenav: MdSidenav;


	/*
	 * toggle sidenav
	 */
	toggleSidebar() {
		this.sidenav.toggle();
	}

	/*
	 * constructor
	 */
	constructor(usrServ: UserService, snService: SidenavService) { 
		var self = this;
		this.userService = usrServ;
	
		/*
		 * subscribe for sidenav service
		 */
		this.subscription = snService.toggle.subscribe(function(value: boolean) {
			self.toggleSidebar();
		});
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


	/*
	 * on destroy
	 */
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

}


