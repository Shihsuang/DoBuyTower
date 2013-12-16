
var DataAccessAPI = {};

DataAccessAPI.getAllRestaurants = function(onSuccess, onError){
    onSucces(restuarants);
}

/*condition
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
DataAccessAPI.getRestaurantsByCondition = function(condition, onSuccess, onError){
    
	myStorage.indexedDB.searchRestaurants(condition, onSuccess);
	//資料來源:restaurants

	
	
	/*var result = new Array();
	var min = 0;
	var max = restaurants.length;
	//alert(max);
	if(condition.page){
		if(!isNaN(condition.page.min)){
			min = condition.page.min - 1;
			
		}
		
		if(!isNaN(condition.page.max)){
			max = condition.page.max;
		}
	}
	
	for(var i = min; i < max; i++){
	    result.push(restaurants[i]);
	}
	//alert("yo");
	onSuccess(result);*/
	
    //return result;

}

DataAccessAPI.addRestaurant = function (data){
    myStorage.indexedDB.addRestaurant(data);
}

DataAccessAPI.deleteRestaurant = function (id){
    myStorage.indexedDB.deleteRestaurant(id);
}

/*condtion 
{
    restaurantId:,
	date:{
	    max:,
		min:
	},
	score:{
	   max:,
	   min
	}
}
*/

DataAccessAPI.getCommentsByCondition = function(condition, onSuccess){

	/*for(var i in comments){
	    DataAccessAPI.addComments(comments[i]);
	}
	for(var i in restaurants){
	    DataAccessAPI.addRestaurant(restaurants[i]);
	}*/
	/*
	if(condition){
        if(!isNaN(condition.restaurantId)){
		
		    var result = new Array();
			for(var i in comments){
			    if(comments[i].restaurantId == condition.restaurantId){
				    result.push(comments[i]);
				}
			}
			onSuccess(result);
			
		}else{
		
		    var error = {
			    message: "restaurantId is NaN"
			}
			onError(error);
		}
    }else{
	    var error = {
			message: "condition not defined"
		}
	    onError(error);
	}*/
    myStorage.indexedDB.searchComments(condition, onSuccess);
}


DataAccessAPI.addComments = function (data){
    myStorage.indexedDB.addComments(data);
}

DataAccessAPI.deleteComments = function (id){
    myStorage.indexedDB.deleteComments(id);
}

