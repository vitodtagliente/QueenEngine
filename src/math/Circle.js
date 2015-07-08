
/**
 * @module Queen2D
 */

/**
 * Define a circle shape
 *
 * @class Circle
 * @constructor
 * @extend Shape
 * @param {Point2 || Vector2} position
 * @param {Float} radius
 * @param {Float} angle default Math.PI * 2
 *
 */

QueenEngine.Circle = function( position, radius, angle ){
	QueenEngine.Shape.call( this, position, "circle" );

	/**
	 *
	 * @attribute radius
	 * @type float
	 * @default 0
	 */

	this.radius = radius || 0;
	
	/**
	 *
	 * @attribute angle
	 * @type float
	 * @default Math.PI * 2
	 */

	this.angle = angle || Math.PI * 2;

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){
		return ( this.position.distance( point2 ) < this.radius )
	}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){
		renderer2.circle( this.position, this.radius );
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Circle} 
	 **/

	this.clone = function(){
		return new QueenEngine.Circle( this.position, this.radius, this.angle );
	}
}

QueenEngine.Circle.prototype = new QueenEngine.Shape();
