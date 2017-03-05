/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Login component file
 */

/*
 * retrieve the required modules
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/index';


/*
 * Component metadata
 */
@Component({
	/*
	 * template URL
	 */
	templateUrl: './login.html'
})


/*
 * define Component class
 */
export class LoginComponent implements OnInit {
	/*
	 * private members
	 */
	model: any = {};
	router: Router;
	authService: AuthService;
	loading: boolean = false;
	error: string = '';

	/*
	 * constructor
	 */
    constructor(router: Router, authService: AuthService) { 
		this.router = router;
		this.authService = authService;
	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
        /* 
		 * reset login status
		 */
        this.authService.logout();
    }

	/*
	 * login method
	 */
	login() {
		/*
		 * change loadin status
		 */
		this.loading = true;

		/*
		 * call login
		 */
		this.authService.login(this.model.username, this.model.password)
		.subscribe((result) => {
			if (result === true) {
				this.router.navigate(['/']);
			} else {
				/*
				 * change loadin status
				 */
				this.loading = false;

				this.error = 'User credentials are not correct';
			}
		});
	}

}
