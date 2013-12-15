function showrestaurant ()
{
	var s = localStorage.getItem("res");
	var r = JSON.parse(s);
	var count = 0;
	var max = r.length;
	output = "店名："+r.name
	+"<br/>經度："+r.position.latitude
	+"<br/>緯度："+r.position.longitude
	+"<br/>電話："+r.phone
	+"<br/>地址："+r.address
	+"<br/>分類："+r.category[0]
	+"<br/>星等："+r.score;
	count++;
	document.getElementById(count).innerHTML=output;
}

function showrestaurantgroup()
{
	var s = localStorage.getItem("res");
	var r = JSON.parse(s);
	var count = 0;
	var max = r.length;
	while(count<max) {
	//alert(JSON.parse(r));
		output = "店名："+r[count].name
		+"<br/>經度："+r[count].position.latitude
		+"<br/>緯度："+r[count].position.longitude
		+"<br/>電話："+r[count].phone
		+"<br/>地址："+r[count].address
		+"<br/>分類："+r[count].category[0]
		+"<br/>星等："+r[count].score;
		count++;
		document.getElementById(count).innerHTML=output;
	}
}

function showcomment()
{
	var s = localStorage.getItem("res");
	var r = JSON.parse(s);
	var count = 0;
	var max = r.length;
	while(count<max) {
		output = "店名："+r[count].id
		+"<br/>日期："+r[count].date
		+"<br/>星等："+r[count].score
		+"<br/>評價："+r[count].comment
		+"<br/>照片：";
		count++;
		document.getElementById(count).innerHTML=output;
	}
}
