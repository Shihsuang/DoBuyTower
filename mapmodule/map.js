/**
 * This is map module and this module could provide the any map
 * manipulate in this gaia app :Eat or Play
 * 
 * Basic functionality :initial the map 、get shop information into the window
 *  calculate the distance or depend on the distance which we specify to show the shop
 */
var mapObject;
var locationData;
var userInfoWindow;

var shopName;
var shopCoordinateX;
var shopCoordinateY;

function importGmapAPI(){
	var script = document.createElement('script');
	script.src = "http://maps.googleapis.com/maps/api/js?parameter";
	document.body.appendChild(script);
}

function parser(){
	/*
	 * parser coordiate [0.332323,0,332323232],array to 2 numbers 
	 */
}

function init(shopNumber){
	/*
	 * init the map and get user address by using Geolocation
	 * and set user address to center
	 */
	 var marker;
	 var mapOptions = {
			 zoom : 8,
		     mapTypeId : google.maps.MapTypeId.ROADMAP
	 };
	 
	 mapObject = new google.maps.Map (document.getElementById('map'),mapOptions);
	 
	 if(navigator.geolocation){
		 navigator.geolocation.getCurrentPosition(function(position){
			 var userPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			 
			 var userInfoWindow = new google.maps.InfoWindow({
				 map : mapObject,
				 position :pos,
				 content:'your location here',
			 });
			 map.setCenter(userPos);
		 },function(){
			 handleNoGeolocation(true);
		 });
	 }else{
		// Browser doesn't support Geolocation
		 handleNoGeolocation(false);
		 alter("not support Geolocation");
	 }
	 
	 if(arguments!=null){
		 
		 for(i=0;i<arguments.length;i++){
			 //shop marker create
			 marker=new google.maps.Marker({
				 position : new google.naps.Latng(latitude,longitude),
				 map:mapObject
			 });
		 }
		 /*
		  * add infoWindow display here : comment and shop name when purchase the maker
		  */
	 }
	
}

function getInfoWindow(shopInfoObject){
	/*
	 * shop infoWindow factory and
	 * using shopInfo to construct this
	 */
	return infoWindow;
}

function shopInfo(shopName,shopAddr){
	/*
	 * get shop address , comment ,and avg stars ,
	 * from database whatever from our's or everbody's
	 * after that feed those to getInfoWindow
	 */
	if(shopName!=null){
		/*
		 * data base connect and using the encryption function to capture data
		 */
	}else{
		if(shopAddr!=null){
			//database connect and using the encryption function to capture data
		}else{
			alert("no data input or source error");
		}
	}
	return null;
}

function calDistance(userAddr,shopAddr){
	/*
	 * this function will be proceed in next edition after dicuz that calculate distance in which module
	 * 
	 * if decided doing on me,api free to use
	 */
}

