/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 11-Mar-2017  
 *     Widget holder component file
 */

/*
 * retrieve the required modules
 */
import { Component, OnInit } from '@angular/core';


/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'widget-holder',

	/*
	 * template URL
	 */
	templateUrl: './widgetholder.html'
})


/*
 * define Component class
 */
export class WidgetHolder implements OnInit {
	/*
	 * private members
	 */

	/*
	 * constructor
	 */
    constructor() { 
	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
    }
}

