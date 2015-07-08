
/**
 * @module Queen2D
 * @submodule RequestAnimationFrame
 */

/**
 * Idicates Frames per Second rendering
 *
 * @attribute FPS
 * @type int
 */


QueenEngine.FPS = 60;

/**
 * 
 *
 * @method requestAnimationFrame
 * @param {Function} callback
 * @example 
 *		requestAnimationFrame( function(){  
 *			// loop 
 * 		} );
 */

window.requestAnimationFrame = ( function() {
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( callback, element ) {
				window.setTimeout( callback, 1000 / QueenEngine.FPS );
			}; 
	}
)();
