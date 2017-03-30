/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Inter commnunication service file
 */

/*
 * retrieve the required modules
 */
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Rx';

/*
 * define class
 */
@Injectable()
export class InterCommService {
	/*
	 * private members
	 */

	/*
	 * save the custom dashboard layout
	 */
	saveLayout:Subject<boolean> = new Subject();

	/*
	 * open the settings menu bar
	 */
	openSettings:Subject<boolean> = new Subject();
}

