
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
