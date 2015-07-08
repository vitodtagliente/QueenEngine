
/**
 * @module Queen2D
 */

/**
 * Static class holding library specific information such as the version 
 * @class Queen2D
 **/

var QueenEngine = QueenEngine || {  };

/**
 * Indicates relase version
 *
 * @attribute version
 * @type float
 * @static
 */

QueenEngine.version = 2.4;

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

/**
 * @module Queen2D
 */

/**
 * This class allow you to manage device
 *
 * @class GraphicDevice
 * @constructor
 * @param {String} canvasId
 *
 * @example
 *       var device = new Queen2D.GraphicDevice( 'canvas_id' );
 */

QueenEngine.GraphicDevice = function( canvasId ){
	
	/**
	 *Represents canvas html object
	 *
	 * @attribute canvas
	 * @type canvas
	 */

	this.canvas = null;

	/**
	 *Represents the canvas context 2d
	 *
	 * @attribute context
	 * @type context2d
	 */

	this.context = null;

	/**
	 * Indicates if device is in fullscreen mode
	 *
	 * @attribute isFullscreen
	 * @type boolean
	 */

	this.isFullscreen = null;

	/**
	 * Indicates if device is ready
	 *
	 * @attribute deviceReady
	 * @private
	 * @type boolean
	 */

	var deviceReady = null;

	/**
	 * Indicates the last color used to clear evice
	 *
	 * @attribute lastClearColor
	 * @private
	 * @type string
	 */

	var lastClearColor = null;
	
	/**
	 * @method getContext
	 * @param {context2d} 
	 **/

	this.getContext = function(){
		return this.context;
	}

	/**
	 * @method addEventListener
	 * @param {String} event
	 * @param {Function} callback
	 * @param {Boolean} async 
	 **/

	this.addEventListener = function( ev, funcname, async ){
		if( async == null ) async = false;
		this.canvas.addEventListener( ev, funcname, async );
	}

	/**
	 * This method manage device resizing
	 *
	 * @method handleResize
	 * @param {Event} event 
	 * @private
	 **/

	function handleResize( event ){
		if( this.isFullscreen ) {
			this.enableFullscreen();
			this.clear( lastClearColor );
		}
		this.onresize();
	}

	/**
	 * Resize device 
	 *
	 * @method resize
	 * @param {Float} width
	 * @param {Float} height 
	 **/

	this.resize = function( width, height ){
		if( (width != null || width != 0) && (height != null || height != 0) ){
			if( this.canvas != null ) {
				this.isFullscreen = false;
				this.canvas.width = width;
				this.canvas.height = height;
			}				
		}
	}

	/**
	 * It is called at any resize event
	 *
	 * @event onresize
	 **/

	this.onresize = function(){  }

	/**
	 * Enable device fullscreen mode
	 *
	 * @method enableFullscreen
	 **/

	this.enableFullscreen = function(){
		this.resize( window.innerWidth, window.innerHeight );			
		this.isFullscreen = true;
	}	

	/**
	 * Clear device
	 *
	 * @method clear
	 * @param {String} color
	 **/

	 /**
	 * Clear device
	 *
	 * @method clear
	 * @param {Color2} color
	 **/

	this.clear = function( color ){
		if( deviceReady ){
			if( color != null )
				lastClearColor = ( typeof( color ) == "object" ) ? ( color.toString() ) : ( color );
			this.context.fillStyle = lastClearColor;
			this.context.fillRect( 0, 0, this.canvas.width, this.canvas.height );
		}
	}

	// constructor

	this.canvas = document.getElementById( canvasId );
				
	if( this.canvas != null ) {			
		this.context = this.canvas.getContext( "2d" );
		this.isFullscreen = false;
	}
	
	if( this.context != null )
		deviceReady = true;
	else console.log( "Unable to initializate context 2d" );
	
	lastClearColor = '#FFFFFF';
	
	var bindThis = this;
	window.addEventListener( 'resize', function( event ){ handleResize.call( bindThis, event ); }, false );
}

QueenEngine.RendererStyle = { 'Fill': 'fill', 'Stroke': 'stroke' };

/**
 * @module Queen2D
 */

/**
 * This class allow you to manage device
 *
 * @class Renderer2
 * @constructor
 * @param {GraphicDevice} graphicDevice
 *
 * @example
 *       var renderer = new Queen2D.Renderer2( device );
 */

QueenEngine.Renderer2 = function( graphicDevice ){
	
	Object.defineProperty( this, 'context', {
		get: function(){
			return this.graphicDevice.context;
		}
	} );		
	
	/**
	 * Indicates the current drawing style
	 *
	 * @attribute style
	 * @type RendererStyle
	 *
	 * @example 
	 *		renderer.style = "fill"; // "stroke"
	 *		// or
	 *		renderer.style = Queen2D.RendererStyle.Fill // .Stroke
	 */
	
	var style = QueenEngine.RendererStyle.Fill;
	
	Object.defineProperty( this, 'style', {
		set: function( value ){
			if ( value == QueenEngine.RendererStyle.Fill || value == QueenEngine.RendererStyle.Stroke ) {
				style = value;
			}
			else style = QueenEngine.RendererStyle.Fill;
		},
		get: function(){
			return style;
		}
	} );

	/**
 	 * Set renderer drawing translation
 	 *
	 * @method translate
	 * @param {Point2} point2
	 *
	 * @example
	 * 		renderer.translate( { x:100, y:20 } ); // using object
	 *		renderer.translate( new Queen2D.Point2( 100, 20 ) ); // using Queen2D.Point2
	 *		renderer.translate( new Queen2D.Vector2( 100, 20 ) ); // using Queen2D.Vector2
	 **/

	this.translate = function( point2 ){
		if( typeof( point2 ) != "object" ) point2 = { x: 0, y: 0 };
		this.context.translate( point2.x, point2.y );
	}

	/**
 	 * Set renderer drawing color
 	 *
	 * @method setColor
	 * @param {Color2} color
	 *
	 * @example
	 * 		renderer.setColor( new Queen2D.Color2( "red" ) ); // using Queen2D.Color2
	 *		renderer.setColor( "red" ); // using String
	 **/
	
	var color;
	
	Object.defineProperty( this, 'color', {
		set: function( value ){
			if( typeof( value ) == "string" )
				color = value;
			else color = value.toString();
			
			if( this.style == QueenEngine.RendererStyle.Fill)
				this.context.fillStyle = color;
			else this.context.strokeStyle = color;
		},
		get: function(){
			return color;
		}
	} );

	/**
 	 * Set renderer drawing font
 	 *
	 * @method setFont
	 * @param {String} fontFamily 
	 * @param {Int} size
	 *
	 * @example
	 * 		renderer.setFont( "Arial", 40 );
	 **/
	
	var font = null;

	this.setFont = function( fontfamily, size ) {
		font = ( size || 20 ) + "px " + ( fontfamily || "Arial" );
		this.context.font = font;
	}

	/**
 	 * Set renderer drawing style ( "fill" or "stroke" )
 	 *
	 * @method setStyle
	 * @param {RendererStyle} style
	 *
	 * @example
	 * 		renderer.setStyle( "fill" ); 
	 *		// or
	 *		renderer.setStyle( "stroke" ); 
	 **/

	this.setStyle = function( style ){
		this.style = style || QueenEngine.RendererStyle.Fill;
	}

	/**
 	 * Begin Drawing session
 	 *
	 * @method begin
	 **/

	this.begin = function() {
		this.context.beginPath();
	}

	/**
 	 * End Drawing session
 	 *
	 * @method end
	 **/

	this.end = function() {
		if( this.style == QueenEngine.RendererStyle.Fill )
			this.context.fill();
		else this.context.stroke();
	}

	/**
 	 * Save current context 2d
 	 *
	 * @method save
	 **/

	this.save = function(){
		this.context.save();
	}

	/**
 	 * Restore saved context 2d
 	 *
	 * @method restore
	 **/

	this.restore = function(){
		this.context.restore();
	}
	
	/**
 	 * Rotate context
 	 *
	 * @method rotate
	 **/

	this.rotate = function( angle ){
		this.context.rotate( angle || 0.0 );
	}
	
	/**
 	 * Scale context
 	 *
	 * @method scale
	 **/

	this.scale = function( point2 ){
		if( typeof( point2 ) != "object" ) point2 = { x: 0, y: 0 };
		this.context.scale( point2.x, point2.y );
	}

	/**
 	 * Set line size
 	 *
	 * @method setLineWidth
	 * @param {Int} size
	 **/
	
	Object.defineProperty( this, 'lineWidth', {
		get: function(){
			return this.context.lineWidth;
		},
		set: function( value ){
			this.context.lineWidth = value;
		}
	} );

	/**
 	 * Move drawing anchor
 	 *
	 * @method moveTo
	 * @param {Point2 || Vector2} point2
	 **/

	this.moveTo = function( point2 ) {
		if( point2 == null ) return;
		this.context.moveTo( point2.x, point2.y );
	}

	/**
 	 * Draw a line to defined point
 	 *
	 * @method lineTo
	 * @param {Point2 || Vector2} point2
	 **/

	this.lineTo = function( point2 ) {
		if( point2 == null ) return;
		this.context.lineTo( point2.x, point2.y );
	}

	/**
 	 * Draw an arc
 	 *
	 * @method arc
	 * @param {Point2 || Vector2} position
	 * @param {Float} radius
	 * @param {Float} start_angle
	 * @param {Float} end_angle
	 **/

	this.arc = function( point2, radius, start_angle, end_angle ){
		this.context.arc( point2.x, point2.y, radius || 1, start_angle || 0, end_angle || 0);
	}

	/**
 	 * Draw a rectangle
 	 *
	 * @method rect
	 * @param {Point2 || Vector2} position
	 * @param {Float} width
	 * @param {Float} height
	 **/
	
	this.rect = function( point2, width, height ){
		if( this.style == QueenEngine.RendererStyle.Fill )
			this.context.fillRect( point2.x, point2.y, width || 0, height || 0 );
		else this.context.strokeRect( point2.x, point2.y, width || 0, height || 0 );
	}

	/**
 	 * Draw Circle
 	 *
	 * @method circle
	 * @param {Point2 || Vector2} position
	 * @param {Float} radius
	 **/

	this.circle = function( point2, radius, angle ){
		this.begin();
		this.arc( point2, radius, 0, angle || Math.PI * 2 );
		this.end();
	}

	/**
 	 * Draw a Shape
 	 *
	 * @method drawShape
	 * @param {Shape} shape
	 **/

	this.drawShape = function( shape ){
		if( shape == null ) return;
		
		shape.draw( this );
	}

	/**
 	 * Draw a text on screen
 	 *
	 * @method drawText
	 * @param {String} text
	 * @param {Point2 || Vector2} position
	 * @param {Float} width default null
	 **/

	this.drawText = function( text, point2, width ) {
		if( point2 == null ) return;
		
		this.context.font = font;
		
		if( width != null ){
			if( this.style == QueenEngine.RendererStyle.Fill )
				this.context.fillText( text, point2.x, point2.y, width );
			else this.context.strokeText( text, point2.x, point2.y, width );
		}
		else {
			if( this.style == QueenEngine.RendererStyle.Fill )
				this.context.fillText( text, point2.x, point2.y );
			else this.context.strokeText( text, point2.x, point2.y );
		}
	}

	/**
 	 * Draw a line
 	 *
	 * @method drawLine
	 * @param {Point2 || Vector2} begin_point
	 * @param {Point2 || Vector2} end_point
	 **/

	this.drawLine = function( point2_1, point2_2 ){
		if( point2_1 == null && point2_2 == null ) return;
		var temp = this.style;
		this.begin();
		this.setStyle( QueenEngine.RendererStyle.Stroke );
		this.moveTo( point2_1 );
		this.lineTo( point2_2 );
		this.end();
		this.style = temp;
	}

	/**
 	 * Draw Texture
 	 *
	 * @method drawTexture
	 * @param {Texture} texture
	 * @param {Point2 || Vector2} position
	 * @param {Point2} scale
	 * @param {Rectangle} rect
	 *
	 * @example
	 * 		renderer.drawTexture( texture, { x: 100, y: 100 } );
	 *		renderer.drawTexture( texture, { x: 100, y: 100 }, null, new Queen2D.Rectangle( {x:0,y:0}, 32, 32 ) ); // draw a piece of texture defined by rect
	 **/

	this.drawTexture = function( texture, point2, scale, rect ){
		if( texture == null || point2 == null ) return;
		if( rect != null ){
			if( scale == null ) scale = new QueenEngine.Point2( rect.width, rect.height );
			this.context.drawImage( texture, rect.position.x, rect.position.y, rect.width, rect.height,
						point2.x, point2.y, scale.x || 0, scale.y || 0 );
		}
		else {
			if( scale == null )
				this.context.drawImage( texture, point2.x, point2.y );
			else this.context.drawImage( texture, point2.x, point2.y, scale.x || 0, scale.y || 0 );
		}
	}
	
	// Constructor
	
	/**
	 * Represents page's device
	 *
	 * @attribute graphicDevice
	 * @type GraphicDevice
	 */

	this.graphicDevice = graphicDevice;
		
	this.style = "fill";
	this.color = "black";
	
	font = this.context.font;
}

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

QueenEngine.KeyCode = { 
	'keyF1': 112, 'keyF2': 113, 'keyF3': 114, 'keyF4': 115, 'keyF5': 116,
	'keF6': 117, 'keyF7': 118, 'keyF8': 119, 'keyF9': 120, 'keyF10': 121,
	'keyF11': 122, 'keyF12': 123,
	'keyUp': 38, 'keyDown': 40, 'keyLeft': 37, 'keyRight': 39, 
	'keyA': 65, 'keyB': 66, 'keyC': 67, 'keyD': 68, 'keyE': 69, 'keyF': 70,
	'keyG': 71, 'keyH': 72, 'keyI': 73, 'keyJ': 74, 'keyK': 75,
	'keyL': 76, 'keyM': 77, 'keyN': 78, 'keyO': 79, 'keyP': 80,
	'keyQ': 81, 'keyR': 82, 'keyS': 83, 'keyT': 84, 'keyU': 85,
	'keyV': 86, 'keyW': 87, 'keyX': 88, 'keyY': 89, 'keyZ': 90,
	'keyBackspace': 8, 'keyEsc': 27, 'keyPageUp': 33, 'keyPageDown': 34, 
	'keyCtrl': 17, 'keyEnter': 13, 'keyShift': 16, 'keyAlt': 18, 'keyTab': 9,
	'key1': 49, 'key2': 50, 'key3': 51, 'key4': 52, 'key5': 53,
	'key6': 44, 'key7': 55, 'key8': 56, 'key9': 57, 'key0': 48,
	'mouseLeft': 0, 'mouseMiddle': 1, 'mouseRight': 2,
	'padUp': 1, 'padDown': 2, 'padLeft': 4, 'padRight': 8, 'padOk': 16, 'padCancel': 32
};

QueenEngine.Keyboard = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.keys = {  };
	
	var bindThis = this;

	this.stopPropagation = false;

	this.isKeyPressed = function( keycode ){
		if( this.keys[ keycode ] ){
			delete this.keys[ keycode ];
			return true;
		} else return false;
	}
	this.isKeyDown = function( keycode ){
		return this.keys[ keycode ];
	}
	this.keyRelease = function( keycode ){
		delete this.keys[ keycode ];
	}
	function handleKeyDown( event ){
		this.keys[ event.keyCode ] = true; 
		if( this.stopPropagation && event.keyCode != Queen2D.KeyCode.keyF5 && event.keyCode != Queen2D.KeyCode.keyF11 ){
			event.stopPropagation();
			event.preventDefault();
		}
	}
	function handleKeyUp( event ){
		delete this.keys[ event.keyCode ]; 
		if( this.stopPropagation && event.keyCode != Queen2D.KeyCode.keyF5 && event.keyCode != Queen2D.KeyCode.keyF11 ){
			event.stopPropagation();
			event.preventDefault();
		}
	} 

	if( this.graphicDevice != null ){
		document.addEventListener( 'keydown', function( event ){ handleKeyDown.call( bindThis, event ); } );
		document.addEventListener( 'keyup', function( event ){ handleKeyUp.call( bindThis, event ); } );
	}
}

QueenEngine.Mouse = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.buttons = {  };
	this.x = null;
	this.y = null;
	
	var bindThis = this;

	this.isButtonPressed = function( buttoncode ){
		if( this.buttons[ buttoncode ] ) {
			delete this.buttons[ buttoncode ];
			return true;
		} else return false;
	}
	this.isButtonDown = function( buttoncode ){
		return this.buttons[ buttoncode ];
	}
	this.buttonRelease = function( buttoncode ){
		delete this.buttons[ buttoncode ];
	}
	this.isOut = function(){
		return ( this.x == null && this.y == null );
	}
	
	function handleMouseDown( event ){
		this.buttons[ event.button ] = true;
	}
	function handleMouseUp( event ){
		delete this.buttons[ event.button ];
	}
	function handleMouseOut( event ){
		this.x = this.y = null;
	}
	function handleMouseMove( event ){
		if( event.offsetX || event.offsetY ) {
			this.x = event.offsetX;
			this.y = event.offsetY;
		}  else if ( event.layerX || event.layerY ) {
			this.x = event.layerX - this.graphicDevice.canvas.offsetLeft;
			this.y = event.layerY - this.graphicDevice.canvas.offsetTop; 
		} 	
	}

	if( this.graphicDevice != null ){
		this.graphicDevice.addEventListener( 'mousedown', function( event ){ handleMouseDown.call( bindThis, event ); } );
		this.graphicDevice.addEventListener( 'mouseup', function( event ){ handleMouseUp.call( bindThis, event ); } );
		this.graphicDevice.addEventListener( 'mousemove', function( event ){ handleMouseMove.call( bindThis, event ); } );		
		this.graphicDevice.addEventListener( 'mouseout', function( event ){ handleMouseOut.call( bindThis, event ); } );
	}
}

QueenEngine.has_touch = ( 'ontouchstart' in window );

QueenEngine.isTouchDevice = function(){
	return QueenEngine.has_touch;
}

QueenEngine.TouchPad = function( graphicDevice ){
	this.graphicDevice = graphicDevice;
	this.x = null;
	this.y = null;
	this.isDown = false;
	
	var bindThis = this;

	function handleTouchStart( event ){
		this.isDown = true;
	}
	function handleTouchEnd( event ){
		this.isDown = false;
	}
	function handleTouchMove( event ){
		event.preventDefault();
		if( event.touches[ 0 ] ) {
			this.x = event.touches[ 0 ].pageX;
			this.y = event.touches[ 0 ].pageY;
		}
	}

	if( this.graphicDevice != null && QueenEngine.isTouchDevice() ){
		window.addEventListener( 'touchstart', function( event ){ handleTouchStart.call( bindThis, event ); } );
		window.addEventListener( 'touchend', function( event ){ handleTouchEnd.call( bindThis, event ); } );
		window.addEventListener( 'touchmove', function( event ){ handleTouchMove.call( bindThis, event ); } );
	}
}

QueenEngine.LoaderStatus = {
	QUEUE: 0, SUCCESS: 1, ERROR: -1
};

QueenEngine.Loader = function( basePath ){
	var basePath = basePath || "";

	var assets = {  };
	var downloadQueue = {  };
	this.successCount = 0;
	this.errorCount = 0;
	this.progressCount = 0;

	var bindThis = this;

	this.load = function( files ){
		for( var name in files )
			downloadQueue[ name ] = files[ name ];
	}
	function countDownloadQueue(){
		var counter = 0;
		for( var name in downloadQueue )
			counter++;
		return counter;
	}
	this.download = function( downloadCallback ){
		downloadCallback = downloadCallback || function(){  };
		this.reset();

		for( var name in downloadQueue ){
			var path = downloadQueue[ name ];
			var slice = path.split( '.' );
			if( slice.length > 1 ){
				var ex = slice[ 1 ];

				if( ex == 'png' || ex == 'jpg' || ex == 'bmp' || ex == "jpeg" ){
					QueenEngine.ImageLoader( basePath + downloadQueue[ name ], 
						function( obj ){ handleDownload.call( bindThis, obj, name ); } );
				}
				else if( ex == 'ogg' || ex == 'mp3' || ex == 'wav' ){
					QueenEngine.AudioLoader( basePath + downloadQueue[ name ], 
						function( obj ){ handleDownload.call( bindThis, obj, name ); } );
				}
			}
		}

		if( this.progressCount >= countDownloadQueue() )
			downloadCallback();
	}
	this.onsuccess = function(){  }
	this.onerror = function(){  }
	this.ondownloadcomplete = function(){  }
	function handleDownload( obj, name ){
		if( obj.status == QueenEngine.LoaderStatus.SUCCESS ){
			assets[ name ] = obj.resource;
			this.successCount++;
			this.onsuccess();
		}
		if( obj.status == QueenEngine.LoaderStatus.ERROR ){
			this.errorCount++;
			this.onerror();
		}

		if( this.isDone() )
			this.ondownloadcomplete();
	}
	this.isDone = function(){
		if( this.successCount + this.errorCount >= this.progressCount )
			return true;
		else return false;
	}
	this.reset = function(){
		this.successCount = 0;
		this.errorCount = 0;
		this.progressCount = 0;
	}
	this.clear = function(){
		this.reset();
		downloadQueue = {  };
		assets = {  };
	}
	this.exists = function( name ){
		for( var n in assets )
			if( name == n ) return true;
		return false;	 
	}
	this.get = function( name ){
		if( this.exists( name ) )
			return assets[ name ];
		else return null;
	}
	
	this.test = function(){
		return assets;
	}
}

QueenEngine.ImageLoader = function( url, downloadCallback ){
    var downloadCallback = downloadCallback || function(){  };
    var bindThis = this;
    var resource = new Image();
    this.status = QueenEngine.LoaderStatus.QUEUE;
    
    resource.addEventListener( "load", function( event ) {
        bindThis.status = QueenEngine.LoaderStatus.SUCCESS;			
        downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
    }, false);

    resource.addEventListener( "error", function( event ) {
        bindThis.status = QueenEngine.LoaderStatus.ERROR;		
        downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
    }, false);

    resource.src = url;
    return resource;
}
QueenEngine.AudioLoader = function( url, downloadCallback ){
	var downloadCallback = downloadCallback || function(){  };
	var bindThis = this;
	var resource = new Audio();
	this.status = QueenEngine.LoaderStatus.QUEUE;

	resource.addEventListener( "canplaythrough", function( event ) {
		bindThis.status = QueenEngine.LoaderStatus.SUCCESS;			
		downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
	}, false);

	resource.addEventListener( "error", function( event ) {
		bindThis.status = QueenEngine.LoaderStatus.ERROR;		
		downloadCallback( { 'resource': resource, 'status': bindThis.status } );	
	}, false);

	resource.src = url;
	return resource;
}

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
/**
 * @module Queen2D
 */

/**
 * Define a Shape
 *
 * @class Shape
 * @constructor
 * @abstract
 * @param {Point2 || Vector2} position
 * @param {String} type
 *
 */

QueenEngine.Shape = function( position, type ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	
	/**
	 *
	 * @attribute type
	 * @type stirng
	 * @default "unknown"
	 */

	this.type = type || "unknown";

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Shape} 
	 **/

	this.clone = function(){ 
		return new QueenEngine.Shape( this.position ); 
	}
}

/**
 * @module Queen2D
 */

/**
 * Define a Rectangle shape
 *
 * @class Rectangle
 * @constructor
 * @extend Shape
 * @param {Point2 || Vector2} position
 * @param {Float} width
 * @param {Float} height
 *
 */

QueenEngine.Rectangle = function( position, width, height ){
	QueenEngine.Shape.call( this, position, "rectangle" );

	/**
	 *
	 * @attribute width
	 * @type float
	 * @default 0
	 */

	this.width = width || 0;
	
	/**
	 *
	 * @attribute height
	 * @type float
	 * @default 0
	 */

	this.height = height || this.width || 0;

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){
		if( ( this.position.x + this.width ) > point2.x && this.position.x < point2.x ) 
			if( ( this.position.y + this.height ) > point2.y && this.position.y < point2.y ) 
				return true;
		return false;
	}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){
		renderer2.rect( this.position, this.width, this.height );
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Rectangle} 
	 **/

	this.clone = function(){
		return new QueenEngine.Rectangle( this.position, this.width, this.height );
	}
}

QueenEngine.Rectangle.prototype = new QueenEngine.Shape();

/**
 * @module Queen2D
 */

/**
 * Define a circle shape
 *
 * @class Circle
 * @constructor
 * @extend Shape
 * @param {Point2 || Vector2} position
 * @param {Float} radius
 * @param {Float} angle default Math.PI * 2
 *
 */

QueenEngine.Circle = function( position, radius, angle ){
	QueenEngine.Shape.call( this, position, "circle" );

	/**
	 *
	 * @attribute radius
	 * @type float
	 * @default 0
	 */

	this.radius = radius || 0;
	
	/**
	 *
	 * @attribute angle
	 * @type float
	 * @default Math.PI * 2
	 */

	this.angle = angle || Math.PI * 2;

	/**
	 * Indicates if this shape contains a specified point 
	 *
	 * @method contains
	 * @param {Point2 || Vector2} point2
	 * @return {Boolean} 
	 **/

	this.contains = function( point2 ){
		return ( this.position.distance( point2 ) < this.radius )
	}

	/**
	 * Draw this shape
	 *
	 * @method draw
	 * @param {Renderer2} renderer2
	 **/

	this.draw = function( renderer2 ){
		renderer2.circle( this.position, this.radius );
	}

	/**
	 * Return a clone of this object
	 *
	 * @method clone
	 * @return {Circle} 
	 **/

	this.clone = function(){
		return new QueenEngine.Circle( this.position, this.radius, this.angle );
	}
}

QueenEngine.Circle.prototype = new QueenEngine.Shape();

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

QueenEngine.cloneObject = function( object ){
	return object;
}

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


QueenEngine.BaseSprite = function( texture, position, rect ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	this.userData = 'basesprite';
	
	this.texture = texture;
	var sourceRectangle = rect.clone() || new QueenEngine.Rectangle( 0, 0, texture.width, texture.height );
	
	this.scale = null;

	this.debugColor = '#8080C0';
	
	Object.defineProperty( this, 'width', {
		get: function(){
			return sourceRectangle.width;
		}
	} );
	
	Object.defineProperty( this, 'height', {
		get: function(){
			return sourceRectangle.height;
		}
	} );
	
	Object.defineProperty( this, 'boundary', {
		get: function(){
			return new QueenEngine.Rectangle( this.position, this.width, this.height );
		}
	} );
	
	this.update = function( deltaTime ){
		this.onupdate( deltaTime );
	}
	this.onupdate = function( deltaTime ){  }
	this.draw = function( renderer ){
		renderer.drawTexture(
			this.texture, 
			this.position,
			this.scale,
			sourceRectangle
		);
		
		this.ondraw( renderer );
	}
	this.ondraw = function( renderer ){  }
	this.debug = function( renderer ){
		renderer.style = 'stroke';
		renderer.color = this.debugColor;
		renderer.rect( this.position, this.width, this.height );
	}
	this.clone = function(){
		var obj = new QueenEngine.Sprite.BaseSprite( this.texture, this.position, sourceRectangle );
		if( this.scale != null ) obj.scale = this.scale.clone();
		obj.debugColor = this.debugColor;
		obj.userData = this.userData;
		obj.update = this.update;
		obj.draw = this.draw;
		obj.onupdate = this.onupdate;
		obj.ondraw = this.ondraw;
		return obj;
	}
}


QueenEngine.AnimatedSprite = function( texture, position, animations ){
	( position ) ? ( this.position = new QueenEngine.Vector2( position.x, position.y ) ) : ( this.position = new QueenEngine.Vector2() )
	this.userData = 'animatedsprite';
	
	this.texture = texture;
	var animations = animations;
	this.isAnimating = true;
	var currentAnimation = null;
	
	for( name in animations ) {
		currentAnimation = name;
		break;
	}		
	
	this.scale = null;

	this.getWidth = function() {
		return animations[ currentAnimation ].getCurrentFrameRect().width;		
	}
	this.getHeight = function() {
		return animations[ currentAnimation ].getCurrentFrameRect().height;
	}
	this.getBoundary = function() {
		return new QueenEngine.Rectangle( this.position.x, this.position.y, 
			this.getWidth() * this.scale.x, this.getHeight() * this.scale.y );
	}
	this.setFramesPerSecond = function( frames ) {
		for( key in animations )
			animations[ key ].setFramesPerSecond( frames );
	}
	this.setAnimation = function( name ) {
		for( key in animations ) {
			if( name == key ){
				currentAnimation = name;
				break;
			}
		}
	}
	this.getCurrentAnimationSheet = function() {
		return animations[ currentAnimation ];
	}
	this.update = function( delta ) {
		if( currentAnimation != null && this.isAnimating ) {
			animations[ currentAnimation ].update( delta );
		}
		
		this.onupdate( delta );
	}
	this.onupdate = function( delta ){  }
	this.draw = function( spriteBatch ) {
		if( currentAnimation != null ) {
			var rect = animations[ currentAnimation ].getCurrentFrameRect();
			spriteBatch.drawTexture(
				this.texture, 
				this.position,
				this.scale,
				rect
			);
		}
		
		this.ondraw( spriteBatch );
	}
	this.ondraw = function( spriteBatch ){  }
	this.clone = function(){
		var anims = {  };
		if( animations != null ){
			for( var name in animations )
				anims[ name ] = animations[ name ].clone();
		}
		var obj = new QueenEngine.AnimatedSprite( this.texture, this.position, anims );
		obj.userData = this.userData;
		obj.isAnimating = this.isAnimating;
		obj.setAnimation( currentAnimation );
		if( this.scale != null ) obj.scale = this.scale.clone();
		obj.update = this.update;
		obj.onupdate = this.onupdate;
		obj.draw = this.draw;
		obj.ondraw = this.ondraw;
		return obj;
	}
}

QueenEngine.AnimationSheet = function( frames, framesPerSecond ){
	var frames = frames || [];
			
	var frameLength = 0;
	var _framesPerSecond = 0;
	
	var currentFrame = 0;
	var frameTimer = 0;
	
	Object.defineProperty( this, 'framesPerSecond', {
		set: function( value ){
			if( value < 1 )
				_framesPerSecond = 1;
			else if ( value > 60 )
				_framesPerSecond = 60;
			else
				_framesPerSecond = value;
			frameLength = 1 / _framesPerSecond;
		},
		get: function(){
			return _framesPerSecond;
		}
	} );
	
	this.getFrame = function() {
		return frames[ currentFrame ]; 
	}
	this.update = function( deltaTime ) {
		frameTimer -= deltaTime;
		
		if( frameTimer <= 0 ) {
			currentFrame = ( currentFrame + 1 ) % frames.length;
			frameTimer = frameLength;
		}   
	}
	this.reset = function() {
		currentFrame = 0;		
	}
	this.clone = function(){
		var obj = new QueenEngine.AnimationSheet( frames, framesPerSecond );
		return obj;
	}

	this.framewPerSecond = framesPerSecond || 0;
}
