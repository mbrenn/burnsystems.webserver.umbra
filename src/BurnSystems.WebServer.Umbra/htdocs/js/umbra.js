
define(function()
{	
	///////////////////////////////////////////
	// Definition of View-Class 
	var ViewClass = function()
	{	
		this.title = "Unnamed";
		this.content = "Unset content";
	};

	ViewClass.prototype = 
	{
	};
	
	///////////////////////////////////////////
	// Definition of ViewPoint-Class 
	var ViewPointClass = function()
	{	
	};

	ViewPointClass.prototype = 
	{
	};

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
	var AreaClass = function()
	{
		this.width = 0;
		this.height = 0;

		// Stores the list of views
		this.views = [];
	};

	AreaClass.prototype = 
	{
		addView: function(view)
		{
			this.views[this.views.length] = view;
		}
	};

	///////////////////////////////////////////
	// Definition of WorkSpace class	
	var WorkspaceClass = function()
	{
		this.ribbonBar = new RibbonBarClass();
		this.areaTop = new AreaClass();
		this.areaTop.height = 100;
		this.areaLeft = new AreaClass();
		this.areaLeft.width = 200;
		this.areaRight = new AreaClass();
		this.areaRight.width = 200;
		this.areaBottom = new AreaClass();
		this.areaBottom.height = 200
		this.areaCentered = new AreaClass();
		this.domPrefix = "ws" + WorkspaceClass.nextDomPrefix + "_";
		WorkspaceClass.nextDomPrefix++;
	};

	WorkspaceClass.nextDomPrefix = 1;

	WorkspaceClass.prototype = 
	{
		/* Creates the DOM elements for the workspace */
		create: function(domElement)
		{
			var buttonBarDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'buttons" class="umbra_buttons">Buttons</div></div>');
			var topDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'top" class="umbra_top">Top</div></div>');
			var centeredDom = $('<div class="fullwidth fullheight" id="' + this.domPrefix + 'center">' + 
					'<div id="' + this.domPrefix + 'left" class="umbra_left">Left</div>' +
					'<div id="' + this.domPrefix + 'right" class="umbra_right">Right</div>' +
					'<div id="' + this.domPrefix + 'centered" class="umbra_centered">Centered</div>' +				
				'</div>');
			var bottomDom = $('<div class="fullwidth"><div id="' + this.domPrefix + 'bottom" class="umbra_bottom">Bottom</div></div>');

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
			$("#" + this.domPrefix + "center").css("height", (height - restHeight) + "px");
			$("#" + this.domPrefix + "buttons").css("height", this.ribbonBar.height + "px");
			$("#" + this.domPrefix + "top").css("height", this.areaTop.height + "px");
			$("#" + this.domPrefix + "left").css("width", this.areaLeft.width + "px");
			$("#" + this.domPrefix + "right").css("width", this.areaRight.width + "px");
			$("#" + this.domPrefix + "right").css("margin-left", (width - this.areaRight.width) + "px");
			$("#" + this.domPrefix + "bottom").css("height", this.areaBottom.height + "px");

			$("#" + this.domPrefix + "centered").css("margin-left", (this.areaLeft.width + 2) + "px");
			$("#" + this.domPrefix + "centered").css("margin-right", (this.areaRight.width + 2) + "px");
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
	
	var myWorkspace = new WorkspaceClass();
	
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
			myWorkspace: myWorkspace
		};

	return result;
});