
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
		var nth = Math.floor((Math.random() * 5) + 1); //a random number between 1-5 
		searchCondition.page = {
		    max:nth,
			min:nth
		}
		
	    DataAccessAPI.getRestaurantsByCondition(searchCondition,
        function(rest){		
			if(rest.length > 0){
			    //alert("ohiyo");
				onSuccess(rest[0]);
			}else{
				var error = {
					code : 4,
					message : "No restaurants are found!"
				}
				onError(error);
			}
		}, onError);
	}, onError);
}

SearchModule.conditionSearch = function(searchCondition, onSuccess, onError){

    getPosition(function(latitude, longitude){

	    var rest = DataAccessAPI.getRestaurantsByCondition(searchCondition); 
		if(rest.length > 0){
		    onSuccess(rest);
		}else{
		    var error = {
			    code : 4,
				message : "No restaurants are found!"
			}
			onError(error);
		    return;
		}
	}, onError);
	
}




