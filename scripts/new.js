function newItem()
{
	var name,date,location,catagory,star,comment;
	name=document.getElementById("Name").value;
	date=document.getElementById("Date").value;
	location=document.getElementById("Location").value;
	catagory=document.getElementById("Catagory").value;
	star=document.getElementById("Star").value;
	comment=document.getElementById("Comment").value;

	savedata(name,date,location,catagory,star,comment);
}

function savedata(name,date,location,catagory,star,comment)
{
	document.getElementById("demo1").innerHTML=name;
	document.getElementById("demo2").innerHTML=date;
	document.getElementById("demo3").innerHTML=location;
	document.getElementById("demo4").innerHTML=catagory;
	document.getElementById("demo5").innerHTML=star;
	document.getElementById("demo6").innerHTML=comment;
	

}
