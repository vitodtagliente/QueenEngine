
QueenEngine.AnimatedSprite = function( position, animations ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	this.userData = 'animatedsprite';
	
	var animations = animations;
	this.isAnimating = true;
	var currentAnimation = null;
	
	for( name in animations ) {
		currentAnimation = name;
		break;
	}		
	
	this.scale = new QueenEngine.Vector2(1, 1);
	
	Object.defineProperty( this, 'width', {
		get: function(){
			return this.animation.getFrame().width * this.scale.x;			
		}
	} );
	
	Object.defineProperty( this, 'height', {
		get: function(){
			return this.animation.getFrame().height * this.scale.y;		
		}
	} );
	
	Object.defineProperty( this, 'boundary', {
		get: function(){
			return new QueenEngine.Rectangle( this.position, this.width, this.height );
		}
	} );
	
	Object.defineProperty( this, 'framesPerSecond', {
		set: function( value ){
			for( key in animations )
				animations[ key ].framesPerSecond = value;
		}
	} );
	
	Object.defineProperty( this, 'animation', {
		set: function( value ){
			for( key in animations ){
				if( key == value ){
					currentAnimation = value;
					break;
				}
			}
		},
		get: function(){
			return animations[ currentAnimation ];
		}
	} );
	
	this.update = function( delta ) {
		if( this.animation != null && this.isAnimating ) {
			this.animation.update( delta );
		}
		
		this.onupdate( delta );
	}
	this.onupdate = function( delta ){  }
	this.draw = function( spriteBatch ) {
		if( this.animation != null ) {
			spriteBatch.drawTexture(
				this.animation.texture, 
				this.position,
				{x: this.width, y: this.height},
				this.animation.getFrame()
			);
		}
		
		this.ondraw( spriteBatch );
	}
	this.debug = function( renderer ){
		renderer.style = 'stroke';
		renderer.color = this.debugColor;
		renderer.rect( this.position, this.width, this.height );
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
