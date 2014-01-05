function address(sel)
{
	var v = sel.options[sel.selectedIndex].value;
	if(sel.options[sel.selectedIndex].value==5)
	{
		;
		alert("hello");
		var add = document.getElementById("addr");
		add.innerHTML+="</br>"+
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
	}
	else
	{
		var add = document.getElementById("addr");
		add.innerHTML="";
		
	}	
}

function county(sel)
{
	if(sel.options[sel.selectedIndex].value=='7')
	{
		alert("haha");
	}
}