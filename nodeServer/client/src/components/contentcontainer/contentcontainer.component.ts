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
import { ViewChild, Component, ElementRef, OnInit } from '@angular/core';


/*
 * Component metadata
 */
@Component({
	/*
	 * selector 
	 */
	selector: 'dashboard-content',

	/*
	 * template URL
	 */
	templateUrl: './contentcontainer.html'
})


/*
 * define Component class
 */
export class ContentContainerComponent implements OnInit {
	/*
	 * private members
	 */

	/*
	 * custom dashboar options
	 */
	containerWidth = 12;
	floatOption = true;
	cellHeight = 60;
	widgetClass: string = ".widget";

	/*
	 * Query for a VIEW child of container
	 */
	@ViewChild('contentcontainer') container:ElementRef;

	/*
	 * widgets holder
	 */
	widgetHolder: any;

	/*
	 * constructor
	 */
    constructor() { 
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

		$(this.container.nativeElement).gridstack(
			{
				width: this.containerWidth,
				float: this.floatOption,
				cellHeight: this.cellHeight,
				acceptWidgets: '.widget'
			});

		this.widgetHolder = $(this.container.nativeElement).data('gridstack');


		/*
		 * init gridstack with hidden widget
		 * to increase the height of dropper container
		 * otherwise the dropper height is 0, so user can't drop widgets
		 */
		this.widgetHolder.addWidget($('<div><div class="grid-stack-item-content" style="display: none;" /><div/>'),  0, 9, 1, 1);

		/*
		 * init event handler for dropper container
		 */		
		$(this.container.nativeElement).on('drop', this.onDrop);
	}


	/*
	 * on drop event handler
	 *
	reInitWidgets (draggedElement: any) {
		$(_options.draggerContainerSelector).empty().off("*");
		$(_options.draggerContainerSelector).html(_draggerContainer);
		$(_options.draggerContainerSelector + " " + _options.widgetSelector).draggable(_dragOptions);

		_draggerContainer = $(_options.draggerContainerSelector).children().clone();
	}*/

	/*
	 * on drop event handler
	 */
	onDrop (event: any, ui:any) {
		var item: any, 
		i: number, 
		elemnt: any, 
		obj: any = {}, 
			widgetId: string, 
		saveResizeElement: any, 
		header: string;

		/* get the list of items present in 'dropper' area */
		item = $(event.currentTarget).find(".widget");

		/* loop and find the newly dropped widget */
		for(i = 0; i < item.length; i++) {

			/* ignore the previously dropped widgets */
			elemnt = $(item[i]).children(".widget-added").length;
			if(elemnt) {
				/* do nothing */
			} else {

				/* found the newly dropped widget */

				/* fill some default values */
				obj.template = '<p> No call back function specified in the options </p>';
				obj.callback = function() {};

				/* call the widget callback to get the tempalte and other data */
				/*if(_options.callbackOnDrop) {
					obj = _options.callbackOnDrop($(item[i]).attr("name"));						
				}*/

				/* remove all classes which inherited from the dragger */
				$(item[i]).removeClass();
				/* add the required class */
				$(item[i]).addClass("ui-draggable-handle grid-stack-item ui-draggable ui-resizable ui-resizable-autohide");
				/* make the div empty*/
				saveResizeElement = $(item[i]).children('.ui-resizable-handle').detach();
				$(item[i]).html("");
				$(item[i]).append(saveResizeElement);

				/* generate the random ID */
				widgetId = $(item[i]).attr("name") + '_' + Math.floor(Math.random() * 26) + Date.now();
				/* assign new id to the widget */
				$(item[i]).attr('id', widgetId);

				/* save the widget id */
				//_widgetsList.push(widgetId);

				header = `
				<div class='page-header'>
				<div class='btn-toolbar pull-right'>
				<div class="btn-group">
				<a href="#" class="btn-space widget-settings-button"><span class="fa fa-cog"></span></a>
				<a href="#" class="btn-space widget-close-button"><span class="fa fa-close"></span></a>
				</div>
				</div>
				</div>					
				`;

				/* add the required divs */
				$(item[i]).append('<div class="widget-added grid-stack-item-content ui-draggable-handle"> ' + header + obj.template + '</div>');


				/* make the widget */
				/*_dropperContainer.makeWidget('#' + widgetId);*/

				/* assign event handlers */
				if(obj.onSettings) {
					$('#' + widgetId + ' .widget-settings-button').on('click', obj.onSettings);
				}
				if(obj.onClose) {
					$('#' + widgetId + ' .widget-close-button').on('click', obj.onClose);
				}

				/* remove widget when close button clicked */
				$('#' + widgetId + ' .widget-close-button').on('click', { id: widgetId }, function(event: any) {
					this.widgetHolder.removeWidget('#' + event.data.id);
				});

				/* call the callback */
				if(obj.callback) {
					obj.callback(widgetId);
				};
			}
		}

		/*
		 * again re-configure widgets with draggable options
		 */
		setTimeout(function() {
			//this.reInitWidgets(ui.draggable[0]);
		}, 100);
	}

}
