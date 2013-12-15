function showrestaurant(a)
{
	output = "店名："+a.name+"<br/>經度："+a.position.latitude+"<br/>緯度："+a.position.longitude+
	"<br/>電話："+a.phone+"<br/>地址："+a.address+"<br/>分類："+a.category[0]+"<br/>星等："+a.score+"<br/>評價："+a.comments;
	document.getElementById("demo").innerHTML=output;
	document.getElementById("demo1").innerHTML=output;
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