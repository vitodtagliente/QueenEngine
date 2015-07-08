
/**
 * @module QueenEngine
 * @submodule Random
 */

 /**
 * Obtain a random number
 *
 * @method random
 * @param {Float} min
 * @param {Float} max
 * @return {Float}
 *
 * @example 
 *		var number = Queen2D.random( 1, 100 );
 */

QueenEngine.random = function( min, max ) {
    return Math.random() * ( max - min ) + min || 0;
}

/**
 * Obtain a random int number
 *
 * @method random
 * @param {Float} min
 * @param {Float} max
 * @return {int}
 *
 * @example 
 *		var number = Queen2D.random( 1, 100 );
 */

QueenEngine.randomInt = function( min, max ){
	return Math.floor( QueenEngine.random( min, max ) );
}

