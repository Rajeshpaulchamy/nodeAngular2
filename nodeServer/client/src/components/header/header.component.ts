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
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth/index';
import { SidenavService } from '../../services/sidenav/index';

/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'dashboard-header',

	/*
	 * template URL
	 */
	templateUrl: './header.html'
})


/*
 * define Component class
 */
export class HeaderComponent implements OnInit {
	/*
	 * private members
	 */
	model: any = {};
	router: Router;
	authService: AuthService;
	sidenavService: SidenavService;

	/*
	 * constructor
	 */
    constructor(router: Router, authService: AuthService, snService: SidenavService) { 
		this.router = router;
		this.authService = authService;
		this.sidenavService = snService;
	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
    }

	/*
	 * logout method
	 */
	toggleSidenav() {
        /* 
		 * toggle
		 */
        this.sidenavService.toggle.next(true);
	}

	/*
	 * logout method
	 */
	logout() {
        /* 
		 * logout
		 */
        this.authService.logout();
	}

}
