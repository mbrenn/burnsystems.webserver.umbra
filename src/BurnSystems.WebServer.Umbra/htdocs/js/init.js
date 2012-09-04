
requirejs.config(
{
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
});

requirejs(['umbra'], 
	function(umbra)
	{
		var workSpace = new umbra.WorkSpace();
		workSpace.create($("body"));
		/*
		alert(umbra.getVersion());

		var view = new umbra.View();
		var view2 = new umbra.View();
		
		alert(view.name);
		alert(view2.name);
		*/
	});
