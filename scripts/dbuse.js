/**
 * 
 */

function myStorage(){

/*
* define myStorage prototype method list
*/

this.prototype.conn = conn;
this.prototype.closeDB = closeDB;
this.prototype.createObjectStore = createObjectStore;
this.prototype.delCollect = delCollect;
this.prototype.insertData = insertData;
this.prototype.updateRes = updateRes;
this.prototype.delData = delData;

this.prototype.findData = findData;

//this.prototype.deleteDB = deleteDB;
}

var request;
var db;

var collect_restStore;
var collect_commStore;

/*var trans;*/
var modify_request;

/*
 * function
 */


//connect fucntion and extra all common event like : onsuccess,onerror,onupgradeneeded
function conn (){
	
	var indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
	var request = indexedDB.open("eatplay");
	
	request.onsuccess = function(event) {
		console.log("database open success:" + request.result);
/*		db = request.target.tresult;*/
		db = request.result;
	};
	request.onupgradeneeded = function(event) {
		createObjectStore(event.target.result);
	};
	request.onerror = function(event) {
		console.log("database open error:" + request.errorCode);
	};
	

/* //original
   //normal manipulate in database 
	request.onsuccess = function(e){
		db = e.target.result;
	};
	
	//onupgradeneeded allow update or delete the data base
	request.onupgradeneeded = function(e){
		db = e.target.result;
	}*/
}

//close db
function closeDB() {
	var dbName = db.name;
	if (db) {
		var request = db.close();
		console.log("database:" + dbName + " is closed.");
	}
}

//modify ,store or update the database version
function createObjectStore(db){
	
/*	if(db.objectStoreNames.contains("restaurant")){
		alert("restaurant already exist");
	}else{
		if(collectName=="restaurant"){
			restStore = db.createObjectStore(collectName, { keyPath: "id", autoIncrement : true });
			restStore.createIndex("condition", ["position.latitude", "position.longitude", "category"]);
			objectStore.createIndex("id", "id", {
				unique : true
			});
			objectStore.createIndex("name", "name", {
				unique : true
			});
		}else if(collectName=="comments"){
			commStore = db.createObjectStore(collectName, { keyPath: "id", autoIncrement : true });
			commStore.createIndex("condition", ["restaurantId", "date", "score"]);
			objectStore.createIndex("id", "id", {
				unique : true
			});
		}else{
			alert("error collection name");
		}
	}*/
	if(db.objectStoreNames.contains("restaurant")) {
		var storeReq = db.deleteObjectStore("restaurant");
	}
	var restStore = db.createObjectStore("restaurant", { keyPath: "id", autoIncrement : true });
	restStore.createIndex("condition", ["position.latitude", "position.longitude", "category"]);
	/*if (db.objectStoreNames.contains("category")) {
		var storeReq = db.deleteObjectStore("category");
	}
	db.createObjectStore("category", { keyPath: "id", autoIncrement : true });*/
	
	if (db.objectStoreNames.contains("comments")) {
		var storeReq = db.deleteObjectStore("comments");
	}
	var commStore = db.createObjectStore("comments", { keyPath: "id", autoIncrement : true });
	commStore.createIndex("condition", ["restaurantId", "date", "score"]);
}

//delete collection
function delCollect(collectName){
	
	if(db.objectStoreNames.contains(collectName)){
		db.deleteObjectStore(collectName);
	}else{
		alert("collect not exist or unknown error");
	}
}

//insert data into specify collection
function insertData(collectName,data){
	
	assert(db=null,"connect first");
	
	var trans = db.transaction([collectName],IDBTransactionModes.READ_WRITE);
	var store = trans.objectStore(collectName);
	var resData = {
			"name": data.name,
			"position": {"latitude":data.position.latitude,"longitude":data.position.longitude},
			"category": data.category,
			"phone": data.phone,
			"address": data.address,
			"city": data.city,
	};
	var comData = {
			"restaurantId":data.restaurantId,
			"date":data.date, 
			"score":data.score, 
			"comment":data.comment, 
			"pictures":data.pictures
	};
	if(collectName=="restaurant"){
		modify_request = store.put(resData);
	}else if(collectName=="comments"){
		modify_request = store.put(comData);
	}
	modify_request.oncomplete = function(e){
		db.close();
	};
	modify_request.onerror = function(e) {
		console.log("Error Adding: ", e);
	};
}

//
function updateRes(id,newText){
	
	var trans = db.transaction(["restaurant"], IDBTransactionModes.READ_WRITE);
	var store = trans.objectStore("restaurant");
	var openCursorReq = store.openCursor(IDBKeyRange.only(id));
	
	openCursorReq.onsuccess = function (event) {
		var cursor = event.target.result;
		var _object = cursor.value;
		
		_object.name = newText.name;
		_object.position.latitude=newText.position.latitude;
		_object.position.longitude=newText.position.longitude;
		_object.catagory=newText.catagory;
		_object.phone=newText.phone;
		_object.address=newText.address;			
		
		var updateRequest = cursor.update(_object);
		updateRequest.onerror = updateRequest.onblocked = function () {
			console.log('Error updating');
		};

		updateRequest.onsuccess = function (event) {
			clearInput();
		};
		
		trans.oncomplete = function(e) {
			db.close();
		};
	};
	
}


function delData(collectName,id){

	var trans = db.transaction([collectName], IDBTransactionModes.READ_WRITE);
	var store = trans.objectStore(collectName);
	modify_request = store.delete(id);

	modify_request.oncomplete = function(e) {
		db.close();
		obj.disabled = true;
	};

	modify_request.onerror = function(e) {
		console.log("Error Adding: ", e);
	};
}

//not finished yet : basci condition pass in and return json array
//condition is a type : address or name , that's not a really address : 台灣省....etc
function findData(collectName,condition,random){
	
    var trans = db.transaction([collectName], IDBTransactionModes.READ_ONLY);
    var store = trans.objectStore(collectName);
    var index;
    
    var d_return = function(dataset,random){
    	if(random){
    		var maxNum = (dataset.length-1);  
    		var minNum = 0;
    		var n = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
    		return dataset[n];
    	}else{
    		return dataset;
    	}
    };
    
    if(condition.address){
    	index = store.index("address");
    	modify_request = store.get(condition.address);
        return d_return(modify_request,random);
    }else if(condition.name){
    	index = store.index("name");
    	modify_request = store.get(condition.name);
        return d_return(modify_request,random);
    }else if(condition.category){
    	index = store.index("category");
    	modify_request = store.get(condition.category);
        return d_return(modify_request,random);
    }else if(condition.score){
    	index = store.index("score");
    	modify_request = store.get(condition.score);
        return d_return(modify_request,random);
    }
    
/*           request.onsuccess = function(e) {
            onSuccess(e.target.result);
    };
    
    trans.oncomplete = function(e) {
            db.close();
    };

    request.onerror = function(e) {
            console.log("Error Getting: ", e);
    };*/
}

/*function deleteDB(){
	
	var deleteRequest = indexedDB.deleteDatabase("eatplay");
    deleteRequest.onsuccess = function (e)
    {
		alert("deleted");
		myStorage.create();
    }
	deleteRequest.onblocked = function (e)
    {
		alert("blocked");
    }
	deleteRequest.onerror = myStorage.indexedDB.onerror;
}*/