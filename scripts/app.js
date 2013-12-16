
function btnRandom_clicked(){
    
    SearchModule.conditionRandom({
	    position:{
		    latitude:42.98937,
			longitude:-123.456
		},
		category: 2,
		score:{
		    min:1,
			max:5
		},
		page:{
	        max:50,
		    min:1,
	    }
	}, function(result){
	    alert(JSON.stringify(result));
	}, function(error){alert(error.message)});
}

function btnSearch_clicked(){
    
    SearchModule.conditionSearch({
	    position:{
		    latitude:42.98937,
			longitude:-123.456
		},
		category: 2,
		score:{
		    min:1,
			max:5
		},
		page:{
	        max:50,
		    min:1,
	    }
	}, 
	function(result){
	    for(var i in result){
		    alert(JSON.stringify(result[i]));
		}
	}, function(error){alert(error.message)});
}

function btnComments_clicked(){

    var value = document.getElementById("restaurantId").value;
    //alert(value);
	
	DataAccessAPI.getCommentsByCondition(
	{
	    restaurantId:value,
		date:{
		    min:new Date('12/11/2013'),
			max:new Date()
		},
		score:{
		   min:1,
		   max:5
		}
	},
	function(result){
	    for(var i in result){
		    alert(JSON.stringify(result[i]));
		}
	});
}