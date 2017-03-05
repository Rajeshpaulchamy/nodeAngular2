/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Guard  service file
 */

/*
 * retrieve the required modules
 */
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

/*
 * define AuthGuard class
 */
@Injectable()
export class GuardService implements CanActivate {
	/*
	 * private members
	 */
	router: Router;

	/*
	 * constructor
	 * @param {Router} router object
	 */
	constructor(router: Router) { 
		this.router = router;
	}

	/*
	 * check whether user authenticated or not
	 */
	canActivate() {
		if (localStorage.getItem('currentUser')) {
			/*
			 * logged in so return true
			 */
			return true;
		}

		/* 
		 * not logged in so redirect to login page
		 */
		this.router.navigate(['/login']);
		return false;
	}
}

