
/**
 * @module Queen2D
 */

/**
 * Base Vector3 class
 *
 * @class Vector3
 * @constructor
 * @param {Float} x default 0
 * @param {Float} y default 0
 * @param {Float} z default 0
 *
 */

QueenEngine.Vector3 = function( x, y, z ){

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
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Point2} 
	 **/

	this.clone = function(){
		return new QueenEngine.Vector2( this.x, this.y, this.z );
	}
}