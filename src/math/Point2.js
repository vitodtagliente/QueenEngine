
/**
 * @module Queen2D
 */

/**
 * Base point class
 *
 * @class Point2
 * @constructor
 * @param {Float} x default 0
 * @param {Float} y default 0
 *
 */

QueenEngine.Point2 = function( x, y ){

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
	 * Set coords
	 * @method set
	 **/
	
	this.set = function( x, y ){
		this.x = x || 0;
		this.y = y || 0;
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/

	this.toString = function(){
		return "(" + this.x + "," + this.y + ")";
	}

	/**
	 * Returns an Array representation of this object.
	 * @method toArray
	 * @return {Array} an array representation of the instance.
	 **/

	this.toArray = function(){
		return [ this.x, this.y ];
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Point2} 
	 **/

	this.clone = function(){
		return new QueenEngine.Point2( this.x, this.y );
	}
}
