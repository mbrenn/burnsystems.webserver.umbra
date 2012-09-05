
requirejs.config(
{
    //By default load any module IDs from js/lib
    baseUrl: 'scripts',
});

requirejs(['umbra'], 
	function(umbra)
	{
		var workSpace = new umbra.WorkSpace();
		workSpace.domPrefix = '';
		workSpace.updateLayout();
		// workSpace.create($("body"));
	});
