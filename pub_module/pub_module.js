function loadScript(src){
	//add script
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	document.body.appendChild(script);
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

function parser(){
	//analyze the data input is xml or json or pure txt
	//then paser into array
	var result = new Array();
	for(var i=0;i<arguments.length;i++){
		result[i] = arguments.split(',')[i];
	}
	return result;
}