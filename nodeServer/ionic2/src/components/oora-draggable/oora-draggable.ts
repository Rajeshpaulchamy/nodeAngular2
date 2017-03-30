/**
 * OORA Software Solutions India Pvt.Ltd, Srivilliputtur - India.
 * 
 * Copyright (c) 2017. OORA Software Solutions India Private Limited.
 * All Rights Reserved.
 *
 * Revision number:
 * ******************
 * Rev.01 : 11-Mar-2017  
 *     OORA Draggable driective file
 */

/*
 * import directives
 */
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/*
 * typings for jquery
 */
declare var $;

/*
 * decorator for directive
 */
@Directive({
  selector: '[oora-draggable]' // Attribute selector
})

/*
 * directive class
 */
export class OoraDraggable implements OnInit {
	/*
	 * private elements
	 */
	el: ElementRef;
	options = {
		helper: 'clone',
		appendTo: 'body',
		revert: 'invalid',
		handle: '.grid-stack-item-content',
		scroll: false,
		stop: this.onStop.bind(this)
	};
	widget: any;

	/*
	 * directive name
	 */
	@Input() name: string;

	/*
	 * constructor
	 */
	constructor(el: ElementRef) {
		this.el = el;
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

		this.createWidget();
	}

	/*
	 * onStop
	 */
	onStop() {
		this.createWidget();
	}

	/*
	 * create widget
	 */
	createWidget() {
		var element = $(this.el.nativeElement).find('.grid-stack-item');
		if(element.length === 0) {
			/*
			 * continue
			 */
		} else {
			/*
			 * nothing to do
			 */
			return;
		}

		/*
		 * backup the widget
		 */
		if(this.widget) {
			/*
			 * do nothing
			 */
		} else {
			/*
			 * first detach the children element
			 * and save it.
			 */
			this.widget = $(this.el.nativeElement).children().detach();
		}

		if(this.el.nativeElement.outerHTML.toLowerCase().indexOf("oora-draggable") >= 0){
			/*
			 * ok continue
			 */
		} else {

			/*
			 * something wrong
			 */
			return;
		}

		/*
		 * create gridstack elements
		 */
		$('<div class="widget grid-stack-item" name="' + this.name + '">')
		.append('<div class="grid-stack-item-content">')
		.appendTo(this.el.nativeElement);

		/*
		 * now move inside grid-stack-item-content
		 */
		$(this.el.nativeElement).find('.grid-stack-item-content').append(this.widget);


		/*
		 * add dragger support
		 */
		$($(this.el.nativeElement).find('.grid-stack-item')).draggable(this.options);
	}

}

