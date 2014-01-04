//初始化地址選擇器
$(function () {$('.address-zone').ajaddress();});

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
	alert($("#score").val());
}

function getLocation(){

    LocationModule.getPosition(parsePosition, showAddressSelector);
}

function showAddressSelector(){
    $.mobile.changePage('#page2',{
	    transition: "pop",
		role:"dialog"
	});
}

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

function parsePosition(latitude, longitude){

    alert(latitude + ", " + longitude );
}

function initGallery(){

    $('#gallery').html("");

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
	
	$.mobile.changePage('#page3',{
	    transition: "pop"
	});
}

var selectedImg;





