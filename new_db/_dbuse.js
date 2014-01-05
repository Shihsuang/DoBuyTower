/**
 * 
 */
var myStorage = {};
myStorage.indexedDB = {};

var request;
var db = null;

var collect_restStore;
var collect_commStore;

var trans;
var modify_request;

myStorage.indexedDB.conn = conn;
/*myStorage.indexedDB.onerror;*/
myStorage.indexedDB.onsuccess;
myStorage.indexedDB.createCollect = createCollect;
myStorage.indexedDB.delCollect = delCollect;
myStorage.indexedDB.insertData = insertData;
myStorage.indexedDB.updateRes = updateRes;
myStorage.indexedDB.delData = delData;

myStorage.indexedDB.find;

myStorage.indexedDB.deleteDB;

/*request.onsuccess = function(e){
	e.target.result.close();
//	db=request.result;
};

request.onerror = function(e){
	console.log(e);
};*/

function conn (){
	request = indexedDB.open("eatplay");
	
/*	//normal manipulate in database 
	request.onsuccess = function(e){
		db = e.target.result;
	};
	
	//onupgradeneeded allow update or delete the data base
	request.onupgradeneeded = function(e){
		db = e.target.result;
	}*/
}

//modirfy ,sotre or update the database version
function createCollect(collectName){
	
	request.onupgradeneeded = function(e){
		if(db.objectStoreNames.contains(collectName)){
			alert("this collection already exist");
		}else{
			if(collectName=="restaurant"){
				restStore = db.createObjectStore(collectName, { keyPath: "id", autoIncrement : true });
				restStore.createIndex("condition", ["position.latitude", "position.longitude", "category"]);
			}else if(collectName=="comments"){
				commStore = db.createObjectStore(collectName, { keyPath: "id", autoIncrement : true });
				commStore.createIndex("condition", ["restaurantId", "date", "score"]);
			}else{
				alert("error collection name");
			}
		}
	}
	request.onsuccess = function(e) {
		e.target.result.close();
		//myStorage.indexedDB.getAllTodoItems();
	};

	request.onerror = myStorage.indexedDB.onerror;
}

function delCollect(collectName){
	
	request.onupgradeneeded = function(e){
		db = e.target.result;
		if(db.objectStoreNames.contains(collectName)){
			db.deleteObjectStore(collectName);
		}else{
			alert("collect not exist or unknown error");
		}
	};
	
	request.onsuccess = function(e) {
		e.target.result.close();
		//myStorage.indexedDB.getAllTodoItems();
	};

	request.onerror = myStorage.indexedDB.onerror;
}

function insertData(collectName,data){
	
	assert(db=null,"connect first");
	
	request.onsucess = function(e){
		trans = db.transaction([collectName],myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore(collectName);
		var resData = {
				"name": restaurantData.name,
				"position": {"latitude":restaurantData.position.latitude,"longitude":restaurantData.position.longitude},
				"category": restaurantData.category,
				"phone": restaurantData.phone,
				"address": restaurantData.address,
				"city": restaurantData.city,
		};
		var comData = {
				"restaurantId":commentsData.restaurantId,
				"date":commentsData.date, 
				"score":commentsData.score, 
				"comment":commentsData.comment, 
				"pictures":commentsData.pictures
		};
		if(collectName=="restaurant"){
			modify_request = store.put(resData);
		}else if(collectName=="comments"){
			modify_request = store.put(comData);
		}
		trans.oncomplete = function(e){
			db.close();
		};
		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
}

function updateRes(){
	
	request.onsucess = function(e){
		db = e.target.result;
		trans = db.transaction(["restaurant"], myStorage.IDBTransactionModes.READ_WRITE);
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
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
}

function delData(collectName,id){
	
	request.onsuccess = function(e) {
		var db = e.target.result;
		var trans = db.transaction([collectName], myStorage.IDBTransactionModes.READ_WRITE);
		var store = trans.objectStore(collectName);
		var request = store.delete(id);

		trans.oncomplete = function(e) {
			db.close();
		};

		request.onerror = function(e) {
			console.log("Error Adding: ", e);
		};
	};
	request.onerror = myStorage.indexedDB.onerror;
}

function find(collectName,condition){
	
	var request = indexedDB.open("eatplay");
    request.onsuccess = function(e) {
            var db = e.target.result;
            var trans = db.transaction([collectName], myStorage.IDBTransactionModes.READ_ONLY);
            var store = trans.objectStore(collectName);

            var request = store.get(id);

            request.onsuccess = function(e) {
                    onSuccess(e.target.result);
            };
            
            trans.oncomplete = function(e) {
                    db.close();
            };

            request.onerror = function(e) {
                    console.log("Error Getting: ", e);
            };
    };
    request.onerror = myStorage.indexedDB.onerror;
	
}

function deleteDB(){
	
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
}