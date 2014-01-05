

function loadMode(){

	var mode = localStorage["mode"];
    //alert(mode);
    if(mode == 2){

    	$("#mode img").attr("src", "images/men.png");

    }else{
        $("#mode img").attr("src", "images/man.png");

    }

}

function switchMode(){

    //alert("123");
    if(localStorage["mode"] == 2){
	    localStorage["mode"] = 1;
    }else{
    	localStorage["mode"] = 2;
    }
    loadMode();
}