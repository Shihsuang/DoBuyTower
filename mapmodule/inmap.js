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

function calDistance(lat1, lon1, lat2, lon2){
	/*
     *Calculates geodetic distance between two points specified 
     *by latitude/longitude using Vincenty inverse formula for ellipsoids
     *ref : http://www.movable-type.co.uk/scripts/latlong-vincenty.html
	 */
	// WGS-84 ellipsoid params
	
	assert(typeof(lat1+lon1+lat2+lon2)!=number,"input error");
	
	var a = 6378137;
	var b = 6356752.314245;
	var f = 1/298.257223563;
	
	var L = (lon2-lon1).toRad();
	var U1 = Math.atan((1-f) * Math.tan(lat1.toRad()));
	var U2 = Math.atan((1-f) * Math.tan(lat2.toRad()));
	var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
	var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);
	
	var lambda = L, lambdaP, iterLimit = 100;
	
	//keep calculate for correct until lambda converge
	do{
		var sinLambda = Math.sin(lambda), cosLambda = Math.cos(lambda);
		var sinSigma = Math.sqrt((cosU2*sinLambda) * (cosU2*sinLambda) + 
				(cosU1*sinU2-sinU1*cosU2*cosLambda) * (cosU1*sinU2-sinU1*cosU2*cosLambda));
		if (sinSigma==0) return 0;  // co-incident points
		var cosSigma = sinU1*sinU2 + cosU1*cosU2*cosLambda;
		var sigma = Math.atan2(sinSigma, cosSigma);
		var sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
		var cosSqAlpha = 1 - sinAlpha*sinAlpha;
		var cos2SigmaM = cosSigma - 2*sinU1*sinU2/cosSqAlpha;
		if (isNaN(cos2SigmaM)) cos2SigmaM = 0;  // equatorial line: cosSqAlpha=0 (§6)
		var C = f/16*cosSqAlpha*(4+f*(4-3*cosSqAlpha));
		lambdaP = lambda;
		lambda = L + (1-C) * f * sinAlpha *
		         (sigma + C*sinSigma*(cos2SigmaM+C*cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)));
	}while (Math.abs(lambda-lambdaP) > 1e-12 && --iterLimit>0);
	
	
	 if (iterLimit==0) return NaN;  // formula failed to converge

	 var uSq = cosSqAlpha * (a*a - b*b) / (b*b);
	 var A = 1 + uSq/16384*(4096+uSq*(-768+uSq*(320-175*uSq)));
	 var B = uSq/1024 * (256+uSq*(-128+uSq*(74-47*uSq)));
	 var deltaSigma = B*sinSigma*(cos2SigmaM+B/4*(cosSigma*(-1+2*cos2SigmaM*cos2SigmaM)-
	    B/6*cos2SigmaM*(-3+4*sinSigma*sinSigma)*(-3+4*cos2SigmaM*cos2SigmaM)));
	 var s = b*A*(sigma-deltaSigma);
	  
	 s = s.toFixed(3); // round to 1mm precision
	 return s;
	  
	  // note: to return initial/final bearings in addition to distance, use something like:
	 var fwdAz = Math.atan2(cosU2*sinLambda,  cosU1*sinU2-sinU1*cosU2*cosLambda);
	 var revAz = Math.atan2(cosU1*sinLambda, -sinU1*cosU2+cosU1*sinU2*cosLambda);
	 return { distance: s, initialBearing: fwdAz.toDeg(), finalBearing: revAz.toDeg() };
}

function codeAddress(address){
	/*
	 * translate address to coordinate
	 */
	geocoder.geocode({'address' : address },function(results,status){
		if(status==google.maps.GeocoderStatus.OK){
			return results[0].geometry.location;
		}else{
			assert(true,"no data out");
		}
	});
}

function assert(condition,message){
	//my assertion
	if(condition){
		throw message || "assertion failed";
	}
}


//after all,Initializes the Google Map
/*google.maps.event.addDomListener(window, 'load', init);*/

