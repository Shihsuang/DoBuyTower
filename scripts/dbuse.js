var myStorage = {};
myStorage.indexedDB = {};

myStorage.indexedDB.onerror = function(e) {
	console.log(e);
};

myStorage.indexedDB.create = function() {
	var request = indexedDB.open("eatplay");
	request.onupgradeneeded = function (e) {
	    alert("upgrade");
		var db = e.target.result;

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
};


myStorage.indexedDB.searchRestaurants = function(condition, onSuccess){
    var request = indexedDB.open("eatplay");
    request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_ONLY);
		var store = trans.objectStore("restaurant");
		var result = new Array();
		var index = 1;
		
		store.openCursor().onsuccess = function(event){
		  var cursor = event.target.result;
		  if (cursor) {
		    if(//distance(cursor.value.latitude, cursor.value.longitude, condition.latitude, condition.longitude) < condition.distance &&
			   cursor.value.category == condition.category){// &&
			   //cursor.value.score >= condition.score.min && cursor.value.score <= condition.score.max){
		       
			   if(index >= condition.page.min && index <= condition.page.max){
			       result.push(cursor.value);
			   }
			   
			   index++;
			   //alert(index);
			}
			cursor.continue();
		  }
		  
		  
		}
		
    //    var index = store.index('searchCondition');
	//	var boundKeyRange = IDBKeyRange.bound([condition.restaurantId, condition.date.min, condition.score.min], [condition.restaurantId, condition.date.max, condition.score.max]);
		//alert('asdasdasd');
	/*	index.openCursor(boundKeyRange).onsuccess = function(event) {
		  alert('hiihihi');
		  var cursor = event.target.result;
		  var result = new Array();
		  if (cursor) {
		    alert(cursor.value);
			result.push(cursor.value);
			cursor.continue();
		  }
		};*/
		trans.oncomplete = function(e){
		    onSuccess(result);
			db.close();
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.searchComments = function(condition, onSuccess){
    var request = indexedDB.open("eatplay");
    request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["comments"], myStorage.IDBTransactionModes.READ_ONLY);
		var store = trans.objectStore("comments");
		
		var result = new Array();
		store.openCursor().onsuccess = function(event){
		  
		  var cursor = event.target.result;
		  if (cursor) {
			
			if(cursor.value.restaurantId == condition.restaurantId &&
			   cursor.value.date >= condition.date.min && cursor.value.date <= condition.date.max &&
			   cursor.value.score >= condition.score.min && cursor.value.score <= condition.score.max){
			   //alert(JSON.stringify(cursor.value));
			   result.push(cursor.value);
			}
			cursor.continue();
		  }
		  
		}
        /*var index = store.index('condition');
		var boundKeyRange = IDBKeyRange.bound([condition.restaurantId, condition.date.min, condition.score.min], [condition.restaurantId, condition.date.max, condition.score.max]);
		//alert('asdasdasd');
		index.openCursor(boundKeyRange).onsuccess = function(event) {
		  alert('hiihihi');
		  var cursor = event.target.result;
		  var result = new Array();
		  if (cursor) {
		    alert(JSON.stringify(cursor.value));
			result.push(cursor.value);
			cursor.continue();
		  }
		};*/
		trans.oncomplete = function(e){
		    onSuccess(result);
			db.close();
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.addComments = function(commentsData) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["comments"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("comments");
		
		var data = {
			"restaurantId":commentsData.restaurantId,
			"date":commentsData.date, 
			"score":commentsData.score, 
			"comment":commentsData.comment, 
			"pictures":commentsData.pictures
		};
 
		var request = store.put(data);

		trans.oncomplete = function(e){
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteComments = function(id) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["comments"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("comments");
		var request = store.delete(id);

		trans.oncomplete = function(e) {
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};








myStorage.indexedDB.addRestaurant = function(restaurantData) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");
		
		var data = {
			"name": restaurantData.name,
			"position": {"latitude":restaurantData.position.latitude,"longitude":restaurantData.position.longitude},
			"category":restaurantData.category,
			"phone":restaurantData.phone,
			"address": restaurantData.address,
		};
 
		var request = store.put(data);

		trans.oncomplete = function(e){
		//myStorage.indexedDB.getAllTodoItems();
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteRestaurant = function(id) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");
		var request = store.delete(id);

		trans.oncomplete = function(e) {
			db.close();
			//myStorage.indexedDB.getAllTodoItems();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.updateRestaurant = function(id, newText) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
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
				//myStorage.indexedDB.getAllTodoItems();
			};
		}
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteDB = function (){
	var deleteRequest = indexedDB.deleteDatabase("eatplay");
    deleteRequest.onsuccess = function (e)
    {
		alert("deleted");
		myStorage.indexedDB.create();
    }
	deleteRequest.onblocked = function (e)
    {
		alert("blocked");
    }
	deleteRequest.onerror = myStorage.indexedDB.onerror;
};

myStorage.IDBTransactionModes = { "READ_ONLY": "readonly", "READ_WRITE": "readwrite", "VERSION_CHANGE": "versionchange" }; 
