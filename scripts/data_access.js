var restaurants = [
    {
	    id:1,
        name:"摩斯漢堡",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["速食", "美式"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	},
    {
	    id:2,
        name:"野味便當店",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["便當", "簡餐"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	},
	{
	    id:3,
        name:"阿諾可麗餅",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["速食", "美式"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	},
	{
	    id:4,
        name:"福泉豆花店",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["甜點", "麵食"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	},
	{
	    id:5,
        name:"八鍋",
	    position:{
	        latitude:1321.456,
		    longitude:-123.456
	    },
	    address:"桃園縣中壢市中大路300號",
	    category:["火鍋"],
	    comments:[
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]},
	        {date:"2013-12-13", score:4, comment:"好吃", pictures:[]}
	    ]
	}
]

var DataAccessAPI = {};

DataAccessAPI.getRestaurantByCondition = function(condition, field){
    //alert("yo");
	
	//資料來源:restaurants

	var result = new Array();
	var min = 0;
	var max = restaurants.length;
	
	if(condition.page){
		if(isNaN(condition.page.min)){
			min = condition.page.min - 1;
		}
		
		if(isNaN(condition.page.max)){
			max = condition.page.max;
		}
	}
	
	for(var i = min; i < max; i++){
	    result.push(restaurants[i]);
	}
	
    return result;

}

/*restaurant 
{
    id:1,
    name:"starbucks",
	position:{
	    latitude:1321.456,
		longitude:-123.456
	},
	address:"桃園縣中壢市中大路300號",
	category:["速食", "美式"],
	score:4
	comments:[]
}
*/

/*comment 
{
    date:"2013-12-13", 
	score:4, 
	comment:"好吃", 
	pictures:[]
}
*/