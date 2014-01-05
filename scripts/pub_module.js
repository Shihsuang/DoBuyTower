function loadScript(src){
	//add script
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	document.body.appendChild(script);
}

function insertTag(parentId,type,content,number){
	//parser(content);
	var element = document.createElement(type);
	var leaf = document.createTextNode(content);
	element.appendChild(content);
	
	for(var i=0;i<=number;i++){
		document.getElementById(parentId).appendChild(element);
	}
}

function isChinese(input){
	//check Chinese
	var regx = /[^\u4e00-\u9fa5]/;
	if(regx.test(input)){
		return false;
	}else{
		return true;
	}
}

function is_array(v){
 return !!v &&
 typeof v === 'object' &&
 typeof v.length === 'number' &&
 typeof v.splice === 'function' &&
 !(v.propertyIsEnumerable('length'));
}

function parser(){
	//analyze the data input is xml or json or pure txt
	//then paser into array
	var result = new Array();
	for(var i=0;i<arguments.length;i++){
		result[i] = arguments.split(',')[i];
	}
	return result;
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

function assert(condition,message){
	if(condition){
		throw message || "assertion failed";
	}
}
