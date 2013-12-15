function addcomment()
{
	var name,date,star,comment;
	
	date=document.getElementById("Date").value;
	star=document.getElementById("Star").value;
	comment=document.getElementById("Comment").value;
	picture=document.getElementById("Picture").value;



	var data = {
			"restaurantId":commentsData.restaurantId,
			"date":date, 
			"score":star, 
			"comments":comment, 
			"pictures":picture
			};


	myStorage.indexedDB.addComments(data);

}