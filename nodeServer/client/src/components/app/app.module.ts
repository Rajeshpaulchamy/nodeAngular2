import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
/*
 * Angular2 Material Design
 */
import { MaterialModule } from '@angular/material';
import 'hammerjs';

/*
 * directives
 */
import { OoraWidget } from '../../directives/oorawidget.directive';
import { OoraWidgetContainer } from '../../directives/oorawidgetcontainer.directive';


/*
 * components
 */
import { AppComponent } from './app.component';
import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from '../header/header.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { WidgetsComponent } from '../widgets/widgets.component';
import { OoraTable } from '../widgets/ooratable.component';
import { ContentContainerComponent } from '../contentcontainer/contentcontainer.component';

/*
 * services
 */
import { GuardService } from '../../services/guards/index';
import { AuthService } from '../../services/auth/index';
import { UserService } from '../../services/user/index';
import { SidenavService } from '../../services/sidenav/index';

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
		MaterialModule
	],

	/*
	 * the view classes that belong to this module
	 */
	declarations: [
		OoraWidget,
		OoraWidgetContainer,
		AppComponent,
		LoginComponent,
		DashboardComponent,
		HeaderComponent,
		SidenavComponent,
		WidgetsComponent,
		OoraTable,
		ContentContainerComponent
	],


	/*
	 * entry components
	 */
	entryComponents: [
		OoraTable
	],

	/*
	 * creators of services that this module contributes 
	 * to the global collection of services; they become 
	 * accessible in all parts of the app.
	 */
	providers: [
	
		GuardService,
		AuthService,
		UserService,
		SidenavService
	],

	/*
	 * the main application view, called the root component, 
	 * that hosts all other app views. Only the root module 
	 * should set this bootstrap property.
	 */
	bootstrap: [AppComponent]
})

export class AppModule { }

