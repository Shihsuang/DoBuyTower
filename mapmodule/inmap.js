/**
 * This is map module and this module could provide the any map
 * manipulate in this gaia app :Eat or Play
 * 
 * Basic functionality :initial the map 、get shop information into the window
 *  calculate the distance or depend on the distance which we specify to show the shop
 */


var map;
var locationData;
var infoWindow;
var marker;

function importGmapAPI(){
	/*
	 * add the script tag into html,load the api also
	 */
	var script = document.createElement('script');
	script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&key={API_KEY}&sensor=true";
	document.body.appendChild(script);
}

function init(shops){
	/*
	 * init the map and get user address by using Geolocation
	 * and set user address to center,then show out
	 */
	 var mapOptions = {
			 zoom : 10,
		     mapTypeId : google.maps.MapTypeId.ROADMAP
	 };
	 
	 map = new google.maps.Map (document.getElementById('map'),mapOptions);
	 
	 if(navigator.geolocation){
		 navigator.geolocation.getCurrentPosition(function(position){
			 var userPos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
			 
			 infoWindow = new google.maps.InfoWindow({
				 map : map,
				 position :userPos,
				 content:'Your location here.',
			 });
			 map.setCenter(userPos);
		 },function(){
			 handleNoGeolocation(true);
		 });
	 }else{
		// Browser doesn't support Geolocation
		 handleNoGeolocation(false);
	 }
	 
	 //if there are some shop need to be show on map
	 if(arguments!=null){
		 //start mark all shop out
		 for(var i in arguments){
			 //get shop info
			 var shop = shopInfo(arguments[i]);
			 //shop marker create
			 marker=new google.maps.Marker({
				 position : new google.naps.Latng(shop.latitude,shop.longitude),
				 map:map
			 });
			 /*
			  * add infoWindow display here : comment and shop name when purchase the maker
			  */
			 google.maps.event.addListener(maker,'click',function(){
				 infoWindow.setConent('embedded shop info');
				 infoWindow.open(map,this);
			 });
		 }
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
			position : new google.maps.LatLng(0,0),
			content : content
	};
	
	infoWindow = new google.maps.InfoWindow(options);
	map.setCenter(options.position);
}

//function getInfoWindow(shopInfoObject){
	/*
	 * shop infoWindow factory and
	 * using shopInfo to construct this
	 */
//	return infoWindow;
//}

function shopInfo(nameAndAddr){
	/*
	 * get shop address , comment ,and avg stars ,
	 * from database whatever from our's or everbody's
	 * after that feed those to getInfoWindow function
	 */
	if(shopName!=null){
		/*
		 * data base connect and using the encryption function to capture data
		 */
	}else{
		if(shopAddr!=null){
			//database connect and using the encryption function to capture data
		}else{
			alert("no data input or source error.");
		}
	}
	return null;
}

function calDistance(userAddr,shopAddr,limit){
	google.maps.LatLng.prototype.distanceFrom = function(lat,lng) {	
		var lat = [this.lat(), latlng.lat()]
		var lng = [this.lng(), latlng.lng()]
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
	
	var origin = new GLatLng(userAddr[0],userAddr[1]);
	var results = new Arrray();
	
	for(var i in shopAddr){
		var temp = shopInfo(shopAddr[i]);
		var destination = new GLatLng(temp.lat,temp.lng);
		distance = destination.ditanceFrom(origin);
		if(distance<limit){
			results.push(temp.name);
		}
	}
	return results;
}


//after all,Initializes the Google Map
//google.maps.event.addDomListener(window, 'load', init);

