/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 11-Mar-2017  
 *     OORA Custom Dashboard driective file
 */

/*
 * import directives
 */
import { Directive, ElementRef, Input, OnInit, EmbeddedViewRef } from '@angular/core';
import { ComponentFactoryResolver, ViewContainerRef, Type} from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';
import { ModalController, NavController } from 'ionic-angular';

/*
 * import service providers
 */
import { InterCommService } from '../../providers/intercomm';

/*
 * import view directives
 */


/*
 * typings for jquery
 */
declare var $;


/*
 * decorator for directive
 */
@Directive({ 
	selector: '[oora-custom-dashboard]'
})

/*
 * directive class
 */
export class OoraCustomDashboard implements OnInit {
	/*
	 * private elements
	 */
	el: ElementRef;
	interComm: InterCommService;
	subscription: Subscription;
	navCtrl: NavController;

	/*
	 * custom dashboard options
	 */
	@Input() columns: number;
	@Input() enableFloat: boolean;
	@Input() rowHeight: string;
	@Input() widgetComponents: any;

	/*
	 * widget class
	 */
	widgetClass: string = ".widget";

	/*
	 * widgets holder
	 */
	widgetHolder: any;

	/*
	 * widget list
	 */
	widgetList: any = {};

	/*
	 * constructor
	 */
	constructor(el: ElementRef, 
				interComm: InterCommService,
				navCtrl: NavController,
				public modalCtrl: ModalController,
				private componentFactoryResolver: ComponentFactoryResolver,
				private viewContainerRef: ViewContainerRef) {

		this.el = el;
		this.interComm = interComm;
	}

	/*
	 * implement the interface
	 */
	ngOnInit() {

		var cssClasses = "grid-stack grid-stack-" + this.columns;
		$(this.el.nativeElement).addClass(cssClasses);
	}

	/*
	 * Component views are initialized
	 */
	ngAfterViewInit() {

		$(this.el.nativeElement).gridstack(
			{
				width: this.columns,
				float: this.enableFloat,
				cellHeight: this.rowHeight,
				acceptWidgets: '.widget'
			});

		this.widgetHolder = $(this.el.nativeElement).data('gridstack');


		/*
		 * init gridstack with hidden widget
		 * to increase the height of dropper container
		 * otherwise the dropper height is 0, so user can't drop widgets
		 */
		this.widgetHolder.addWidget($('<div><div class="grid-stack-item-content" style="display: none;" /><div/>'),  0, 9, 1, 1);

		/*
		 * init event handler for dropper container
		 */		
		$(this.el.nativeElement).on('drop', this.onDrop.bind(this));

	}

	/*
	 * onDrop event
	 */
	onDrop(event: any, ui:any) {
		var item: any, 
		i: number, 
		elemnt: any; 

		/* 
		 * get the list of items present in 'dropper' area 
		 */
		item = $(event.currentTarget).find(".widget");

		/* 
		 * loop and find the newly dropped widget 
		 */
		for(i = 0; i < item.length; i++) {

			/* 
			 * ignore the previously dropped widgets 
			 */
			elemnt = $(item[i]).children(".widget-added").length;
			if(elemnt) {
				/* 
				 * just continue the loop 
				 */
				continue;
			}

			/* 
			 * found the newly dropped widget 
			 */
			this.addWidget(item[i], undefined);
			
		}
	}

	/*
	 * open widget settings
	 */
	openWidgetSettings(event: any) {
		var id = event.data.id;

		/*
		 * notify to widget
		 */
		if(this.widgetList[id]) {
			let widget = this.widgetList[id];
			let settings = undefined;

			settings = this.widgetComponents[widget.widgetName].settings;

			if(settings == undefined) {
				return;
			}

			/*
			 * create the modal
			 */
			let modal = this.modalCtrl.create(settings, null, {
				showBackdrop: false,
				enableBackdropDismiss: false
			});
			/*
			 * open the modal
			 */
			modal.present(modal);

			/*
			 * modal on close
			 */
			modal.onDidDismiss(data => {
				widget.widget.onSettingsClose(data);
			});
	
		} else {
			console.error("Not a valid widget");
		}
	}


	/*
	 * delete widget
	 */
	deleteWidget(event: any) {
		var id = event.data.id;

		/*
		 * notify to widget
		 */
		if(this.widgetList[id]) {
			this.widgetList[id].closeWidget();
			delete this.widgetList[id];
			console.log("Widget removed");
		} else {
			console.error("Not a valid widget");
		}

		this.widgetHolder.removeWidget('#' + id);
	}

	/*
	 * add widget
	 */
	addWidget(item: any, widgetId: any) {
		var widgetName: string, 
		widget: any,
		saveResizeElement: any, 
		widgetHeader: string;

		/* 
		 * remove all classes which are 
		 * inherited from the dragger 
		 */
		$(item).removeClass();

		/* 
		 * add the required class 
		 */
		$(item).addClass("ui-draggable-handle grid-stack-item ui-draggable ui-resizable ui-resizable-autohide");

		/* 
		 * make the div empty
		 */
		saveResizeElement = $(item).children('.ui-resizable-handle').detach();
		$(item).html("");
		$(item).append(saveResizeElement);

		/*
		 * get widget name
		 */
		widgetName = $(item).attr("name");

		/* 
		 * generate the random ID 
		 */
		if(widgetId) {
			/*
			 * do nothing
			 */
		} else {
			widgetId = widgetName + '_' + Math.floor(Math.random() * 26) + Date.now();
		}

		/* 
		 * assign new id to the widget 
		 */
		$(item).attr('id', widgetId);

		widgetHeader = `
			<div class='page-header'>
			<div class='btn-toolbar pull-right'>
			<div class="btn-group">
			<a href="#" class="btn-space widget-settings-button"><span class="fa fa-cog"></span></a>
			<a href="#" (click)="widget.closeWidget()" class="btn-space widget-close-button"><span class="fa fa-close"></span></a>
			</div>
			</div>
			</div>					
			`;

		/* 
		 * create the widget 
		 */
		$(item).append('<div class="widget-added grid-stack-item-content ui-draggable-handle"> ' 
				+ widgetHeader 
				+ '<div class="widget-holder">' + '</div>' 
				+ '</div>');

		widget = this.addComponentWidget(widgetName, 
				$('#' + widgetId + ' .widget-holder')[0], widgetId);	

		/* 
		 * save the widget with widgetId and instance 
		 */
		this.widgetList[widgetId] = widget;

		/* 
		 * open settings window 
		 */
		$('#' + widgetId + ' .widget-settings-button')
			.on('click', 
					{ id: widgetId }, 
					this.openWidgetSettings.bind(this));


		/* 
		 * remove widget when close button clicked 
		 */
		$('#' + widgetId + ' .widget-close-button')
			.on('click', 
					{ id: widgetId }, 
					this.deleteWidget.bind(this));
	}

	/*
	 * add widget based on widget name
	 */
	addComponentWidget (widgetName: string, elem: any, widgetId: string): any {

		let component = this.widgetComponents[widgetName].component;
		let widget = this.addComponent(component, elem, widgetId);
		return { 
			"widgetName": widgetName,
			"widget": widget
		};

		/*switch(widgetName) {

			case "oora-table": {
				let widget = this.addComponent(OoraTable, elem, widgetId);
				return { 
					"widgetName": widgetName,
					"widget": widget
				};
			}
		}*/
	}

	/*
	 * add dynamic component for the widget
	 */
	addComponent(component: Type<any>, elem: any, id: string): any {
		const factory = this.componentFactoryResolver.resolveComponentFactory(component);
		const ref = this.viewContainerRef.createComponent(factory);

		ref.instance.widgetId = id;
		const hostView = <EmbeddedViewRef<any>>ref.hostView;
	    $(elem).prepend(hostView.rootNodes[0]);
		ref.changeDetectorRef.detectChanges();

		return ref.instance;
	}

	/*
	 * get widget layout
	 */
	getLayout(): any {
		var arr = [],
			key,
			widget,
			elemnt,
			data;

		/*
		 * loop all widgets
		 */
		for (key in this.widgetList) {
			if (this.widgetList.hasOwnProperty(key)) {
				elemnt = $('#' + key);	
				data = elemnt.data('_gridstack_node');
				widget = key.split('_')[0];
				arr.push({
					id: key,
					widget: widget,
					x: data.x,
					y: data.y,
					width: data.width,
					height: data.height
				});
			}
		}

		return arr;
	}

	/*
	 * load layout
	 */
	loadLayout(layoutArr: any) {
		var i = 0,
			widget: any;

		/*
		 * validity check
		 */
		if(layoutArr && layoutArr.length > 0) {
			/*
			 * do nothing
			 */
		} else {
			return;
		}

		for(i = 0; i < layoutArr.length; i++) {
			widget = this.widgetHolder.addWidget(
				$('<div><div class="grid-stack-item-content" style="background: green;"/><div/>'),  
				layoutArr[i].x, 
				layoutArr[i].y, 
				layoutArr[i].width, 
				layoutArr[i].height,
				false,
				undefined,
				undefined,
				undefined,
				undefined,
				layoutArr[i].id);

			/*
			 * add widget
			 */
			$(widget).attr("id", layoutArr[i].id);
			$(widget).attr("name", layoutArr[i].widget);
			this.addWidget(widget, layoutArr[i].id);
		}
	}
}


