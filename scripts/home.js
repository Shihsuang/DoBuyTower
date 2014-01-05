/***********MouseEvent to TouchEvent************/
var mouseEventTypes = {
	touchstart : "mousedown",
	touchmove : "mousemove",
	touchend : "mouseup"
};

for (originalType in mouseEventTypes) {
	document.addEventListener(originalType, function(originalEvent) {
		event = document.createEvent("MouseEvents");
		touch = originalEvent.changedTouches[0];
		event.initMouseEvent(mouseEventTypes[originalEvent.type], true, true,
		window, 0, touch.screenX, touch.screenY, touch.clientX,
		touch.clientY, touch.ctrlKey, touch.altKey, touch.shiftKey,
		touch.metaKey, 0, null);
		originalEvent.target.dispatchEvent(event);
	});
}
/************************************************/
/**************window load function**************/
var windowonload = function (){
	var frame1 = document.getElementById("frame1");
	var frame2 = document.getElementById("frame2");
	frame2.style.left = 50+"%";
	//alert("50%");
	var pleft = frame2.offsetLeft - frame2.offsetWidth;
	var eleft = frame2.offsetLeft;
	//frame2.style.left = eleft+"px";
	frame1.style.left = 0+"%";
	eleft = frame2.offsetLeft;
	pleft = frame1.offsetLeft
	var disX = 0;
	var maxL = frame2.offsetLeft+frame2.offsetWidth;
	var min;
	var max;
	/****************touch start*****************/
	function right(e){
		var Frame = document.elementFromPoint(e.clientX, e.clientY);
		var e = e || window.event;
		disX = e.clientX - Frame.offsetLeft;	
		document.onmousemove = function (e){
			var e = e || window.event;
			var l = e.clientX - disX;
			min = Frame==frame2? eleft:25-Frame.offsetWidth;
			max = Frame==frame2? maxL-25:pleft;
			l < min && (l = min);
			l > max && (l = max);
			Frame == frame2? frame2.style.left = l+"px" : frame1.style.left = l-frame1.offsetWidth+Frame.offsetWidth+"px";
			Frame.style.left = l + "px";	
			if(Frame == frame2 && Frame.offsetLeft == max){
				//$.mobile.loadPage( "eat.html" );
				//$.mobile.changePage( "eat.html", { transition: "slide", changeHash: true});
				$.mobile.pageContainer.pagecontainer("change", "eat.html", { transition: "slide", changeHash: true})
				.on( "pagecontainershow", function( event, ui ) {
					window.location = "eat.html";
				});
				/*$(document).on("pageshow","eat.html",function(){ // When entering pagetwo
				  window.location = "eat.html";
				});*/
				
			}
			if(Frame == frame1 && Frame.offsetLeft == min)
				$.mobile.changePage( "play.html", { transition: "slide", changeHash: true , reverse: "true"});//window.location = "play.html";
			return false;
		};
		document.onmouseup = function (){
			document.onmousemove = null;
			document.onmouseup = null;
			Frame.releaseCapture && Frame.releaseCapture();
			
			Frame == frame2? Frame.offsetLeft > max-25?
				startMove(max, function (){
					//$.mobile.changePage( "eat.html", { transition: "slide", changeHash: true});
				$.mobile.pageContainer.pagecontainer("change", "eat.html", { transition: "slide", changeHash: true})
				.on( "pagecontainershow", function( event, ui ) {
					window.location = "eat.html";
				});
				},Frame) : startMove(min,0,Frame) : 
				Frame.offsetLeft < min+25?startMove(min, function (){
					$.mobile.changePage( "play.html", { transition: "slide", changeHash: true ,reverse: "true"});
				},Frame) : startMove(max,0,Frame)
		};
		/*Frame.setCapture && Frame.setCapture();
		frame2.style.left = 50+"%";
		//alert("50%");
		pleft = frame2.offsetLeft - frame2.offsetWidth;
		eleft = frame2.offsetLeft;
		//frame2.style.left = eleft+"px";
		frame1.style.left = 0+"%";
		eleft = frame2.offsetLeft;
		pleft = frame1.offsetLeft
		disX = 0;
		maxL = frame2.offsetLeft+frame2.offsetWidth;
		*/
		return false
	}
	frame1.onmousedown = right;
	frame2.onmousedown = right;
	/*********move Frame to target place **********/
	function startMove (iTarget, onEnd, Frame){
		clearInterval(Frame.timer);
		Frame.timer = setInterval(function (){
			doMove(iTarget, onEnd, Frame)
		}, 30)
	}
	/*******gradually move to target place*******/
	function doMove (iTarget, onEnd, Frame){
		var iSpeed = (iTarget - Frame.offsetLeft) / 5;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		iTarget == Frame.offsetLeft ? (clearInterval(Frame.timer), onEnd && onEnd()) : Frame.style.left = iSpeed + Frame.offsetLeft + "px"
		Frame == frame2 ? frame2.style.left = Frame.offsetLeft+"px" : frame1.style.left = Frame.offsetLeft-frame1.offsetWidth+Frame.offsetWidth+"px";
	}
};
window.onresize = windowonload;
window.onload = windowonload;
/************************************************/