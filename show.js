function showrestaurant()
{
	//var testObject = { 'one': 1, 'two': 2, 'three': 3 };
	// Put the object into storage
	//localStorage.setItem('testObject', JSON.stringify(testObject));
	var s = localStorage.getItem("res");
	var r = JSON.parse(s);
	var count = 0;
	var max = r.length;
	//alert(JSON.parse(r));
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

function showcomment(a)
{
	output = "店名："+a.id
	+"<br/>日期："+a.date
	+"<br/>星等："+a.score
	+"<br/>評價："+a.comment
	+"<br/>照片：";
	document.getElementById("demo").innerHTML=output;
	document.getElementById("demo1").innerHTML=output;
}