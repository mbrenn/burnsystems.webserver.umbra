
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

			View: ViewClass
		};

	return result;		
});