function btnRandom_clicked(){
    
    SearchModule.conditionRandom({}, 
	function(result){
		localStorage.setItem("res",JSON.stringify( result ));
	    location.href='showrandom.html';
	}, function(error){alert(error.message)});
}

function btnSearch_clicked(){
    
    SearchModule.conditionSearch({}, 
	function(result){
		localStorage.setItem("res",JSON.stringify( result ));
	    location.href='showsearch.html';
	}, function(error){alert(error.message)});
}

function btnComments_clicked(){

    var value = document.getElementById("restaurantId").value;
    alert(value);
	
	DataAccessAPI.getCommentsByCondition({restaurantId:value},
	function(result){
		localStorage.setItem("res",JSON.stringify( result ));
	    location.href='showcomment.html';
	});
}

