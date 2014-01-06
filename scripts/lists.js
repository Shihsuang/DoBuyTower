
var category = ["", "吃", "玩"];

/* show list of shops or comments */
function _data(rec) {
	//alert(rec);
	// get the num of shops/comments first
    var num = rec.length;
	// get the arguments
	/*var arguments = new Array(num-1);
	for(var i = 0 ; i < num ; i++){
		arguments[i] = rec[i];
		//alert(arguments[i]);
	}*/

	var content = document.getElementById("lists");
	//alert(content);
	// use innerHTML to add a seperate line

	content.innerHTML += "<hr/>";
	
	// generate the lists by innerHTML with for loop
	for(var i = 0 ; i < num; i++)
	{
		//alert(i+" "+rec[i].name);
		content.innerHTML += '<div class="res">'+ '<div>' + rec[i].name + '</div>'+ '<div>' + rec[i].address + '</div>'
		                   + '<div>' + category[rec[i].category] + '</div>'+ '<div>' + "(" + rec[i].position.latitude + "," + rec[i].position.longitude + ")" + '</div>' + "</div>";
		content.innerHTML += "<hr/>";
		
	}
}
function resList(){
    var ddb = new myStorage();
	ddb.conn();
	var tmpdata = {

	   		"name": '野味',
			"position": {"latitude":123.3,"longitude":10.33},
			"category": 'aa',
			"address": 'aa',
			"city": 'aa',
			"county": 'aa' 
	};
//alert("1");
	//temppp=JSON.stringify(tmpdata);
	var res = ddb.findData("restaurant", tmpdata, false, zzzshowAll);
    ddb.close();
}
	function zzzshowAll(indata){
		//alert("zzz");
		var azz = new Array();
		for(var i=0;i<indata.length;i++){
	        azz[i]=indata[i];
	    }
	    //alert(indata[0].name);
		_data(azz);
    }
