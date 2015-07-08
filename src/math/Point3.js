
/**
 * @module Queen2D
 */

/**
 * Base point class
 *
 * @class Point3
 * @constructor
 * @param {Float} x default 0
 * @param {Float} y default 0
 * @param {Float} z default 0
 * 
 */

QueenEngine.Point3 = function( x, y, z ){

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
	 *
	 * @attribute z
	 * @type float
	 */

	this.z = z || 0;
	
	/**
	 * Set coords
	 * @method set
	 **/
	
	this.set = function( x, y, z ){
		this.x = x || 0;
		this.y = y || 0;
		this.z = z || 0;
	}

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/

	this.toString = function(){
		return "(" + this.x + "," + this.y + "," + this.z + ")";
	}

	/**
	 * Returns an Array representation of this object.
	 * @method toArray
	 * @return {Array} an array representation of the instance.
	 **/

	this.toArray = function(){
		return [ this.x, this.y, this.z ];
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Point2} 
	 **/

	this.clone = function(){
		return new QueenEngine.Point3( this.x, this.y, this.z );
	}
}
