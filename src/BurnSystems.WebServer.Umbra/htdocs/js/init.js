
requirejs.config(
{
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
});

requirejs(['umbra'], 
	function(umbra)
	{
		var workSpace = new umbra.WorkSpace();
		workSpace.updateLayout();
		workSpace.create($("body"));

		var topView = new umbra.View("Top 1", "top1", "This is conteeeent");
		var topView2 = new umbra.View("Top 2", "top2", "This is <b>MORE</b> conteeeent");
		workSpace.areaRight.addView(topView);
		workSpace.areaRight.addView(topView2);
				
		var centerView = new umbra.View("Center 1", "center1", "Ths is the maincontent of the content, a longer text than required but a nice content");
		var centerView2 = new umbra.View("Center 2", "center2", "This is <b>MORE</b> conteeeent!");
		workSpace.areaCentered.addView(centerView);
		workSpace.areaCentered.addView(centerView2);

		workSpace.areaCentered.focusView(centerView);
		workSpace.areaRight.focusView(topView);
	});
