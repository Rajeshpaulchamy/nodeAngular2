/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 12-Mar-2017  
 *     Table widget component file
 */

/*
 * retrieve the required modules
 */
import { Component, OnInit, Input } from '@angular/core';


/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'ooratable',

	/*
	 * template URL
	 */
	templateUrl: './ooratable.html'
})


/*
 * define Component class
 */
export class OoraTable implements OnInit {
	/*
	 * private members
	 */
	@Input() widgetId: any;

	/*
	 * constructor
	 */
    constructor() { 
	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
		console.log("Widget ID: " + this.widgetId);
    }

	/*
	 * called by container
	 * when widget settings button clicked
	 */
	openSettings() {
		console.log("Open Settings: " + this.widgetId);
	}

	/*
	 * called by container
	 * when widget close button clicked
	 */
	closeWidget() {
		console.log("Widget Closed: " + this.widgetId);
	}
}
