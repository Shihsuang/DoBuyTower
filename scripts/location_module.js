var LocationModule = {};

LocationModule.getPosition = function(callbackOnSuccess, callbackOnError){

    if ("geolocation" in navigator) {
        
		navigator.geolocation.getCurrentPosition(
	    function(position) {
           
		   callbackOnSuccess(position.coords.latitude, position.coords.longitude);
        },
	    callbackOnError);
		
    } else {
        callbackOnError();
    }
} 