function addstore()
<<<<<<< NewItem
{
=======
{	
	//alert("aa");
>>>>>>> local
	var name,locationX,locationY,phone,catagory,address;
	name=document.getElementById("Name").value;
	locationX=document.getElementById("LocationX").value;
	locationY=document.getElementById("LocationY").value;
	phone=document.getElementById("Phone").value;
	address=document.getElementById("Address").value;
	catagory=document.getElementById("Catagory").value;
	
	
	var data = {
			"name": name,
			"position": {"latitude":locationX,"longitude":locationY},
			"phone":phone,
			"address":address,
			"catagory":catagory
		};
<<<<<<< NewItem

=======
	
>>>>>>> local
	DataAccessAPI.addRestaurant (data);


}


