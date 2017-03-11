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
import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/*
 * decorator for directive
 */
@Directive({ selector: '[ooraDragToGrid]' })

/*
 * directive class
 */
export class OoraDragToGridDirective implements OnInit {
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
	 * constructor
	 */
	constructor(el: ElementRef) {
		this.el = el;
	}

	/*
	 * implement the interface
	 */
	ngOnInit() {
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
		 * first detach the children element
		 * and save it.
		 */
		this.widget = $(this.el.nativeElement).children().detach();

		/*
		 * create gridstack elements
		 */
		$('<div class="widget grid-stack-item">')
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

	/*
	 * Component views are initialized
	 */
	ngAfterViewInit() {

	}

	/*
	 * onStop
	 */
	onStop() {
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
		 * create gridstack elements
		 */
		$('<div class="widget grid-stack-item">')
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


