
/**
 * @module Queen2D
 */

/**
 * Use this class to manage game time
 *
 * @class Color2
 * @constructor
 * @param {Int} red
 * @param {Int} green
 * @param {Int} blue
 * @param {Float} alpha
 * @example
 *       var c = new Queen2D.Color( 0, 0, 0, 0 ); 
 * @example
 *       var c = new Queen2D.Color( "black" );
 * @example
 *       var c = new Queen2D.Color( [0, 0, 0, 0] );
 */

QueenEngine.Color2 = function( param1, param2, param3, param4 ){

	/**
	 * @attribute red
	 * @default 0
	 * @type int
	 */

	this.red = null;
	
	/**
	 * @attribute green
	 * @default 0
	 * @type int
	 */

	this.green = null;
	
	/**
	 * @attribute blue
	 * @default 0
	 * @type int
	 */

	this.blue = null;
	
	/**
	 * @attribute alpha
	 * @default a
	 * @type float
	 */

	this.alpha = null;

	if( param1 == null ){
		this.red = Math.floor( QueenEngine.random( 0, 255 ) );
		this.green = Math.floor( QueenEngine.random( 0, 255 ) );
		this.blue = Math.floor( QueenEngine.random( 0, 255 ) );
		this.alpha = QueenEngine.random( 0, 1 );
	}
	else if( typeof( param1 ) == "string" ){ 
		var values = param1.split( '(' );
		values = ( values[ 1 ].split( ')') )[ 0 ];
		values = values.split( ',' );
		if( typeof( values ) == "object" ){
			this.red = values[ 0 ] || 0;
			this.green = values[ 1 ] || 0;
			this.blue = values[ 2 ] || 0;
			this.alpha = values[ 3 ] || 1;
		} 
		else {
			this.red = Math.floor( QueenEngine.random( 0, 255 ) );
			this.green = Math.floor( QueenEngine.random( 0, 255 ) );
			this.blue = Math.floor( QueenEngine.random( 0, 255 ) );
			this.alpha = QueenEngine.random( 0, 1 );
		}
	}
	else if( typeof( param1 ) == "object" ){
		this.red = param1[ 0 ] || 0;
		this.green = param1[ 1 ] || 0;
		this.blue = param1[ 2 ] || 0;
		this.alpha = param1[ 3 ] || 1;
	}
	else {
		this.red = param1 || 0;
		this.green = param2 || 0;
		this.blue = param3 || 0;
		this.alpha = param4 || 1;
	}	

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/

	this.toString = function(){
		return "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";
	}

	/**
	 * Returns an Array representation of this object.
	 * @method toArray
	 * @return {Array} an array representation of the instance.
	 **/

	this.toArray = function(){
		return [ this.red, this.green, this.blue, this.alpha ];
	}	
}
