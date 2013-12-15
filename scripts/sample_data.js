/*category
{
    id:1,
	name:"速食"
}
*/
var categories = [
    {
	    id: 1,
		name: "速食"
	},
	{
	    id: 2,
		name: "美式"
	},
	{
	    id: 3,
		name: "便當"
	},
	{
	    id: 4,
		name: "甜點"
	},
	{
	    id: 5,
		name: "麵食"
	},
	{
	    id: 6,
		name: "火鍋"
	},
]

/*restaurant 
{
    id:1,
    name:"starbucks",
	position:{
	    latitude:1321.456,
		longitude:-123.456
	},
	phone:"03-123456",
	address:"桃園縣中壢市中大路300號",
	category:["速食", "美式"],
	score:4,
	numberOfComments: 3
}
*/
var restaurants = [
    {
	    id:1,
        name:"摩斯漢堡",
		phone:"03-123456",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:[1, 2],
		score:4,
	    numberOfComments:2
	},
    {
	    id:2,
        name:"野味便當店",
		phone:"03-123456",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:[3],
	    score:4,
	    numberOfComments:2
	},
	{
	    id:3,
        name:"阿諾可麗餅",
		phone:"03-123456",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:[1, 2],
	    score:4,
	    numberOfComments:2
	},
	{
	    id:4,
        name:"福泉豆花店",
		phone:"03-123456",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:[4, 5],
	    score:4,
	    numberOfComments:2
	},
	{
	    id:5,
        name:"八鍋",
		phone:"03-123456",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:[6],
	    score:4,
	    numberOfComments:2
	}
]



/*comment 
{
    id:1,
	restaurantId:1
    date:"2013-12-13", 
	score:4, 
	comment:"好吃", 
	pictures:["1.jpg", "2.jpg", "3.jpg"]
}
*/

var comments = [
	{
	    id:1,
	    restaurantId:1,
	    date:"2013-12-13", 
		score:4, 
		comment:"好吃", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:2,
	    restaurantId:1,
	    date:"2013-12-13", 
		score:4, 
		comment:"還好", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:3,
	    restaurantId:1,
	    date:"2013-12-13", 
		score:4, 
		comment:"超棒", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:4,
	    restaurantId:1,
	    date:"2013-12-13", 
		score:4, 
		comment:"ㄜㄜㄜ", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:5,
	    restaurantId:2,
	    date:"2013-12-13", 
		score:4, 
		comment:"好吃", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:6,
	    restaurantId:2,
	    date:"2013-12-13", 
		score:4, 
		comment:"還好", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:7,
	    restaurantId:2,
	    date:"2013-12-13", 
		score:4, 
		comment:"超棒", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:8,
	    restaurantId:2,
	    date:"2013-12-13", 
		score:4, 
		comment:"ㄜㄜㄜ", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:9,
	    restaurantId:3,
	    date:"2013-12-13", 
		score:4, 
		comment:"好吃", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:10,
	    restaurantId:3,
	    date:"2013-12-13", 
		score:4, 
		comment:"還好", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:11,
	    restaurantId:3,
	    date:"2013-12-13", 
		score:4, 
		comment:"超棒", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:12,
	    restaurantId:3,
	    date:"2013-12-13", 
		score:4, 
		comment:"ㄜㄜㄜ", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:13,
	    restaurantId:4,
	    date:"2013-12-13", 
		score:4, 
		comment:"好吃", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:14,
	    restaurantId:4,
	    date:"2013-12-13", 
		score:4, 
		comment:"還好", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:15,
	    restaurantId:4,
	    date:"2013-12-13", 
		score:4, 
		comment:"超棒", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:16,
	    restaurantId:4,
	    date:"2013-12-13", 
		score:4, 
		comment:"ㄜㄜㄜ", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:17,
	    restaurantId:5,
	    date:"2013-12-13", 
		score:4, 
		comment:"好吃", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:18,
	    restaurantId:5,
	    date:"2013-12-13", 
		score:4, 
		comment:"還好", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:19,
	    restaurantId:5,
	    date:"2013-12-13", 
		score:4, 
		comment:"超棒", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	},
	{
	    id:20,
	    restaurantId:5,
	    date:"2013-12-13", 
		score:4, 
		comment:"ㄜㄜㄜ", 
		pictures:["1.jpg", "2.jpg", "3.jpg"]
	}
]