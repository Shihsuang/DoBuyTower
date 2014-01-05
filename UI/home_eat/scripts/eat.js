
function back(){
	
	window.location.replace("main.html");
	//window.location.href = "main.html";
	window.locatioon.reload(true);
}

function tran(){
	//window.location;
	//window.location.replace("http://example.com");
	//window.location.href = "tran.html";
}

function startMove (iTarget, onEnd, obj){
	clearInterval(obj.timer);
	obj.timer = setInterval(function (){
		doMove(iTarget, onEnd, obj)
	}, 30)
}



/*******gradually move to target place*******/
/*
function doMove (iTarget, onEnd, Btn){
	var iSpeed = (iTarget - Btn.offsetLeft) / 5;
	iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	iTarget == Btn.offsetLeft ? (clearInterval(Btn.timer), onEnd && onEnd()) : Btn.style.left = iSpeed + Btn.offsetLeft + "px"
	Btn == eBtn ? frame2.style.left = Btn.offsetLeft+"px" : frame1.style.left = Btn.offsetLeft-frame1.offsetWidth+Btn.offsetWidth+"px";
}

window.onload = slipIn;
*/