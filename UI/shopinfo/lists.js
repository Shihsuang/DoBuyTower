/* show list of shops or comments */
function data(rec) {
	//alert(rec);
	// get the num of shops/comments first
    var num = rec.length;
	// get the arguments
	var arguments = new Array(num-1);
	for(var i = 0 ; i < num ; i++){
		arguments[i] = rec[i];
		//alert(arguments[i]);
	}
	var content = document.getElementById("lists");
	//alert(content);
	// use innerHTML to add a seperate line

	content.innerHTML += "<hr/>";
	
	// generate the lists by innerHTML with for loop
	for(var i = 0 ; i < num; i++)
	{
		//alert(i);
		content.innerHTML += "<div>"+arguments[i]+"</div>";
		content.innerHTML += "<hr/>";
	}
};
