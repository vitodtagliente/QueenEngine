
QueenEngine.AudioType = { 'ogg': 'audio/ogg', 'wav': 'audio/wav', 'mp3': 'audio/mp3' };

QueenEngine.isSupportedAudioFormat = function( audioType ){
	var audio = new Audio();
	
    var returnExtension = "";
    if (audio.canPlayType( audioType ) == "probably" || audio.canPlayType( audioType ) == "maybe") {
		delete audio;
		return true;
    }
    delete audio;
    return false;
}

 QueenEngine.AudioPlayer = function( sounds ){
 	var sounds = sounds || {  };

 	this.add = function( sndName, sndData ){
		if( !this.exists( sndName ) ){
			sounds[ sndName ] = sndData;
		} else return false;
	}
	this.exists = function( name ){
		for( var n in sounds )
			if( n == name ) return true;
		return false;
	}
	this.remove = function( name ){
		if( this.exists( name ) ) {
			if( this.isPlaying( name ) ) sounds[ name ].stop();
			delete sounds[ name ];		
		}
	}
	this.play = function( name, loop ) {
		if( loop == null ) loop = false;
		
		if( this.exists( name ) ){
			//var thistime = new Date().getTime();
			//if ( this.sounds[ name ].timeFinished < thistime ) {
				//this.sounds[ name ].timeFinished = thistime + this.sounds[ name ].duration * 1000;
				if( loop ) sounds[ name ].loop = loop;
				sounds[ name ].play();
			//}
		}
	}
	this.isPlaying = function( name ) {
		if( this.exists( name ) )
			return !sounds[ name ].paused;
		else return null;
	}
	this.stop = function( name ) {
		if( this.exists( name ) ) {
			sounds[ name ].timeFinished = -1;
			sounds[ name ].load();
		}
	}
	this.pause = function( name ){
		if( this.exists( name ) ) 
			sounds[ name ].pause();
	}
 }
