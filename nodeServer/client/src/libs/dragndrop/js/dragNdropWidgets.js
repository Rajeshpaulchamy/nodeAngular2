
var dragNdropWidgets = function(options) {
	/**
	 * holds the options object
	 */
	var _options = options;	

	/**
	 * drag options
	 */
	var _dragOptions = {
		helper: 'clone',
		appendTo: 'body',

		revert: 'invalid',
		handle: '.grid-stack-item-content',
		scroll: false
	};

	/**
	 * drop options
	 */
	var _dropOptions = {
		width: _options.dropperColumns,
		float: true,
		cellHeight: 'auto',
		acceptWidgets: '.widget'
	};

	/**
	 * dragger container
	 */
	var _draggerContainer = undefined;

	/**
	 * drop options
	 */
	var _dropperContainer = undefined;

	/**
	 * drop options
	 */
	var _widgetsList = [];

	/**
	 * init drag property for widgets
	 */
	var _initWidgets = function() {
		/*
		 * backup widgets
		 */
		 _draggerContainer = $(_options.draggerContainerSelector).children().clone();

		$(_options.widgetSelector).draggable(_dragOptions);
	};

	/**
	 * Re-init drag property for widgets
	 */
	var _reInitWidgets = function(draggedElement) {
		/*$(_options.draggerContainerSelector).append($(draggedElement).clone(true));
		$(_options.draggerContainerSelector + " > #" + draggedElement.id).draggable(_dragOptions);*/
		$(_options.draggerContainerSelector).empty().off("*");
		$(_options.draggerContainerSelector).html(_draggerContainer);
		$(_options.draggerContainerSelector + " " + _options.widgetSelector).draggable(_dragOptions);

		_draggerContainer = $(_options.draggerContainerSelector).children().clone();
	};

	/**
	 * Remove widget
	 */
	var _removeWidget = function(event) {
		var id = event.data.id;
		_dropperContainer.removeWidget('#' + id);

		/* remove from widget list */
		_widgetsList = $.grep(_widgetsList, function(value) {
  			return value != id;
		});
	};

	/**
	 * init drag property for drop container
	 */
	var _initDragger = function() {
		_initWidgets();
	};

	/**
	 * init drop property for drop container
	 */
	var _initDropper = function() {

		/*
		 * init gridstack
		 */
		$(_options.dropperContainerSelector).gridstack(_dropOptions);
		_dropperContainer = $(_options.dropperContainerSelector).data('gridstack');

		/*
		 * init gridstack with hidden widget
		 * to increase the height of the dropper container
		 * otherwise the dropper height is 0, so user can't drop widgets
		 */
		_dropperContainer.addWidget($('<div><div class="grid-stack-item-content" style="display: none;" /><div/>'),  0, 4, 1, 1);

		/*
		 * init event handler for dropper container
		 */		
		$(_options.dropperContainerSelector).on('drop', _onDrop);
	};

	/**
	 * on 'drop' event
	 */
	var _onDrop = function(event, ui) {
			var item, i, elemnt, obj = {}, widgetId, saveResizeElement, header;

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
					if(_options.callbackOnDrop) {
						obj = _options.callbackOnDrop($(item[i]).attr("name"));						
					}

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
					_widgetsList.push(widgetId);
					
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
					$('#' + widgetId + ' .widget-close-button').on('click', { id: widgetId }, _removeWidget);

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
				_reInitWidgets(ui.draggable[0]);
			}, 100);
	};

	/**
	 * init
	 */
	this.init = function(){
	};

	/**
	 * Destructor
	 * @param {} 
	 */	
	this.leave = function () {

	};
	
	/**
	 * Constructor
	 * @param {} 
	 */
	_initialize = function () {
		/* initialization */

		/*
		 * init dragger
		 */
		_initDragger();

		/*
		 * init dropper
		 */
		_initDropper();
		
	};	
	_initialize.apply(this);
	
} 
