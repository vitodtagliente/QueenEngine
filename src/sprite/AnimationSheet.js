
QueenEngine.AnimationSheet = function( texture, frames, framesPerSecond ){
	var frames = frames || [];
	
	this.texture = texture;
	
	var frameLength = 0;
	var _framesPerSecond = 0;
	
	var currentFrame = 0;
	var frameTimer = 0;
	
	Object.defineProperty( this, 'framesPerSecond', {
		set: function( value ){
			if( value < 1 )
				_framesPerSecond = 1;
			else if ( value > 60 )
				_framesPerSecond = 60;
			else
				_framesPerSecond = value;
			frameLength = 1 / _framesPerSecond;
		},
		get: function(){
			return _framesPerSecond;
		}
	} );
	
	this.getFrame = function() {
		return frames[ currentFrame ]; 
	}
	this.update = function( deltaTime ) {
		frameTimer -= deltaTime;
		
		if( frameTimer <= 0 ) {
			currentFrame = ( currentFrame + 1 ) % frames.length;
			frameTimer = frameLength;
		}   
	}
	this.reset = function() {
		currentFrame = 0;		
	}
	this.clone = function(){
		var obj = new QueenEngine.AnimationSheet( frames, framesPerSecond );
		return obj;
	}

	this.framesPerSecond = framesPerSecond || 0;
}
