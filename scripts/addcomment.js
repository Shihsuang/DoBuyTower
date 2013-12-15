function addcomment()
{
<<<<<<< NewItem
	var name,date,star,comment;
=======

	var name,date,star,comment,id;
>>>>>>> local
	
	date=document.getElementById("Date").value;
	star=document.getElementById("Star").value;
	comment=document.getElementById("Comment").value;
	picture=document.getElementById("Picture").value;
<<<<<<< NewItem



	var data = {
			"restaurantId":commentsData.restaurantId,
=======
	id=document.getElementById("ID").value;


	var data = {
			"restaurantId":id,
>>>>>>> local
			"date":date, 
			"score":star, 
			"comments":comment, 
			"pictures":picture
			};

<<<<<<< NewItem

	myStorage.indexedDB.addComments(data);
=======
	
	DataAccessAPI.addComments(data);

>>>>>>> local

}