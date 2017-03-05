/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 05-Mar-2017  
 *     Application main router file added
 */

/*
 * retrieve the required modules
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuardService } from '../../services/guards/index';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

/*
 * configure routes
 */
const routes: Routes = [
	{
		path: 'login',
		component: LoginComponent
	},

	{
		path: '',
		component: DashboardComponent,
		canActivate: [GuardService]
	},

	{
		path: '**',
		redirectTo: ''
	}
];

/*
 * module declaration
 */
@NgModule({
	/*
	 * other modules whose exported classes are needed by 
	 * component templates declared in this module.
	 */
	imports: [RouterModule.forRoot(routes)],

	/*
	 * export to other modules  
	 */
	exports: [RouterModule],

	/*
	 * creators of services that this module contributes 
	 * to the global collection of services; they become 
	 * accessible in all parts of the app.
	 */	
	providers: []
})

/*
 * class definition
 */
export class AppRoutingModule { }

