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
 * Component metadata
 */
@Component({
	selector: 'page-page1',
	templateUrl: 'dashboard.html'
})

/*
 * define Component class
 */
export class Dashboard {

	/*
	 * constructor
	 */
	constructor(public navCtrl: NavController) {

	}

}

