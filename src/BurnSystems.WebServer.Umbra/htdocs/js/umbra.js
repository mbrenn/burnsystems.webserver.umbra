
define(function()
{	
	///////////////////////////////////////////
	// Definition of View-Class 
	var ViewClass = function()
	{	
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
		this.Height = 128;
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
		this.Width = 0;
		this.Height = 0;
	};

	AreaClass.prototype = 
	{
	};

	///////////////////////////////////////////
	// Definition of WorkSpace class	
	var WorkspaceClass = function()
	{
		this.ribbonBar = new RibbonBarClass();
		this.areaTop = new AreaClass();
		this.areaTop.Height = 100;
		this.areaLeft = new AreaClass();
		this.areaLeft.Width = 200;
		this.areaRight = new AreaClass();
		this.areaRight.Width = 200;
		this.areaBottom = new AreaClass();
		this.areaBottom.Height = 200
		this.areaCentered = new AreaClass();
	};

	WorkspaceClass.prototype = 
	{
		updateLayout: function()
		{
			var restHeight = this.areaTop.Height + this.areaBottom.Height + this.ribbonBar.Height + 10;
			var height = $("body").height();
			$("#workspace_center").css("height", (height - restHeight) + "px");
			$("#buttons").css("height", this.ribbonBar.Height + "px");
			$("#top").css("height", this.areaTop.Height + "px");
			$("#left").css("width", this.areaLeft.Width + "px");
			$("#right").css("width", this.areaRight.Width + "px");
			$("#bottom").css("height", this.areaBottom.Height + "px");
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


	$(window).resize(function()
	{
		myWorkspace.updateLayout();
	});

	$(function()
	{
		myWorkspace.updateLayout();
	});

	return result;
});