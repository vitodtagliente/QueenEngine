
QueenEngine.BaseSprite = function( texture, position, rect ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	this.userData = 'basesprite';
	
	this.texture = texture;
	var sourceRectangle = rect.clone() || new QueenEngine.Rectangle( 0, 0, texture.width, texture.height );
	
	this.scale = null;

	this.debugColor = '#8080C0';
	
	Object.defineProperty( this, 'width', {
		get: function(){
			return sourceRectangle.width;
		}
	} );
	
	Object.defineProperty( this, 'height', {
		get: function(){
			return sourceRectangle.height;
		}
	} );
	
	Object.defineProperty( this, 'boundary', {
		get: function(){
			return new QueenEngine.Rectangle( this.position, this.width, this.height );
		}
	} );
	
	this.update = function( deltaTime ){
		this.onupdate( deltaTime );
	}
	this.onupdate = function( deltaTime ){  }
	this.draw = function( renderer ){
		renderer.drawTexture(
			this.texture, 
			this.position,
			this.scale,
			sourceRectangle
		);
		
		this.ondraw( renderer );
	}
	this.ondraw = function( renderer ){  }
	this.debug = function( renderer ){
		renderer.style = 'stroke';
		renderer.color = this.debugColor;
		renderer.rect( this.position, this.width, this.height );
	}
	this.clone = function(){
		var obj = new QueenEngine.Sprite.BaseSprite( this.texture, this.position, sourceRectangle );
		if( this.scale != null ) obj.scale = this.scale.clone();
		obj.debugColor = this.debugColor;
		obj.userData = this.userData;
		obj.update = this.update;
		obj.draw = this.draw;
		obj.onupdate = this.onupdate;
		obj.ondraw = this.ondraw;
		return obj;
	}
}

