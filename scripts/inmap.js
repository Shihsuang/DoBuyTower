/**
 * stuID:102525017 gitID:radi9
 * 
 * This is map module and this module could provide the any map
 * manipulate in this gaia app :Eat or Play
 * 
 * Basic functionality :initial the map 、get shop information into the window
 *  calculate the distance or depend on the distance which we specify to show the shop
 */

/*//test data
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
*/

var map;
var locationData;
var infoWindow;
var marker = [];

var userCoordinate;
var userAddress;
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
			 userCoordinate = userpos;
			 userAddress = encodeAddress(position.coords.latitude,position.coords.longitude);

			 infoWindow = new google.maps.InfoWindow({
				 map : map,
				 position : userPos,
				 content : 'Your location here.',
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
	 if(arguments!=null){
		 shopMarker(arguments);
	 }
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
	/*
	 * get shop information into the map window
	 * if there are some shop need to be show on map
	 */
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

function shopInfo(shopsPos){
	/*
	 * get shop address , comment ,and avg stars ,
	 * by using shop address or shop gps coordinate
	 * from database whatever from our's or everbody's
	 * after that feed those to getInfoWindow function
	 */
	var results = new Array();
	for(var i in shopsPos){
		if(typeof(i)=='string'){
			 //parameter is shop name 
			return shopInfo;
		}else{
			if(typeof(i)=='number'){
				//parameter is shop coordinate
				results.push(i);
			}else{
				alert("no data input or source error.");
			}
		}
	}
	return results;
}

function codeAddress(address){
	/*
	 * translate address to coordinate
	 */
	 $.ajax({
         type: "post",
         dataType: "json",
         url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&sensor=false&language=zh-tw",
         success: function (data){
             if(data.status == "OK"){
            	 return data.results[0].geometry.location;
             }
         }});
}

function encodeAddress(lat,lng){
	
	$.ajax({
		type: "post",
		dataType: "json",
		url: "http://maps.google.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=true&language=zh-Tw",
		success:function (data){
			if(data.status == "OK"){
				return data.results[0].address_components;
			}
		}
	});
	
}
https://maps.googleapis.com/maps/api/geocode/json?address=

function assert(condition,message){
	//my assertion
	if(condition){
		throw message || "assertion failed";
	}
}


//after all,Initializes the Google Map
/*google.maps.event.addDomListener(window, 'load', init);*/

