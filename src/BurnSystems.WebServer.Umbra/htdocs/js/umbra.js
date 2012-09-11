"use strict";

define(function()
{	
	///////////////////////////////////////////
	// Definition of ViewType-Class 
	var ViewTypeClass = function(token, initFunction)
	{
		this.token = token;
		this.init = initFunction;
	};

	ViewTypeClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of View-Class 
	var ViewClass = function(title, token, content)
	{	
		if (title === undefined)
		{
			title = "Unnamed";
		}

		if (content === undefined)
		{
			content = "No content";
		}

		this.title = title;
		this.token = token;
		this.content = content;

		ViewClass.viewCounter++;
		this.name = "view_" + ViewClass.viewCounter;
		
		this.content = this.content;

		this.isVisible = false;
		this.areaAttached = undefined;
	};

	ViewClass.viewCounter = 0;

	ViewClass.prototype = 
	{
	};
	
	///////////////////////////////////////////
	// Definition of ViewPoint-Class 
	var ViewPointClass = function(view, domRegisterTab)
	{
		this.view = view;
		this.domRegisterTab = domRegisterTab;
		this.domContent = {};
	};

	ViewPointClass.prototype = 
	{
		getView: function()
		{
			return this.view;
		}
	};

	ViewPointClass.lastDomId = 1;

	///////////////////////////////////////////
	// Definition of Ribbonbar class	
	var RibbonBarClass = function()
	{
		this.height = 128;
	};

	RibbonBarClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of RibbonElement class	
	var RibbonElementClass = function()
	{
	};

	RibbonElementClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of RibbonButton class	
	var RibbonButtonClass = function()
	{
	};

	RibbonButtonClass.prototype = new RibbonElementClass();

	///////////////////////////////////////////
	// Definition of RibbonGroup class	
	var RibbonGroupClass = function()
	{
	};

	RibbonGroupClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of RibbonGroup class	
	var RibbonTabClass = function()
	{
	};

	RibbonTabClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of Area class	
	// @name Name of the DOM element where area has been created
	// @token Name of the Area within the workspace
	var AreaClass = function(domName, token)
	{
		this.width = 0;
		this.height = 0;
		this.name = domName;
		this.token = token;

		// Stores the list of views
		this.viewPoints = [];
		this.activeViewPoint = undefined;
	};

	AreaClass.prototype = 
	{
		// Adds a view to area and 
		addView: function(view)
		{
			var domTabContent = this.addTabForView(view);
			
			var viewPoint = new ViewPointClass(view, domTabContent);
			this.viewPoints.push(viewPoint);
			viewPoint.area = this;

			view.isVisible = false;
			view.areaAttached = this;
			
			var targetDomContent = $("#" + this.name + " .content");
			ViewPointClass.lastDomId++;
			viewPoint.domContent = $('<div id="viewpoint_' + ViewPointClass.lastDomId + '"></div>');
			viewPoint.domContent.html(view.content)
			viewPoint.domContent.hide();

			targetDomContent.append(viewPoint.domContent);

			return viewPoint;
		},

		// Focuses a view, so content is shown in the area window
		focusView: function(view)
		{
			var targetDomContent = $("#" + this.name + " .content");

			// Deactivate old view
			if(this.activeViewPoint !== undefined)
			{
				this.activeViewPoint.getView().isVisible = false;
				this.activeViewPoint.domContent.hide();
				this.activeViewPoint.domRegisterTab.removeClass("selected");
			}

			// Activate new view
			var viewPoint = this.findViewPoint(view);
			if(viewPoint === undefined)
			{
				alert('View is not within this area');
				return;
			}

			this.activeViewPoint = viewPoint;
			view.isVisible = true;
			this.activeViewPoint.domContent.show();
			viewPoint.domRegisterTab.addClass("selected");

			this.updateLayout();
		},

		// Removes a certain view from area
		removeView: function(view)
		{
			var foundViewIndex = -1;
			
			for(var i in this.viewPoints)
			{
				if(this.viewPoints[i].getView() === view)
				{
					foundViewIndex = i;
				}
			}

			if (foundViewIndex === -1)
			{
				alert('View not found in viewPoint');
			}

			var viewPoint = this.viewPoints[foundViewIndex];
			var domAreaContent = $("#" + this.name + " .content");
			var domTabs = $("#" + this.name + " .tabs");
			var domTab = $("#" + view.name + "_tab");

			// Remove from viewpoints
			this.viewPoints.splice(i, 1);

			// Removes domtab
			domTabs.remove(domTab);

			 // Remove from content
			 domAreaContent.remove(viewPoint.domContent);
		},

		// Adds DOM for tab in view, adds it to area and returns DOM of tab.
		addTabForView: function(view)
		{
			var title = view.title;
			var domTabContent = $('<div class="tab" id="' + view.name + "_tab" + '"><a id="' + view.name + "_tab_a" + '">...</a><span id="' + view.name + "_tab_c" + '" class="closed">X</span></div>');
			$("#" + this.name + " .tabs").append(domTabContent);
			$("#" + view.name + "_tab_a").text(view.title);

			var _this = this;
			$("#" + view.name + "_tab_a").click(function()
			{
				_this.focusView(view);
			});

			$("#" + view.name + "_tab_c").click(function()
			{
				_this.removeView(view);
			});

			return domTabContent;
		},

		getViewPoints: function()
		{
			return this.viewPoints;
		},

		getViews: function()
		{
			var result = [];
			for(var i in this.viewPoints)
			{
				result[i] = this.viewPoints[i].getView();
			}

			return result;
		},

		findViewPoint: function(view)
		{
			for(var i in this.viewPoints)
			{
				if(this.viewPoints[i].getView() === view)
				{
					return this.viewPoints[i];
				}
			}
		},

		updateLayout: function()
		{
			var domArea = $("#" + this.name);
			var domContent = $("#" + this.name + " .content");
			var domTab = $("#" + this.name + " .tabs");

			var totalHeight = domArea.height();
			totalHeight -= domTab.height();

			domContent.height(totalHeight);
		}
	};
	
	///////////////////////////////////////////
	// Definition of Dragbar class	
	var DragBarClass = function(direction, domElement, dragEvent)
	{
		this.isHorizontal = direction === "h";
		this.isVertical = direction === "v";
		this.domElement = domElement;
		this.dragEvent = dragEvent;

		this.lastX = 0;
		this.lastY = 0;
		this.isMouseDown = false;

		var _this = this;
		domElement.mousedown(
			function(data)
			{
				if(data.which == 1)
				{
					_this.lastX = data.pageX;
					_this.lastY = data.pageY;
					_this.isMouseDown = true;

					data.preventDefault();
					data.stopPropagation();
				}
			});
			
		$(document).mousemove(
			function(data)
			{
				if(_this.isMouseDown)
				{
					// Change
					var changeX = _this.lastX - data.pageX;
					var changeY = _this.lastY - data.pageY;

					var realChange = 0;
					if (_this.isVertical)
					{
						realChange = changeX;
					}

					if (_this.isHorizontal)
					{
						realChange = changeY;
					}
					
					dragEvent(this, realChange);

					_this.lastX = data.pageX;
					_this.lastY = data.pageY;
					
					data.preventDefault();
					data.stopPropagation();
				}
			});

		$(document).mouseup(
			function(data)
			{ 
				if(data.which == 1 && _this.isMouseDown)
				{
					_this.isMouseDown = false;
					
					data.preventDefault();
					data.stopPropagation();
				}
			});

	};

	DragBarClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of WorkSpace class	
	var WorkspaceClass = function()
	{
		this.domPrefix = "ws" + WorkspaceClass.nextDomPrefix + "_";
		this.ribbonBar = new RibbonBarClass();
		this.areaTop = new AreaClass(this.domPrefix + "t", "top");
		this.areaTop.height = 100;
		this.areaLeft = new AreaClass(this.domPrefix + "l", "left");
		this.areaLeft.width = 200;
		this.areaRight = new AreaClass(this.domPrefix + "r", "right");
		this.areaRight.width = 200;
		this.areaBottom = new AreaClass(this.domPrefix + "b", "bottom");
		this.areaBottom.height = 200
		this.areaCentered = new AreaClass(this.domPrefix + "c", "centered");
		WorkspaceClass.nextDomPrefix++;
	};

	WorkspaceClass.nextDomPrefix = 0;
	WorkspaceClass.dragWidth = 5;
	WorkspaceClass.dragHeight = 5;

	WorkspaceClass.prototype = 
	{
		/* Creates the DOM elements for the workspace */
		create: function(domElement)
		{
			var innerAreaHtml = '<div class="tabs"></div><div class="content"></div>';

			var buttonBarDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'buttons" class="umbra_buttons">Buttons</div></div>');
			var topDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 't" class="umbra_top umbra_area">' + innerAreaHtml + '</div></div>');
			var scrollTopDom = '<div id="' + this.domPrefix + 'dt" class="umbra_dragarea horizontal"></div>';
			var centeredDom = $('<div class="fullwidth fullheight" id="' + this.domPrefix + 'center">' + 
					'<div id="' + this.domPrefix + 'l" class="umbra_left umbra_area">' + innerAreaHtml + '</div>' +
					'<div id="' + this.domPrefix + 'dl" class="umbra_dragarea vertical"></div>' +
					'<div id="' + this.domPrefix + 'c" class="umbra_centered umbra_area">' + innerAreaHtml + '</div>' +				
					'<div id="' + this.domPrefix + 'dr" class="umbra_dragarea vertical"></div>' +
					'<div id="' + this.domPrefix + 'r" class="umbra_right umbra_area">' + innerAreaHtml + '</div>' + 			
				'</div>');
			var scrollBottomDom = '<div id="' + this.domPrefix + 'db" class="umbra_dragarea horizontal"></div>';
			var bottomDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'b" class="umbra_bottom umbra_area">' + innerAreaHtml + '</div></div>');

			domElement.append(buttonBarDom);
			domElement.append(topDom);
			domElement.append(scrollTopDom);
			domElement.append(centeredDom);
			domElement.append(scrollBottomDom);
			domElement.append(bottomDom);

			this.updateLayout();
			
			this.makeAreasDraggable();
			var _this = this;

			// Event for resizing
			$(window).resize(function()
			{
				_this.updateLayout();
			});

			$("#");
		},
		
		makeAreasDraggable: function()
		{
			var _this = this;
			// Sets the dragbar information
			var topDragBar = new DragBarClass(
				"h", 
				$("#" + this.domPrefix + "dt"), 
				function(dragBar, change)
				{
					_this.areaTop.height -= change;
					_this.updateLayout();
				});

			// Sets the dragbar information
			var bottomDragBar = new DragBarClass(
				"h", 
				$("#" + this.domPrefix + "db"), 
				function(dragBar, change)
				{
					_this.areaBottom.height += change;
					_this.updateLayout();
				});

			// Sets the dragbar information
			var leftDragBar = new DragBarClass(
				"v", 
				$("#" + this.domPrefix + "dl"), 
				function(dragBar, change)
				{
					_this.areaLeft.width -= change;
					_this.updateLayout();
				});

			// Sets the dragbar information
			var rightDragBar = new DragBarClass(
				"v", 
				$("#" + this.domPrefix + "dr"), 
				function(dragBar, change)
				{
					_this.areaRight.width += change;
					_this.updateLayout();
				});
		},

		updateLayout: function()
		{
			var restHeight = this.areaTop.height + this.areaBottom.height + this.ribbonBar.height + 10;
			var height = $("body").height();
			var width = $("body").width();

			// Set height of center area
			var centerHeight = height - restHeight - 2 * WorkspaceClass.dragHeight;
			$("#" + this.domPrefix + "c").css("height", (centerHeight) + "px");
			$("#" + this.domPrefix + "center").css("height", (centerHeight) + "px");
			$("#" + this.domPrefix + "l").css("height", (centerHeight) + "px");			
			$("#" + this.domPrefix + "r").css("height", (centerHeight) + "px");	
			$("#" + this.domPrefix + "dl").css("height", (centerHeight) + "px");	
			$("#" + this.domPrefix + "dr").css("height", (centerHeight) + "px");
			
			// Set height of bottom, top and buttons
			$("#" + this.domPrefix + "buttons").css("height", this.ribbonBar.height + "px");
			$("#" + this.domPrefix + "t").css("height", this.areaTop.height + "px");
			$("#" + this.domPrefix + "b").css("height", this.areaBottom.height + "px");

			// Set width and align right to right border
			$("#" + this.domPrefix + "l").css("width", this.areaLeft.width + "px");
			$("#" + this.domPrefix + "r").css("width", this.areaRight.width + "px");
			$("#" + this.domPrefix + "r").css("margin-left", (width - this.areaRight.width) + "px");

			// Position center center and dragging lines
			$("#" + this.domPrefix + "dl").css("left", (this.areaLeft.width) + "px");			
			$("#" + this.domPrefix + "c").css("left", (this.areaLeft.width + WorkspaceClass.dragWidth) + "px");
			$("#" + this.domPrefix + "c").css("width", (width - this.areaRight.width - this.areaLeft.width - WorkspaceClass.dragWidth * 2) + "px");		
			$("#" + this.domPrefix + "dr").css("left", (width - this.areaRight.width - WorkspaceClass.dragWidth) + "px");	

			// We have finished the layout for the areas, 
			// now we have to update the height of the content region
			var areas = this.getAreas();
			for(var i in areas)
			{
				areas[i].updateLayout();
			}
		},

		// Gets an area with all areas
		getAreas: function()
		{
			var result = [
				this.areaTop,
				this.areaLeft,
				this.areaRight, 
				this.areaCentered ];
			return result;
		},

		// Finds the area
		// @token Token of the area
		findArea: function(token)
		{
			var areas = this.getAreas();
			for(var i in areas)
			{
				if(areas[i].token == token)
				{
					return areas[i];
				}
			}
		},

		// Finds the view and the area and returns it
		// @token Token of the view
		findAreaAndView: function(token)
		{
			var areas = this.getAreas();
			for(var i in areas)
			{
				var area = areas[i];
				var viewPoints = area.getViewPoints();
				for(var j in viewPoints)
				{
					var viewPoint = viewPoints[j];
					if(viewPoint.getView().token === token)
					{
						var result = 
						{
							viewPoint: viewPoint,
							view: viewPoint.getView(),
							area: area
						};

						return result;
					}
				}
			}

			return undefined;
		},

		findView: function(token)
		{
			var areaAndView = this.findAreaAndView(token);
			if(areaAndView === undefined)
			{
				return undefined;
			}

			return areaAndView.view;
		},

		/// Loads the umbra content from the url and shows it in the given area.
		/// The url shall return a json data structure with commands
		/// @url Url, where content shall be retrieved
		/// @areaToken Token of area, where content shall be shown
		loadContent: function(url, areaToken, settings)
		{
			if(settings === undefined)
			{
				settings = {};
			}

			var _this = this;
			$.ajax(
				url)
				.success(function(data)
				{
					_this.evaluateRequest(data, areaToken, settings);
				});
		},

		evaluateRequest: function(data, areaToken, settings)
		{
			var _this = this;
			var area = this.findArea(areaToken);
			var view, viewPoint;
			if (area === undefined)
			{
				alert('Unknown Area: ' + areaToken);
				return;
			}

			var content = data["Content"];
			var title = data["Title"];
			if (content !== undefined)
			{
				view = new ViewClass(title, settings.viewToken, content);
				viewPoint = area.addView(view);
			}

			if(settings.success !== undefined)
			{
				settings.success(area, view);
			}

			if(data.ScriptFiles.length > 0 && data.ViewTypeToken !== undefined && data.viewTypeToken !== "")
			{
				requirejs(
					data.ScriptFiles, 
					function()
					{
						var viewTypeToken = umbraInstance.findViewType(data.ViewTypeToken);
						if(viewTypeToken === undefined)
						{
							alert("Unknown viewtype: " + data.ViewTypeToken);
						}

						viewTypeToken.init(
							{
								view: view,
								area: area,
								viewPoint: viewPoint,
								workSpace: _this
							});
					});
			}
		}
	};

	///////////////////////////////////////////
	// Definition of EventBus class	
	var EventBusClass = function()
	{
	};

	EventBusClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Umbra Class
	var UmbraType = function()
	{
		this.viewTypes = [];
	};

	UmbraType.prototype =
	{
		addViewType: function(viewType)
		{
			this.viewTypes.push(viewType);
		},

		findViewType: function(token)
		{
			for(var i in this.viewTypes)
			{
				if(this.viewTypes[i].token == token)
				{
					return this.viewTypes[i];
				}
			}
		}
	};

	var umbraInstance = new UmbraType();
	
	///////////////////////////////////////////
	// Combination of everything
	var result = 
		{
			getVersion: function() { return "1.0.0.0"; },

			View: ViewClass,
			ViewPoint: ViewPointClass,
			WorkSpace: WorkspaceClass,
			RibbonBar: RibbonBarClass,
			RibbonElement: RibbonElementClass,
			RibbonGroup: RibbonGroupClass,
			RibbonTab: RibbonTabClass,
			Area: AreaClass,
			EventBus: EventBusClass,
			ViewType: ViewTypeClass,
			umbra: umbraInstance
		};

	return result;
});
