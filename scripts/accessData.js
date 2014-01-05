/**
 * 
 */

var con_address = document.getElementById(elementId).innerHTML;
var con_distance = document.getElementById(elementId).innerHTML;
var con_category = document.getElementById(elementId).innerHTML;
var con_score = document.getElementById(elementId).innerHTML;

function conditions(address,distance,category,score){
	
	this.address = address;
	this.distance = distance;
	this.category = category;
	this.score = score;
	
	this.prototype.setConditions = function(){
		return JSON.stringify(conditions);
	};
	
}
var setConditions = new conditions(con_address,con_distance,con_category,con_score);

var run = new myStorage();

run.findData("restaurant",setConditions.setConditions(),true);