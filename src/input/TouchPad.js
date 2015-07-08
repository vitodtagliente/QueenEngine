
QueenEngine.has_touch = ( 'ontouchstart' in window );

QueenEngine.isTouchDevice = function(){
	return QueenEngine.has_touch;
}

QueenEngine.TouchPad = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.x = null;
	this.y = null;
	this.isDown = false;
	
	var bindThis = this;

	function handleTouchStart( event ){
		this.isDown = true;
	}
	function handleTouchEnd( event ){
		this.isDown = false;
	}
	function handleTouchMove( event ){
		event.preventDefault();
		if( event.touches[ 0 ] ) {
			this.x = event.touches[ 0 ].pageX;
			this.y = event.touches[ 0 ].pageY;
		}
	}

	if( this.graphicDevice != null && QueenEngine.isTouchDevice() ){
		window.addEventListener( 'touchstart', function( event ){ handleTouchStart.call( bindThis, event ); } );
		window.addEventListener( 'touchend', function( event ){ handleTouchEnd.call( bindThis, event ); } );
		window.addEventListener( 'touchmove', function( event ){ handleTouchMove.call( bindThis, event ); } );
	}
}
