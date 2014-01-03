function address(sel)
{
	var v = sel.options[sel.selectedIndex].value;
	if(sel.options[sel.selectedIndex].value==5)
	{
		
		var add = document.getElementById("addr");
		/*add.innerHTML+="</br>"+
		"<div style='margin-left:3em;'>縣市<select onchange='county(this)'>"+
		"<option value=\"6\">台北市</option>"+
		"<option value=\"7\">新北市</option>"+
		"</select>"+
		"</div>"+

		"<div style='margin-left:3em;'>地區<select>"+
		"<option>信義區</option>"+
		"</select>"+
		"</div>"+

		"<div style='margin-left:3em;'>路名<select>"+
		"<option>忠孝東路</option>"+
		"</select></div>";
		*/



		add.innerHTML+="</br>"+
		"<div style=\"margin-left:3em;\" class=\"address-zone\">"+
        "縣市<select class=\"city\"><option value=\"\">請選擇</option></select></br>"+
        "區域<select class=\"county\"><option value=\"\">請選擇</option></select></br>"+
        "路名<input type=\"text\"></input></div>";
        $(function () {$('.address-zone').ajaddress();});
	}
	else
	{
		var add = document.getElementById("addr");
		add.innerHTML="";
		
	}	
}

       
function starsend(x)
{
	var star1 = document.getElementById("star1");
	var star2 = document.getElementById("star2");
	var star3 = document.getElementById("star3");
	var star4 = document.getElementById("star4");
	var star5 = document.getElementById("star5");
	star1.src="star.png";
	star2.src="star.png";
	star3.src="star.png";
	star4.src="star.png";
	star5.src="star.png";
	if(x>=1)star1.src="starselect.png";
	if(x>=2)star2.src="starselect.png";
	if(x>=3)star3.src="starselect.png";
	if(x>=4)star4.src="starselect.png";
	if(x>=5)star5.src="starselect.png";
}
  




function county(sel)
{
	if(sel.options[sel.selectedIndex].value=='7')
	{
		alert("haha");
	}
}