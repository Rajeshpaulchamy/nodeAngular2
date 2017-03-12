/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 11-Mar-2017  
 *     Dragger driective file
 */

/*
 * import directives
 */
import { Directive, ElementRef, TemplateRef, Input, OnInit, EmbeddedViewRef } from '@angular/core';
import {Component, ComponentFactoryResolver, ViewContainerRef} from '@angular/core';

import { OoraWidgetTable } from '../components/widgets/oorawidgettable.component';

/*
 * decorator for directive
 */
@Directive({ 
	selector: '[OoraDashboardWidgetContainer]'
})

/*
 * directive class
 */
export class OoraDashboardWidgetContainer implements OnInit {
	/*
	 * private elements
	 */
	el: ElementRef;

	/*
	 * custom dashboard options
	 */
	@Input() columns: number;
	@Input() enableFloat: boolean;
	@Input() rowHeight: string;

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
	widgetList: Array<string> = [];

	/*
	 * constructor
	 */
	constructor(el: ElementRef, 
				private componentFactoryResolver: ComponentFactoryResolver,
				private viewContainerRef: ViewContainerRef) {
		this.el = el;
	}

	openTableWidget(elem: any) {
		const factory = this.componentFactoryResolver.resolveComponentFactory(OoraWidgetTable);
		const ref = this.viewContainerRef.createComponent(factory);

		//ref.changeDetectorRef.detectChanges();
		const hostView = <EmbeddedViewRef<any>>ref.hostView;
	    $(elem).prepend(hostView.rootNodes[0]);
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
		elemnt: any, 
		widgetName: string, 
		widgetId: string, 
		saveResizeElement: any, 
		widgetHeader: string;

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

			/* 
			 * remove all classes which are 
			 * inherited from the dragger 
			 */
			$(item[i]).removeClass();

			/* 
			 * add the required class 
			 */
			$(item[i]).addClass("ui-draggable-handle grid-stack-item ui-draggable ui-resizable ui-resizable-autohide");

			/* 
			 * make the div empty
			 */
			saveResizeElement = $(item[i]).children('.ui-resizable-handle').detach();
			$(item[i]).html("");
			$(item[i]).append(saveResizeElement);

			/*
			 * get widget name
			 */
			widgetName = $(item[i]).attr("name");

			/* 
			 * generate the random ID 
			 */
			widgetId = widgetName + '_' + Math.floor(Math.random() * 26) + Date.now();

			/* 
			 * assign new id to the widget 
			 */
			$(item[i]).attr('id', widgetId);

			/* 
			 * save the widget id 
			 */
			this.widgetList.push(widgetId);

			widgetHeader = `
			<div class='page-header'>
			<div class='btn-toolbar pull-right'>
			<div class="btn-group">
			<a href="#" class="btn-space widget-settings-button"><span class="fa fa-cog"></span></a>
			<a href="#" class="btn-space widget-close-button"><span class="fa fa-close"></span></a>
			</div>
			</div>
			</div>					
			`;

			/* 
			 * create the widget 
			 */
			$(item[i]).append('<div class="widget-added grid-stack-item-content ui-draggable-handle"> ' 
							  + widgetHeader 
	 						  + '<div class="widget-holder">' + '</div>' 
							  + '</div>');

			/* remove widget when close button clicked */
			$('#' + widgetId + ' .widget-close-button')
			.on('click', 
				{ id: widgetId }, 
				this.deleteWidget.bind(this));
			
			this.openTableWidget($('#' + widgetId + ' .widget-holder')[0]);	
		}
	}

	deleteWidget(event: any) {
		var id = event.data.id;
		this.widgetHolder.removeWidget('#' + event.data.id);
	}

}


