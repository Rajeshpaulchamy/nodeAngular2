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
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription }   from 'rxjs/Subscription';

/*
 * import service providers
 */
import { AuthService } from '../../providers/auth';
import { InterCommService } from '../../providers/intercomm';

/*
 * import view components
 */
import { Login } from '../login/login';

/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'header',

	/*
	 * template URL
	 */
	templateUrl: './header.html'
})


/*
 * define Component class
 */
export class Header implements OnInit {
	/*
	 * private members
	 */
	interComm: InterCommService;
	authService: AuthService;
	navCtrl: NavController;
	subscription: Subscription;

	/*
	 * constructor
	 */
    constructor(interComm: InterCommService, authService: AuthService, navCtrl: NavController) { 
		this.interComm = interComm;
		this.authService = authService;
		this.navCtrl = navCtrl;
	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
    }

	/*
	 * logout method
	 */
	logout() {
        /* 
		 * logout
		 */
        this.authService.logout();
		this.navCtrl.push(Login);
	}

	/*
	 * save dashboard layout
	 */
	saveLayout() {
		/*
		 * save layout
		 */
		this.interComm.saveLayout.next(true);
	}
}
