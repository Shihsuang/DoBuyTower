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
	//var playpic = document.getElementByID("pic");
	var eLock = document.getElementById("lock");
	var eBtn = eLock.getElementsByTagName("spane")[0];
	var pBtn = eLock.getElementsByTagName("spanp")[0];	
	eBtn.style.left = 50+"%";
	//var pleft = eBtn.offsetLeft - eBtn.offsetWidth;
	var pleft = frame2.offsetLeft - frame2.offsetWidth;
	//var eleft = eBtn.offsetLeft;
	var eleft = frame2.offsetLeft;
	
	frame2.style.left = eleft+"px";
	frame1.style.left = 0+"%";
	pBtn.style.left = pleft+"px";
	//eleft = eBtn.offsetLeft;
	eleft = frame2.offsetLeft;
	//pleft = pBtn.offsetLeft;
	pleft = frame1.offsetLeft
	var disX = 0;
	//var maxL = frame2.offsetLeft+frame2.offsetLeft-eBtn.offsetWidth-20;
	var maxL = frame2.offsetLeft+frame2.offsetLeft-20;
	var min;
	var max;
	/****************touch start*****************/
	function right(e){
		var Btn = document.elementFromPoint(e.clientX, e.clientY);
		var e = e || window.event;
		disX = e.clientX - Btn.offsetLeft;	
		document.onmousemove = function (e){
			var e = e || window.event;
			var l = e.clientX - disX;
			min = Btn==frame2? eleft:20-Btn.offsetWidth;
			max = Btn==frame2? maxL+eBtn.offsetWidth-20:pleft;
			l < min && (l = min);
			l > max && (l = max);
			Btn == frame2? frame2.style.left = l+"px" : frame1.style.left = l-frame1.offsetWidth+eBtn.offsetWidth+"px";
			Btn.style.left = l + "px";	
			if(Btn == frame2 && Btn.offsetLeft == max){
				//$.mobile.loadPage( "eat.html" );
				$.mobile.changePage( "eat.html", { transition: "slide", changeHash: true});
			}
			if(Btn == frame1 && Btn.offsetLeft == min)
				$.mobile.changePage( "play.html", { transition: "slide", changeHash: true , reverse: "true"});//window.location = "play.html";
			return false;
		};
		document.onmouseup = function (){
			document.onmousemove = null;
			document.onmouseup = null;
			Btn.releaseCapture && Btn.releaseCapture();
			
			Btn == frame2? Btn.offsetLeft > max-25?
				startMove(max, function (){
					$.mobile.changePage( "eat.html", { transition: "slide", changeHash: true});
				},Btn) : startMove(min,0,Btn) : 
				Btn.offsetLeft < min+20?startMove(20-Btn.offsetWidth, function (){
					$.mobile.changePage( "play.html", { transition: "slide", changeHash: true ,reverse: "true"});
				},Btn) : startMove(max,0,Btn)
		};
		Btn.setCapture && Btn.setCapture();
		return false
	}
	frame1.onmousedown = right;
	frame2.onmousedown = right;
	/*********move btn to target place **********/
	function startMove (iTarget, onEnd, Btn){
		clearInterval(Btn.timer);
		Btn.timer = setInterval(function (){
			doMove(iTarget, onEnd, Btn)
		}, 30)
	}
	/*******gradually move to target place*******/
	function doMove (iTarget, onEnd, Btn){
		var iSpeed = (iTarget - Btn.offsetLeft) / 5;
		iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
		iTarget == Btn.offsetLeft ? (clearInterval(Btn.timer), onEnd && onEnd()) : Btn.style.left = iSpeed + Btn.offsetLeft + "px"
		Btn == frame2 ? frame2.style.left = Btn.offsetLeft+"px" : frame1.style.left = Btn.offsetLeft-frame1.offsetWidth+Btn.offsetWidth+"px";
	}
};
window.onresize = windowonload;
window.onload = windowonload;
/************************************************/