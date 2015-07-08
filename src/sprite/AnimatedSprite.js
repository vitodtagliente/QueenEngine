
QueenEngine.AnimatedSprite = function( texture, position, animations ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	this.userData = 'animatedsprite';
	
	this.texture = texture;
	var animations = animations;
	this.isAnimating = true;
	var currentAnimation = null;
	
	for( name in animations ) {
		currentAnimation = name;
		break;
	}		
	
	this.scale = null;
	
	Object.defineProperty( this, 'width', {
		get: function(){
			return animations[ currentAnimation ].getFrame().width;			
		}
	} );
	
	Object.defineProperty( this, 'height', {
		get: function(){
			return animations[ currentAnimation ].getFrame().height;		
		}
	} );
	
	Object.defineProperty( this, 'boundary', {
		get: function(){
			return new QueenEngine.Rectangle( this.position, this.width, this.height );
		}
	} );
	
	this.setFramesPerSecond = function( frames ) {
		for( key in animations )
			animations[ key ].setFramesPerSecond( frames );
	}
	this.setAnimation = function( name ) {
		for( key in animations ) {
			if( name == key ){
				currentAnimation = name;
				break;
			}
		}
	}
	this.getCurrentAnimationSheet = function() {
		return animations[ currentAnimation ];
	}
	this.update = function( delta ) {
		if( currentAnimation != null && this.isAnimating ) {
			animations[ currentAnimation ].update( delta );
		}
		
		this.onupdate( delta );
	}
	this.onupdate = function( delta ){  }
	this.draw = function( spriteBatch ) {
		if( currentAnimation != null ) {
			var rect = animations[ currentAnimation ].getCurrentFrameRect();
			spriteBatch.drawTexture(
				this.texture, 
				this.position,
				this.scale,
				rect
			);
		}
		
		this.ondraw( spriteBatch );
	}
	this.ondraw = function( spriteBatch ){  }
	this.clone = function(){
		var anims = {  };
		if( animations != null ){
			for( var name in animations )
				anims[ name ] = animations[ name ].clone();
		}
		var obj = new QueenEngine.AnimatedSprite( this.texture, this.position, anims );
		obj.userData = this.userData;
		obj.isAnimating = this.isAnimating;
		obj.setAnimation( currentAnimation );
		if( this.scale != null ) obj.scale = this.scale.clone();
		obj.update = this.update;
		obj.onupdate = this.onupdate;
		obj.draw = this.draw;
		obj.ondraw = this.ondraw;
		return obj;
	}
}
