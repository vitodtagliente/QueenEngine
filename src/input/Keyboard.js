
QueenEngine.Keyboard = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.keys = {  };
	
	var bindThis = this;

	this.stopPropagation = false;

	this.isKeyPressed = function( keycode ){
		if( this.keys[ keycode ] ){
			delete this.keys[ keycode ];
			return true;
		} else return false;
	}
	this.isKeyDown = function( keycode ){
		return this.keys[ keycode ];
	}
	this.keyRelease = function( keycode ){
		delete this.keys[ keycode ];
	}
	function handleKeyDown( event ){
		this.keys[ event.keyCode ] = true; 
		if( this.stopPropagation && event.keyCode != Queen2D.KeyCode.keyF5 && event.keyCode != Queen2D.KeyCode.keyF11 ){
			event.stopPropagation();
			event.preventDefault();
		}
	}
	function handleKeyUp( event ){
		delete this.keys[ event.keyCode ]; 
		if( this.stopPropagation && event.keyCode != Queen2D.KeyCode.keyF5 && event.keyCode != Queen2D.KeyCode.keyF11 ){
			event.stopPropagation();
			event.preventDefault();
		}
	} 

	if( this.graphicDevice != null ){
		document.addEventListener( 'keydown', function( event ){ handleKeyDown.call( bindThis, event ); } );
		document.addEventListener( 'keyup', function( event ){ handleKeyUp.call( bindThis, event ); } );
	}
}
