/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Dashboard service file
 */

/*
 * retrieve the required modules
 */
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Rx';


/*
 * define Dashboard service class
 */
@Injectable()
export class DashboardService {
	/*
	 * private members
	 */
	toggleSideNavbar:Subject<boolean> = new Subject();
}

