
/**
 * @module Queen2D
 */

/**
 * Define a Shape
 *
 * @class Shape
 * @constructor
 * @abstract
 * @param {Point2 || Vector2} position
 * @param {String} type
 *
 */

QueenEngine.Shape = function( position, type ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	
	/**
	 *
	 * @attribute type
	 * @type stirng
	 * @default "unknown"
	 */

	this.type = type || "unknown";

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Shape} 
	 **/

	this.clone = function(){ 
		return new QueenEngine.Shape( this.position ); 
	}
}
