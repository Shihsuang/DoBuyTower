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

function parser(){
	//analyze the data input is xml or json or pure txt
	//then paser into array
	var result = new Array();
	for(var i=0;i<arguments.length;i++){
		result[i] = arguments.split(',')[i];
	}
	return result;
}

function assert(condition,message){
	if(condition){
		throw message || "assertion failed";
	}
}