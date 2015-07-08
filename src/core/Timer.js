
/**
 * @module Queen2D
 */

/**
 * Simple Timer class
 *
 * @class Timer
 * @constructor
 * @param {Float} delta
 * @param {Boolean} loop
 */

QueenEngine.Timer = function( _delta, _loop ){

	/**
	 * Indicates Timer duration
	 *
	 * @attribute delta
	 * @default 1
	 * @private
	 * @type float
	 */

	var delta = _delta || 1;
	
	/**
	 * Indicates timer countdown
	 *
	 * @attribute timer
	 * @private
	 * @type float
	 */

	var timer = delta;
	
	/**
	 * Indicates if timer is in loop
	 *
	 * @attribute loop
	 * @private
	 * @default false
	 * @type boolean
	 */

	var loop = _loop || false;
	
	/**
	 * Indicates if timer is stopped
	 *
	 * @attribute endPhase
	 * @private
	 * @default false
	 * @type boolean
	 */

	var endPhase = false;

	/**
	 * Updating method
	 * @method tick
	 **/

	this.tick = function( deltaTime ){
		if( !endPhase || loop )
			timer -= deltaTime || 0.1;
		
		if( timer <= 0 ){
			if( !loop ) endPhase = true;
			this.onlasttick();
			timer = delta;
		}
	}

	/**
	 * Called at the last tick
	 * @event onlasttick
	 */

	this.onlasttick = function(){}
}
