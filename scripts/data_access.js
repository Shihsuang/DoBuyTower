
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
	
    myStorage.indexedDB.searchComments(condition, onSuccess);
}


DataAccessAPI.addComments = function (data){
    myStorage.indexedDB.addComments(data);
}

DataAccessAPI.deleteComments = function (id){
    myStorage.indexedDB.deleteComments(id);
}

