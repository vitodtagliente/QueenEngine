
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
