import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {RequestOptions, Request, RequestMethod} from '@angular/http';

/*
 * components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';

/*
 * services
 */
import { GuardService } from '../../services/guards/index';
import { AuthService } from '../../services/auth/index';
import { UserService } from '../../services/user/index';

/*
 * set request options
 *
var options = new RequestOptions({
	method: RequestMethod.Post,
	url: 'http://localhost:3000'
});
var req = new Request(options);
*/

/*
 * cofigure App module
 */
@NgModule({
	/*
	 * other modules whose exported classes are needed by 
	 * component templates declared in this module.
	 */
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,

	],

	/*
	 * the view classes that belong to this module
	 */
	declarations: [
		AppComponent,
		LoginComponent,
		DashboardComponent
	],


	/*
	 * creators of services that this module contributes 
	 * to the global collection of services; they become 
	 * accessible in all parts of the app.
	 */
	providers: [
	
		GuardService,
		AuthService,
		UserService
	],

	/*
	 * the main application view, called the root component, 
	 * that hosts all other app views. Only the root module 
	 * should set this bootstrap property.
	 */
	bootstrap: [AppComponent]
})

export class AppModule { }

