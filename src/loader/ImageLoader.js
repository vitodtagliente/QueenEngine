
QueenEngine.ImageLoader = function( url, downloadCallback ){
    var downloadCallback = downloadCallback || function(){  };
    var bindThis = this;
    var resource = new Image();
    this.status = QueenEngine.LoaderStatus.QUEUE;
    
    resource.addEventListener( "load", function( event ) {
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