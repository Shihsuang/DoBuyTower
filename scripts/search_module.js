
var SearchModule = {};

function getPosition(callbackOnSuccess, callbackOnError){

    if ("geolocation" in navigator) {
        
		navigator.geolocation.getCurrentPosition(
	    function(position) {
           
		   callbackOnSuccess(position.coords.latitude, position.coords.longitude);
        },
	    callbackOnError);
		
    } else {
        alert("Geolocation Not Support");
    }
	
} 

/*SearchCondition 
{
    position:{
	    latitude:,
		longitutde:,
		distance:
	},
	category:2,
	
	//分數的範圍
	score:{
	    max:5,
		min:1,
	}

	//抓出第min筆資料到第max筆資料
	page:{
	    max:50,
		min:1,
	}
}
*/
SearchModule.conditionRandom = function(searchCondition, onSuccess, onError){
	getPosition(function(latitude, longitude){
	    //alert("456");
		 
	    DataAccessAPI.getRestaurantsByCondition(searchCondition,
        function(rest){		
			if(rest.length > 0){
			    var nth = Math.floor((Math.random() * rest.length)); //a random number between 0 ~ rest.length -1
				onSuccess(rest[nth]);
			}else{
				var error = {
					code : 4,
					message : "No restaurants are found!"
				}
				onError(error);
				return;
			}
		}, onError);
	}, onError);
}

SearchModule.conditionSearch = function(searchCondition, onSuccess, onError){

    getPosition(function(latitude, longitude){
        //alert("ohiyo");
	    DataAccessAPI.getRestaurantsByCondition(searchCondition,
        function(rest){		
			if(rest.length > 0){
				onSuccess(rest);
			}else{
				var error = {
					code : 4,
					message : "No restaurants are found!"
				}
				//onError(error);
				return;
			}
		}, onError);
	}, onError);
	
}




