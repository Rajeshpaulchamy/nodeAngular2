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
import { ViewChild, Component, OnInit } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

/*
 * import service providers
 */
import { InterCommService } from '../../providers/intercomm';

/*
 * import view components
 */
import { OoraCustomDashboard } from '../../components/oora-custom-dashboard/oora-custom-dashboard';
import { OoraTable } from '../widgets/oora-table';
import { Settings } from '../settings/settings';

/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'content',

	/*
	 * template URL
	 */
	templateUrl: './content.html'
})


/*
 * define Component class
 */
export class Content implements OnInit {
	/*
	 * private members
	 */
	interComm: InterCommService;
	subscription: Subscription;
	widgetComponentsList = {
		"oora-table": {
			"component": OoraTable,
			"settings": Settings
		}
	};

	/*
	 * get directive
	 */
	@ViewChild(OoraCustomDashboard) custDashboard: OoraCustomDashboard;

	/*
	 * constructor
	 */
    constructor(interComm: InterCommService) { 
		var self = this;

		this.interComm = interComm;

		/*
		 * subscribe for save layout
		 */
		this.subscription = interComm.saveLayout.subscribe(function(value: boolean) {
			var layoutArr;

			layoutArr = self.custDashboard.getLayout();
			localStorage.setItem('layout', JSON.stringify(layoutArr));
		});

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
		var layoutArr: any;

		layoutArr = localStorage.getItem('layout');
		this.custDashboard.loadLayout(JSON.parse(layoutArr));
	}
}
