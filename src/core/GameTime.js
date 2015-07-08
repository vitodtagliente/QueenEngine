
/**
 * @module Queen2D
 */

/**
 * Use this class to manage game time
 *
 * @class GameTime
 * @constructor
 */

QueenEngine.GameTime = function(){

	/**
	 * Indicates delta time spacing
	 *
	 * @attribute frameSpacing
	 * @default 0
	 * @private
	 * @type float
	 */

	var frameSpacing = 0;

	/**
	 * Indicates the last tick time
	 *
	 * @attribute lastTick
	 * @default 0
	 * @private
	 * @type float
	 */

	var lastTick = ( new Date() ).getTime();

	/**
	 * Indicates if loop is enabled
	 *
	 * @attribute enabled
	 * @default true
	 * @private
	 * @type boolean
	 */

	var enabled = true;

	/**
	 * Indicates the current delta time
	 *
	 * @attribute deltaTime
	 * @default 0
	 * @type float
	 */

	this.deltaTime = 0;

	/**
	 * Indicates game time
	 *
	 * @attribute time
	 * @default 0
	 * @type float
	 */

	this.time = 0;
	
	/*
	 * Pause state 
	 *
	 * @attribute pause
	 * @default false
	 * @type boolean 
	 */
	 
	this.pause = false;

	var bindThis = this; 

	/**
	 * Updating method
	 * @method tick
	 **/

	this.tick = function() {
		
		if( this.pause ){
			this.deltaTime = 0;
			return;
		}
		
		var currentTick = ( new Date() ).getTime();
		frameSpacing = currentTick - lastTick;
		lastTick = currentTick;

		this.deltaTime = frameSpacing / 1000;
		if( isNaN( this.deltaTime ) ) this.deltaTime = 0;

		this.time += this.deltaTime;

		this.ontick();
	}

	/**
	 * Called at each tick
	 * @event ontick
	 */

	this.ontick = function(){}

	/**
	 * Start game time countdown
	 *
	 * @method start
	 */

	this.start = function() {
		enabled = true;
		loop();
	}

	/**
	 * GameTime main loop
	 *
	 * @method loop
	 * @private
	 */

	function loop() {
		bindThis.tick();
		if( enabled )
			requestAnimationFrame( function(){ loop(); } );
	}

	/**
	 * Stop GameTime countdown
	 *
	 * @method stop
	 */

	this.stop = function() {
		enabled = false;
		frameSpacing = 0;
		lastTick = 0;
	}

	/**
	 * @example
	 *     var gameTime = new Queen2D.GameTime();
	 *	   gameTime.ontick = function(){
	 *			// game loop
	 *	   }	
	 *	   gameTime.start();
	 */

	// constructor

	this.tick();
}
