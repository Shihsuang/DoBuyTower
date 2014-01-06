/* author - 101522074 黃士軒
 * 
 * 此檔案為操作記錄的模組，以及負責addRecord.html的頁面效果
 * 
 */


//初始化地址選擇器
$(function () {$('.address-zone').ajaddress();});

/*
 * 選擇星星效果
 * x - 第x個星星被按到
 */
function starsend(x)
{
	var star1 = document.getElementById("star1");
	var star2 = document.getElementById("star2");
	var star3 = document.getElementById("star3");
	var star4 = document.getElementById("star4");
	var star5 = document.getElementById("star5");
	star1.src="images/star.png";
	star2.src="images/star.png";
	star3.src="images/star.png";
	star4.src="images/star.png";
	star5.src="images/star.png";
	if(x>=1)star1.src="images/starselect.png";
	if(x>=2)star2.src="images/starselect.png";
	if(x>=3)star3.src="images/starselect.png";
	if(x>=4)star4.src="images/starselect.png";
	if(x>=5)star5.src="images/starselect.png";
	$("#score").val(x);
	//alert($("#score").val());
}

//取得目前經緯度坐標
function getLocation(){

    LocationModule.getPosition(parsePosition, showAddressSelector);
}

//show出選擇地址的dialog
function showAddressSelector(){
    $.mobile.changePage('#page2',{
	    transition: "pop",
		role:"dialog"
	});
}

//當選擇地址的dialog按送出後，將使用者輸入的地址顯示在頁面上
function setAddress(){
    if(!$("#city").val() || !$("#county").val() || !$("#road").val()){
	   alert("請填寫所有欄位");
	   return false;
	}

	var addr = $("#city :selected").text() + $("#county :selected").text() + $("#road").val();
	$("#location").val(addr);
	//document.getElementById('#set-location').style.webkitTouchCallout = 'none';
    return true;
}

//將GPS的經緯度坐標位置顯示在頁面上
function parsePosition(latitude, longitude){
    $("#location").val("(" + latitude + "," + longitude + ")");
    //alert(latitude + ", " + longitude );
}

var selectedImg;

//初始化照片選擇頁面
function initGallery(){

    $('#gallery').html("");

    //讀取本機中所有照片
	var files = navigator.getDeviceStorage("pictures");
	var cursor = files.enumerate();
	
	cursor.onsuccess = function () {
	    //alert("Got something");
	    var file = this.result;
	    if (file != null) {

	        var imageElement = $('<img class="gallery-pic">');
	        imageElement.attr('src', window.URL.createObjectURL(file));
			imageElement.appendTo("#gallery");
			imageElement.click(function(event){
	
				selectedImg = $(event.target);
				$("#pic-selected").attr('src', selectedImg.attr('src'));
				$.mobile.changePage('#page1',{
	                transition: "pop"
	            });
				
			});
	        this.done = false;
	    }
		else {
		    this.done = true;
		}

	    if (!this.done) {
			this.continue();
		}
	}
	
	//顯示照片選擇頁面
	$.mobile.changePage('#page3',{
	    transition: "pop"
	});
}

function upload(){

   var name = $("#name").val();
   var addr = $("#location").val();
   var cat = $("#category").val();
   var city = $("#city :selected").text();
   var county = $("#county :selected").text();

   //alert(name);
   //alert(date);
   //alert(addr);
   //alert(cat);
   //alert(score);
   //alert(comment);
   //alert(city);
   //alert(county);

   //LocationModule.getPosition(function(latitude, longitude){
   	   var ddb = new myStorage();
	   ddb.conn();

	   var data = {

	   		"name": name,
			"position": {"latitude":123.3,"longitude":-10.33},
			"category": cat,
			"address": addr,
			"city": city,
			"county": county 
	   };

	   ddb.insertData("restaurant", data);
	   //alert("pass");
	   var res = ddb.findData("restaurant", data, false, createComment);
	   //alert(res);

	   ddb.close();

   //});




   
}

function createComment(indata){
	alert("infunc"+indata[0].id);
   	   var ddb = new myStorage();
	   ddb.conn();
   var date = $("#date").val();
   var score = $("#score").val();
   var comment = $("#comment").val();
      var com={
			"restaurantId":indata[0].id,
			"date":date, 
			"score":score, 
			"comment":comment, 
			"pictures":""
		};
	alert("comadd");
    ddb.insertData("comments",com);
	alert("comout");
    ddb.findData("comments",com,false,showcom);
	   ddb.close();

}
function showcom(data){
    alert(data[0].comment);
}



