/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 11-Mar-2017  
 *     Content Container component file
 */

/*
 * retrieve the required modules
 */
import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';


/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'dashboard-content',

	/*
	 * template URL
	 */
	templateUrl: './contentcontainer.html'
})


/*
 * define Component class
 */
export class ContentContainerComponent implements OnInit {
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

	/*
	 * Component views are initialized
	 */
	ngAfterViewInit() {
	}
}
