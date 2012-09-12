"use strict";

define(["umbra"], function(u)
{
	var consoleClass = function()
	{
	};

	consoleClass.prototype = 
	{
	};

	u.umbra.addViewType(
		new u.ViewType(
			"BurnSystems.WebServer.Umbra.Requests.ConsoleUmbraRequest",
			function(data)
			{
				data.viewPoint.domContent.html(
					"<table><tr><td>TEST</td></tr></table>");
			}));

	// Returns the console
	var consoleInstance = new consoleClass();
	u.umbra.addPlugin("Umbra.Console", consoleInstance);

	var result = 
	{
		console: consoleInstance
	};

	return result;
});
