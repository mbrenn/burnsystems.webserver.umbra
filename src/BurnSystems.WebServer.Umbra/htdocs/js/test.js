"use strict";

define(["umbra"], function(u)
{
	u.umbra.addViewType(
		new u.ViewType(
			"BurnSystems.WebServer.Umbra.Requests.VersionUmbraRequest",
			function(data)
			{
				data.viewPoint.domContent.find(".closing").click(function() 
				{
					data.workSpace.loadContent("framework/Version", "centered", 
						{
							success: function(newArea, newView)
							{
								newArea.focusView(newView);
							}
						});
				});
			}));

	return true;
});