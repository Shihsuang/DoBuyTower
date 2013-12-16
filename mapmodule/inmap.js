/**
 * This is map module and this module could provide the any map
 * manipulate in this gaia app :Eat or Play
 * 
 * Basic functionality :initial the map 、get shop information into the window
 *  calculate the distance or depend on the distance which we specify to show the shop
 */

//test data
var restaurants = [
    {
	    id:1,
        name:"摩斯漢堡",
	    position:{
	        latitude:26,
		    longitude:120
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["速食", "美式"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	},
    {
	    id:2,
        name:"野味便當店",
	    position:{
	        latitude:22,
		    longitude:113
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["便當", "簡餐"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	}
	];

var shop1 = restaurants[0];
var shop2 = restaurants[1];
//end test data


var map;
var locationData;
var infoWindow;
var marker = [];

function init(){
	/*
	 * init the map and get user address by using Geolocation
	 * and set user address to center,then show out
	 */
	 
	 var mapOptions = {
			 zoom : 12,
		     mapTypeId : google.maps.MapTypeId.ROADMAP
	 };
	 
	 map = new google.maps.Map (document.getElementById('map'),mapOptions);
	 
	 if(navigator.geolocation){
		 navigator.geolocation.getCurrentPosition(function(position){
			 var userPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

			 infoWindow = new google.maps.InfoWindow({
				 map : map,
				 position : userPos,
				 content : 'Your location here.',
	             icon : 'http://labs.google.com/ridefinder/images/mm_20_green.png'
			 });
			 map.setCenter(userPos);
		 },function(error){
			 //error handling
			 handleNoGeolocation(true);
			 switch(error.code){
			 case error.TIMEOUT:
				 alert('connection timeout');
				 break;
			 case error.POSITION_UNAVAILABLE:
				 alert('position unavailable');
				 break;
			 case error.PERMISSION_DENIED:
				 alert('please turn on the GPS functional');
				 break;
			 case error.UNKNOWN_ERROR:
				 alert('unknown error sorry.');
				 break;
			 }
		 });
	 }else{
		// Browser doesn't support Geolocation
		 handleNoGeolocation(false);
	 }
	 shopMarker(shop1,shop2);
}

function handleNoGeolocation(errorFlag) {
	var content;
	var options;
	
	if(errorFlag){
		content = 'Error : The Geolocation service failed.';
	}else{
		content = 'Error : Your browser doesn\'t support Geolocation.';
	}
	
	options={
			map : map,
			position : new google.maps.LatLng(24.960856399999997,121.22613720000001),
			content : content
	};
	
	infoWindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

function shopMarker(){
	 //if there are some shop need to be show on map
	 if(arguments!=null){
		 //start mark all shop out
		 for(var i in arguments){
			 //get shop info
			 //var shop = shopInfo(arguments[i].position);
			 //shop marker create
			 var shopName = arguments[i].name;
			 var shopScore = arguments[i].comments[0].score;
			 var shopAddress = arguments[i].address;
			 marker=new google.maps.Marker({
				 position : new google.maps.LatLng(arguments[i].position.latitude,arguments[i].position.longitude),
				 map : map,
			 });
			 
			 //add infoWindow display here : comment and shop name when purchase the maker
			  
			 google.maps.event.addListener(marker,'click',(function(marker,i){
				 return function(){
					 infoWindow.setContent("shop name : "+shopName+"<br>"+"shop score : "+shopScore+"<br>"+"shop addr : "+shopAddress);
					 infoWindow.open(map,marker);
				 }
			 })(marker,i));
		 }
	 }else{
		 return false;
	 }
}

//function shopInfo(shopsPos){
	/*
	 * get shop address , comment ,and avg stars ,
	 * by using shop address or shop gps coordinate
	 * from database whatever from our's or everbody's
	 * after that feed those to getInfoWindow function
	 */
//	var results = new Array();
//	for(var i in shopsPos){
//		if(typeof(i)=='string'){
//			 //parameter is shop name 
//			return shopInfo;
//		}else{
//			if(typeof(i)=='number'){
//				//parameter is shop coordinate
//				results.push(i);
//			}else{
//				alert("no data input or source error.");
//			}
//		}
//	}
//	alert(results[0]);
//	return results;
//}

function calDistance(user,shops,limit){
	/*
	 * Great-circle distance formula approach to implement distance
	 * between two point when given latitude and longitude
	 * formula :  
	 */
	google.maps.LatLng.prototype.distanceFrom = function(latlng) {	
		var lat = [this.lat(), latlng.lat()];
		var lng = [this.lng(), latlng.lng()];
		var R = 6378137;
		var dLat = (lat[1]-lat[0]) * Math.PI / 180;
		var dLng = (lng[1]-lng[0]) * Math.PI / 180;
		var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat[0] * Math.PI / 180 ) * Math.cos(lat[1] * Math.PI / 180 ) *
		Math.sin(dLng/2) * Math.sin(dLng/2);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
		var d = R * c;
		return Math.round(d);
	}
	
	var origin = new GLatLng(userCoordinate.latitude,userCoordinate.longitude);
	var results = new Arrray();
	
	for(var i in shops){
		var destination = new GLatLng(shops[i].position.latitude,shops[i].position.longitude);
		distance = destination.ditanceFrom(origin);
		if(distance<limit){
			results.push(temp.name);
		}
	}
	return results;
}


//after all,Initializes the Google Map
google.maps.event.addDomListener(window, 'load', init);

