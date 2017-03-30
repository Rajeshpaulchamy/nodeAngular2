/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Settings component file
 */

/*
 * retrieve the required modules
 */
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

/*
 * import service providers
 */
import { InterCommService } from '../../providers/intercomm';

/*
 * import view components
 */

/*
 * Component metadata
 */
@Component({
	/*
	 * template URL
	 */
	templateUrl: './settings.html'
})


/*
 * define Component class
 */
export class Settings {
	/*
	 * private members
	 */
	interComm: InterCommService;


	/*
	 * constructor
	 */
    constructor(interComm: InterCommService, 
				public viewCtrl: ViewController) { 

		var self = this;

		this.interComm = interComm;

	}

	/*
	 * implement the interface
	 */
    ngOnInit() {
    }


	/*
	 * close the modal
	 */
	dismiss() {
		let data = { 'foo': 'bar' };
		this.viewCtrl.dismiss(data);
	}

}
