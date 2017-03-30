import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

/*
 * directive components
 */
import { OoraDraggable } from '../components/oora-draggable/oora-draggable';
import { OoraCustomDashboard } from '../components/oora-custom-dashboard/oora-custom-dashboard';

/*
 * service providers
 */
import { AuthService } from '../providers/auth';
import { InterCommService } from '../providers/intercomm';

/*
 * view components
 */
import { MyApp } from './app.component';
import { Header } from '../pages/header/header';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Content } from '../pages/content/content';
import { WidgetHolder } from '../pages/widgetholder/widgetholder';
import { OoraTable } from '../pages/widgets/oora-table';
import { Login } from '../pages/login/login';
import { Settings } from '../pages/settings/settings';

@NgModule({
	declarations: [
		OoraDraggable,
		OoraCustomDashboard,
		MyApp,
		Header,
		Dashboard,
		Content,
		OoraTable,
		WidgetHolder,
		Settings,
		Login
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		Header,
		Dashboard,
		Content,
		OoraTable,
		WidgetHolder,
		Settings,
		Login
	],
	providers: [
		{
			provide: ErrorHandler, 
			useClass: IonicErrorHandler
		},
		InterCommService,
		AuthService
	]
})
export class AppModule {}

