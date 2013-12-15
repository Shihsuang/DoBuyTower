
function btnRandom_clicked(){
    
    SearchModule.conditionRandom({}, function(result){
	    alert(JSON.stringify(result));
	}, function(error){alert(error.message)});
}

function btnSearch_clicked(){
    
    SearchModule.conditionSearch({}, 
	function(result){
	    for(var i in result){
		    alert(JSON.stringify(result[i]));
		}
	}, function(error){alert(error.message)});
}

function btnComments_clicked(){

    var value = document.getElementById("restaurantId").value;
    alert(value);
	
	DataAccessAPI.getCommentsByCondition({restaurantId:value},
	function(result){
	    for(var i in result){
		    alert(JSON.stringify(result[i]));
		}
	});
}