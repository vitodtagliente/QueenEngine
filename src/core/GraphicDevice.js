
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
