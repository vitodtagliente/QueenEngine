
QueenEngine.AudioLoader = function( url, downloadCallback ){
	var downloadCallback = downloadCallback || function(){  };
	var bindThis = this;
	var resource = new Audio();
	this.status = QueenEngine.LoaderStatus.QUEUE;

	resource.addEventListener( "canplaythrough", function( event ) {
		bindThis.status = QueenEngine.LoaderStatus.SUCCESS;			
		downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
	}, false);

	resource.addEventListener( "error", function( event ) {
		bindThis.status = QueenEngine.LoaderStatus.ERROR;		
		downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
	}, false);

	resource.src = url;
	return resource;
}
