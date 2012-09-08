"use strict";

define(function()
{	
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
	var AreaClass = function(name)
	{
		this.width = 0;
		this.height = 0;
		this.name = name;

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
			this.viewPoints[this.viewPoints.length] = viewPoint;
			viewPoint.area = this;

			view.isVisible = false;
			view.areaAttached = this;
			
			var targetDomContent = $("#" + this.name + " .content");
			ViewPointClass.lastDomId++;
			viewPoint.domContent = $('<div id="viewpoint_' + ViewPointClass.lastDomId + '"></div>');
			viewPoint.domContent.html(view.content)
			viewPoint.domContent.hide();

			targetDomContent.append(viewPoint.domContent);
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

			this.updateLayout();
		},

		// Removes a certain view from area
		removeView: function(view)
		{
		},

		// Adds DOM for tab in view, adds it to area and returns DOM of tab.
		addTabForView: function(view)
		{
			var title = view.title;
			var domTabContent = $('<div class="tab" id="' + view.name + "_tab" + '"><a id="' + view.name + "_tab_a" + '">...</a></div>');
			$("#" + this.name + " .tabs").append(domTabContent);
			$("#" + view.name + "_tab_a").text(view.title);

			var _this = this;
			domTabContent.click(function()
			{
				_this.focusView(view);
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
			totalHeight -= 6;

			domContent.height(totalHeight);
		}
	};

	///////////////////////////////////////////
	// Definition of WorkSpace class	
	var WorkspaceClass = function()
	{
		this.domPrefix = "ws" + WorkspaceClass.nextDomPrefix + "_";
		this.ribbonBar = new RibbonBarClass();
		this.areaTop = new AreaClass(this.domPrefix + "t");
		this.areaTop.height = 100;
		this.areaLeft = new AreaClass(this.domPrefix + "l");
		this.areaLeft.width = 200;
		this.areaRight = new AreaClass(this.domPrefix + "r");
		this.areaRight.width = 200;
		this.areaBottom = new AreaClass(this.domPrefix + "b");
		this.areaBottom.height = 200
		this.areaCentered = new AreaClass(this.domPrefix + "c");
		WorkspaceClass.nextDomPrefix++;
	};

	WorkspaceClass.nextDomPrefix = 0;

	WorkspaceClass.prototype = 
	{
		/* Creates the DOM elements for the workspace */
		create: function(domElement)
		{
			var innerAreaHtml = '<div class="tabs"></div><div class="content"></div>';

			var buttonBarDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'buttons" class="umbra_buttons">Buttons</div></div>');
			var topDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 't" class="umbra_top umbra_area">' + innerAreaHtml + '</div></div>');
			var centeredDom = $('<div class="fullwidth fullheight" id="' + this.domPrefix + 'center">' + 
					'<div id="' + this.domPrefix + 'l" class="umbra_left umbra_area">' + innerAreaHtml + '</div>' +
					'<div id="' + this.domPrefix + 'r" class="umbra_right umbra_area">' + innerAreaHtml + '</div>' +
					'<div id="' + this.domPrefix + 'c" class="umbra_centered umbra_area">' + innerAreaHtml + '</div>' +				
				'</div>');
			var bottomDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'b" class="umbra_bottom umbra_area">' + innerAreaHtml + '</div></div>');

			domElement.append(buttonBarDom);
			domElement.append(topDom);
			domElement.append(centeredDom);
			domElement.append(bottomDom);

			this.updateLayout();

			var _this = this;
			// Event for resizing
			$(window).resize(function()
			{
				_this.updateLayout();
			});
		},

		updateLayout: function()
		{
			var restHeight = this.areaTop.height + this.areaBottom.height + this.ribbonBar.height + 10;
			var height = $("body").height();
			var width = $("body").width();

			// Set height of center area
			$("#" + this.domPrefix + "c").css("height", (height - restHeight) + "px");
			$("#" + this.domPrefix + "l").css("height", (height - restHeight) + "px");			
			$("#" + this.domPrefix + "r").css("height", (height - restHeight) + "px");
			
			// Set height of bottom, top and buttons
			$("#" + this.domPrefix + "buttons").css("height", this.ribbonBar.height + "px");
			$("#" + this.domPrefix + "t").css("height", this.areaTop.height + "px");
			$("#" + this.domPrefix + "b").css("height", this.areaBottom.height + "px");

			// Set width and align right to right border
			$("#" + this.domPrefix + "l").css("width", this.areaLeft.width + "px");
			$("#" + this.domPrefix + "r").css("width", this.areaRight.width + "px");
			$("#" + this.domPrefix + "r").css("margin-left", (width - this.areaRight.width) + "px");

			// Position center center
			$("#" + this.domPrefix + "c").css("margin-left", (this.areaLeft.width + 2) + "px");
			$("#" + this.domPrefix + "c").css("margin-right", (this.areaRight.width + 2) + "px");

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

		// Finds the view and the area and returns it
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
			EventBus: EventBusClass
		};

	return result;
});
