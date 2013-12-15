
function btnRandom_clicked(){
    
    SearchModule.conditionRandom({}, function(result){
	    alert(JSON.stringify(result));
	}, function(){});
}

function btnSearch_clicked(){
    
    SearchModule.conditionSearch({}, 
	function(result){
	    for(var i in result){
		    alert(JSON.stringify(result[i]));
		}
	}, function(){});
}