var myStorage = {};


myStorage.indexedDB = {};

myStorage.indexedDB.onerror = function(e) {
	console.log(e);
};

myStorage.indexedDB.create = function() {
	var request = indexedDB.open("eatplay");
	request.onupgradeneeded = function (e) {
		var db = e.target.result;

		if (db.objectStoreNames.contains("restaurant")) {
			var storeReq = db.deleteObjectStore("restaurant");
		}

		db.createObjectStore("restaurant", {keyPath: "timeStamp"});
		
		if (db.objectStoreNames.contains("category")) {
			var storeReq = db.deleteObjectStore("category");
		}

		db.createObjectStore("category", {keyPath: "timeStamp"});
		if (db.objectStoreNames.contains("comment")) {
			var storeReq = db.deleteObjectStore("comment");
		}

		db.createObjectStore("comment", {keyPath: "timeStamp"});
	};

	request.onsuccess = function(e) {
		e.target.result.close();
		myStorage.indexedDB.getAllTodoItems();
	};

	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.addTodo = function(todoText) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");
		var currentDateTime = new Date();
		
		var data = {
			"name": todoText,
			"position": {"latitude":1321.456,"longitude":-123.456 },
			"phone": "03-123456",
			"address": "桃園縣中壢市中大路300號",
			"score": 4,
			"numberOfComments": 3,
			"timeStamp": new Date().getTime()
		};

		var request = store.put(data);

		trans.oncomplete = function(e){
			myStorage.indexedDB.getAllTodoItems();
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.deleteTodo = function(id) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");
		var request = store.delete(id);

		trans.oncomplete = function(e) {
			db.close();
			myStorage.indexedDB.getAllTodoItems();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.getTodo = function(id) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_ONLY);
		var store = trans.objectStore("restaurant");

		var request = store.get(id);

		request.onsuccess = function(e) {
			showDetails(e.target.result);
		};
		
		trans.oncomplete = function(e) {
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Getting: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.updateTodo = function(id, newText) {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");
		
		var openCursorReq = store.openCursor(IDBKeyRange.only(id));
		openCursorReq.onsuccess = function (event) {
			var cursor = event.target.result;
			var _object = cursor.value;
			var currentDateTime = new Date();
			_object.dateCreated = currentDateTime.toUTCString(currentDateTime.getTime());
			_object.text = newText;
			var updateRequest = cursor.update(_object);
			updateRequest.onerror = updateRequest.onblocked = function () {
				console.log('Error updating');
			};

			updateRequest.onsuccess = function (event) {
				clearInput();
			};
			
			trans.oncomplete = function(e) {
				db.close();
				myStorage.indexedDB.getAllTodoItems();
			};
		}
	};
	request.onerror = myStorage.indexedDB.onerror;
};

myStorage.indexedDB.getAllTodoItems = function() {
	var request = indexedDB.open("eatplay");
	request.onsuccess = function(e) {
		var todos = document.getElementById("todoItems");
		todos.innerHTML = "";

		var db = e.target.result;		
		var trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore("restaurant");

		// Get everything in the store;
		var keyRange = IDBKeyRange.lowerBound(0);
		var cursorRequest = store.openCursor(keyRange);

		cursorRequest.onsuccess = function(e) {
			var result = e.target.result;
			if(!!result == false){
				return;
			}
		
			renderTodo(result.value);
			result.continue();
		};
		
		trans.oncomplete = function(e) {
			db.close();
		};

		showDetails("");
		cursorRequest.onerror = myStorage.indexedDB.onerror;
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

