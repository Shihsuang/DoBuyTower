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
	var frame = document.getElementById("frame");
	var eLock = document.getElementById("lock");
	var eBtn = eLock.getElementsByTagName("spane")[0];
	var pBtn = eLock.getElementsByTagName("spanp")[0];	
	eBtn.style.left = 50+"%";
	var pleft = eBtn.offsetLeft - eBtn.offsetWidth;
	var eleft = eBtn.offsetLeft;
	pBtn.style.left = pleft+"px";
	eleft = eBtn.offsetLeft;
	pleft = pBtn.offsetLeft;
	var disX = 0;
	var maxL = frame.clientWidth-eBtn.offsetWidth-20;
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
			min = Btn==eBtn? eleft:20;
			max = Btn==eBtn? maxL:pleft;
			l < min && (l = min);
			l > max && (l = max);			
			Btn.style.left = l + "px";	
			if(Btn.offsetLeft == max)
				window.location = "eat.html";
			return false;
		};
		document.onmouseup = function (){
			document.onmousemove = null;
			document.onmouseup = null;
			Btn.releaseCapture && Btn.releaseCapture();
			
			Btn == eBtn? Btn.offsetLeft > max-25?
				startMove(max, function (){
					window.location = "eat.html";
				},Btn) : startMove(min,0,Btn) : 
				Btn.offsetLeft < 45?startMove(20, function (){
					window.location = "play.html";
				},pBtn) : startMove(pleft,0,pBtn)
		};
		Btn.setCapture && Btn.setCapture();
		return false
	}
	eBtn.onmousedown = right;
	pBtn.onmousedown = right;
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
	}
};
window.onresize = windowonload;
window.onload = windowonload;
/************************************************/