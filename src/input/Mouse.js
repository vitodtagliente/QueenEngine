
QueenEngine.Mouse = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.buttons = {  };
	this.x = null;
	this.y = null;
	
	var bindThis = this;

	this.isButtonPressed = function( buttoncode ){
		if( this.buttons[ buttoncode ] ) {
			delete this.buttons[ buttoncode ];
			return true;
		} else return false;
	}
	this.isButtonDown = function( buttoncode ){
		return this.buttons[ buttoncode ];
	}
	this.buttonRelease = function( buttoncode ){
		delete this.buttons[ buttoncode ];
	}
	this.isOut = function(){
		return ( this.x == null && this.y == null );
	}
	
	function handleMouseDown( event ){
		this.buttons[ event.button ] = true;
	}
	function handleMouseUp( event ){
		delete this.buttons[ event.button ];
	}
	function handleMouseOut( event ){
		this.x = this.y = null;
	}
	function handleMouseMove( event ){
		if( event.offsetX || event.offsetY ) {
			this.x = event.offsetX;
			this.y = event.offsetY;
		}  else if ( event.layerX || event.layerY ) {
			this.x = event.layerX - this.graphicDevice.canvas.offsetLeft;
			this.y = event.layerY - this.graphicDevice.canvas.offsetTop; 
		} 	
	}

	if( this.graphicDevice != null ){
		this.graphicDevice.addEventListener( 'mousedown', function( event ){ handleMouseDown.call( bindThis, event ); } );
		this.graphicDevice.addEventListener( 'mouseup', function( event ){ handleMouseUp.call( bindThis, event ); } );
		this.graphicDevice.addEventListener( 'mousemove', function( event ){ handleMouseMove.call( bindThis, event ); } );		
		this.graphicDevice.addEventListener( 'mouseout', function( event ){ handleMouseOut.call( bindThis, event ); } );
	}
}
