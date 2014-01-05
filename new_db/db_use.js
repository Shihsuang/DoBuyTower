/**
 * 
 */

var request;
var db;

function myStorage(){
	
}

myStorage.prototype.onerror = onerror;
myStorage.prototype.conn = conn;
myStorage.prototype.create = create;
myStorage.prototype.modify = modify;
myStorage.prototype.del = del;


function onerror(e){
	console.log(e);
}

function conn(){
	
	request = indexedDB.open("eatplay");
	request.onupgradeneeded = function (e) {
	    alert("upgrade");
	    db = e.target.result;

		if (db.objectStoreNames.contains("restaurant")) {
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
	};
	request.onsuccess = function(e) {
		e.target.result.close();
		//myStorage.indexedDB.getAllTodoItems();
	};

	request.onerror = myStorage.indexedDB.onerror;
}
