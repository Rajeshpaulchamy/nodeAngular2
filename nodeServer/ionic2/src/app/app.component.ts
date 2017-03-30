/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     App component file
 */

/*
 * retrieve the required modules
 */
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

/*
 * retrieve the view modules
 */
import { Dashboard } from '../pages/dashboard/dashboard';
import { Login } from '../pages/login/login';

/*
 * Import service
 */
import { AuthService } from '../providers/auth';


/*
 * Component metadata
 */
@Component({
	templateUrl: 'app.html'
})

/*
 * define Component class
 */
export class MyApp {
	/*
	 * private members
	 */
	@ViewChild(Nav) nav: Nav;
	authService: any;
	rootPage: any;

	/*
	 * constructor
	 */
	constructor(public platform: Platform, auth: AuthService) {
		this.authService = auth;

		this.initializeApp();

		/*
		 * choose the page to display
		 */
		if(this.authService.getUser()) {
			this.rootPage = Dashboard;
		} else {
			this.rootPage = Login;
		}
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();
		});
	}

	openPage(page) {
		// Reset the content nav to have just this page
		// we wouldn't want the back button to show in this scenario
		this.nav.setRoot(page.component);
	}
}
