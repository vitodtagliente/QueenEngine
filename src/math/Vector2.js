
/**
 * @module Queen2D
 */

/**
 * Base Vector2 class
 *
 * @class Vector2
 * @constructor
 * @param {Float} x default 0
 * @param {Float} y default 0
 *
 */

QueenEngine.Vector2 = function( x, y ){

	/**
	 *
	 * @attribute x
	 * @type float
	 */

	this.x = x || 0;
	
	/**
	 *
	 * @attribute y
	 * @type float
	 */

	this.y = y || 0;

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Point2} 
	 **/

	this.clone = function(){
		return new QueenEngine.Vector2( this.x, this.y );
	}

	/**
	 *  
	 *
	 * @method add
	 * @param {Float} param
	 * @param {Point2 || Vector2} param
	 *
	 * @return {Vector2} 
	 **/

	this.add = function( param ) {
		if( typeof( param ) == "number" )
			return new QueenEngine.Vector2( this.x + param || 0, this.y + param || 0 );
		else return new QueenEngine.Vector2( this.x + param.x || 0, this.y + param.y || 0 );
	}

	/**
	 *  
	 *
	 * @method sub
	 * @param {Float} param
	 * @param {Point2 || Vector2} param
	 *
	 * @return {Vector2} 
	 **/

	this.sub = function( param ) {
		if( typeof( param ) == "number" )
			return new QueenEngine.Vector2( this.x - param || 0, this.y - param || 0 );
		else return new QueenEngine.Vector2( this.x - param.x || 0, this.y - param.y || 0 );
	}

	/**
	 *  
	 *
	 * @method mul
	 * @param {Float} param
	 * @param {Point2 || Vector2} param
	 *
	 * @return {Vector2} 
	 **/

	this.mul = function( param ) {
		if( typeof( param ) == "number" )
			return new QueenEngine.Vector2( this.x * param || 0, this.y * param || 0 );
		else return new QueenEngine.Vector2( this.x * param.x || 0, this.y * param.y || 0 );
	}

	/**
	 *  
	 *
	 * @method div
	 * @param {Float} param
	 * @param {Point2 || Vector2} param
	 *
	 * @return {Vector2} 
	 **/

	this.div = function( param ) {
		if( typeof( param ) == "number" )
			return new QueenEngine.Vector2( this.x / param || 0, this.y / param || 0 );
		else return new QueenEngine.Vector2( this.x / param.x || 0, this.y / param.y || 0 );
	}

	/**
	 * Set coordinates
	 *
	 * @method set
	 * @param {Float} param
	 * @param {Point2 || Vector2} param
	 **/
	
	this.set = function( param ) {
		if( param == null ) param = 0;

		if( typeof( param ) == "number" ){
			this.x = param;
			this.y = param;
		} 
		else {
			this.x = param.x;
			this.y = param.y;
		}
	}
	/**
	 * Check if two vectors are equals
	 *
	 * @method equals
	 * @param {Vector2 || Point2} v
	 **/
	
	this.equals = function( v ) {
		return ( this.x == v.x && this.y == v.y );
	}

	/**
	 * Get vector length
	 *
	 * @method length
	 * @return {Float}
	 **/

	this.length = function() {
		return Math.sqrt( this.x * this.x + this.y * this.y );
	}

	/**
	 * Get vector length ^ 2
	 *
	 * @method length2
	 * @return {Float}
	 **/

	this.length2 = function() {
		return this.x * this.x + this.y * this.y;
	}

	/**
	 * Get distance between two vectors
	 *
	 * @method distance
	 * @param {Vector2 || Point2} v
	 * @return {Float}
	 **/

	this.distance = function( v ) {
		return Math.sqrt( this.distance2( v ) );
	}

	/**
	 * Get distance between two vectors ^ 2
	 *
	 * @method distance
	 * @param {Vector2 || Point2} v
	 * @return {Float}
	 **/

	this.distance2 = function( v ) {
		var x = v.x - this.x;
		var y = v.y - this.y;
		return x * x + y * y;
	}

	/**
	 * Normalize vector
	 *
	 * @method normal
	 * @return {Vector2}
	 **/

	this.normal = function() {
		var m = this.length();
		return new QueenEngine.Vector2( this.x / m, this.y / m );
	}

	/**
	 * Do Scalar product
	 *
	 * @method dot
	 * @param {Vector2 || Point2} v
	 * @return {Float}
	 **/

	this.dot = function( v ) {
		return this.x * v.x + this.y * v.y;
	}

	/**
	 * Rotate vector
	 *
	 * @method rotate
	 * @param {Vector2 || Point2} origin
	 * @param {Float} theta rotation angle
	 * @return {Vector2}
	 **/

	this.rotate = function( origin, theta ) {
		var x = this.x - origin.x;
		var y = this.y - origin.y;
		return new QueenEngine.Vector2( x * Math.cos( theta ) - y * Math.sin( theta ) + origin.x, 
											x * Math.sin( theta ) + y * Math.cos( theta ) + origin.y );
	}

	/**
	 * Verify if this vector coordinates are equal to zero
	 *
	 * @method isZero
	 * @return boolean
	 **/
	
	this.isZero = function() {
		return ( this.x == 0 && this.y == 0 );
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	
	this.toString = function() {
		return "(" + this.x + ", " + this.y + ")";
	}
}
