
/**
 * @module Queen2D
 */

/**
 * Define a Rectangle shape
 *
 * @class Rectangle
 * @constructor
 * @extend Shape
 * @param {Point2 || Vector2} position
 * @param {Float} width
 * @param {Float} height
 *
 */

QueenEngine.Rectangle = function( position, width, height ){
	QueenEngine.Shape.call( this, position, "rectangle" );

	/**
	 *
	 * @attribute width
	 * @type float
	 * @default 0
	 */

	this.width = width || 0;
	
	/**
	 *
	 * @attribute height
	 * @type float
	 * @default 0
	 */

	this.height = height || this.width || 0;

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){
		if( ( this.position.x + this.width ) > point2.x && this.position.x < point2.x ) 
			if( ( this.position.y + this.height ) > point2.y && this.position.y < point2.y ) 
				return true;
		return false;
	}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){
		renderer2.rect( this.position, this.width, this.height );
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Rectangle} 
	 **/

	this.clone = function(){
		return new QueenEngine.Rectangle( this.position, this.width, this.height );
	}
}

QueenEngine.Rectangle.prototype = new QueenEngine.Shape();
