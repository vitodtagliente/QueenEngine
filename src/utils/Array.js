
/**
 * @module QueenEngine
 * @submodule Array
 */

/**
 * 
 *
 * @method remove
 * @param {Int} from
 * @param {Int} to
 * @example 
 *		var a = [ 3, 4, 5 ];
 *		a.remove( 1 );
 */

Array.prototype.remove = function( from, to ) {
  var rest = this.slice( ( to || from ) + 1 || this.length );
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply( this, rest );
};

/**
 * 
 *
 * @method isArray
 * @param {Object} argv
 * @example 
 *		var v = [ 4, 5, 6, 7 ];
 *		if( Array.isArray( v ) ) { 
 *			// do something
 *		 }
 */

if( ! Array.isArray ) {
  Array.isArray = function ( vArg ) {
	return Object.prototype.toString.call( vArg ) === "[object Array]";
  };
}
