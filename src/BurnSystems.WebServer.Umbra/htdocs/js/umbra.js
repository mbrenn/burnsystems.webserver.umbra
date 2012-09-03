
define(function()
{	
	var ViewClass = function()
	{	
		this.name = Math.random();
	};

	ViewClass.prototype = 
	{
		add: function() { alert ( 'ABC' ); }
	};

	var result = 
		{
			getVersion: function() { return "1.0.0.0"; },

			updateWorkSpaceLayout: function()
			{			
				var height = $("body").height();		
				$("#workspace_center").css("height", (height - 338) + "px");
			},

			View: ViewClass
		};


	$(window).resize(function()
	{
		result.updateWorkSpaceLayout();
	});

	$(function()
	{
		result.updateWorkSpaceLayout();
	});

	return result;
});