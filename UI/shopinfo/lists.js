/* show list of shops or comments */
window.onload = function () {
	// get the num of shops/comments first
    var num = 10;
	// get the arguments
	var arguments = new Array(num-1);
	for(var i = 0 ; i < num ; i++)
		arguments[i] = "commets"+(i+1);
	var content = document.getElementById("lists");
	// use innerHTML to add a seperate line
	content.innerHTML += "<hr></hr>";
	// generate the lists by innerHTML with for loop
	for(var i = 0 ; i < num; i++){
		content.innerHTML += "<div>"+arguments[i]+"</div>";
		content.innerHTML += "<hr></hr>";
	}
};