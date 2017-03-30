/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Header component file
 */

/*
 * retrieve the required modules
 */
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
 * Import service
 */
import { AuthService } from '../../providers/auth';

/*
 * import view components
 */
import { Dashboard } from '../dashboard/dashboard';

/*
 * Component metadata
 */
@Component({
	selector: 'login',
	templateUrl: 'login.html'
})


/*
 * define Component class
 */
export class Login {
	/*
	 * private members
	 */
	model: any = {};
	navCtrl: NavController;
	authService: AuthService;
	loading: boolean = false;

	/*
	 * constructor
	 */
	constructor(navCtrl: NavController, auth: AuthService) {

		this.navCtrl = navCtrl;
		this.authService = auth;
	}

	/*
	 * Login
	 */
	login() {
		/*
		 * change loading status
		 */
		this.loading = true;

		/*
		 * Login
		 */
		this.authService.login(this.model.username, this.model.password)
		.subscribe((result) => {
			if (result === true) {
				console.log("Login Success");
				this.navCtrl.push(Dashboard);
			} else {
				/*
				 * change loading status
				 */
				this.loading = false;

				console.log("Login Failed");
			}
		});
	}

}
