function address(sel)
{
	var v = sel.options[sel.selectedIndex].value;
	if(sel.options[sel.selectedIndex].value==5)
	{
		
		var add = document.getElementById("addr");
		/*add.innerHTML+="</br>"+
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
		*/
		add.innerHTML+="</br>"+
		"<link rel=\"stylesheet\" href=\"styles/search.css\" >"+
		"<div class=\"address-zone\">"+
        "縣市<select class=\"city\"><option value=\"\">請選擇</option></select></br>"+
        "區域<select class=\"county\"><option value=\"\">請選擇</option></select></br>"+
        "路名<input type=\"text\"></input></div>";
        $(function () {$('.address-zone').ajaddress();});
	}
	else
	{
		var add = document.getElementById("addr");
		add.innerHTML="";	
	}	
}

       
function starsend(x)
{
	var star1 = document.getElementById("star1");
	var star2 = document.getElementById("star2");
	var star3 = document.getElementById("star3");
	var star4 = document.getElementById("star4");
	var star5 = document.getElementById("star5");
	star1.src="images/star.png";
	star2.src="images/star.png";
	star3.src="images/star.png";
	star4.src="images/star.png";
	star5.src="images/star.png";
	if(x>=1)star1.src="images/starselect.png";
	if(x>=2)star2.src="images/starselect.png";
	if(x>=3)star3.src="images/starselect.png";
	if(x>=4)star4.src="images/starselect.png";
	if(x>=5)star5.src="images/starselect.png";
}

function Getinfo()
{
	alert("hello");

}
  


function resList(){
    var ddb = new myStorage();
	ddb.conn();
	var tmpdata = {

	   		"name": '野味',
			"position": {"latitude":123.3,"longitude":10.33},
			"category": 'aa',
			"address": 'aa',
			"city": 'aa',
			"county": 'aa' 
	};
//alert("1");
	//temppp=JSON.stringify(tmpdata);
	var res = ddb.findData("restaurant", tmpdata, false, _search);
    ddb.close();
}

function _search(dataset){
	var temp = new Array();
	
 /*if (condition.distance!=null) {
        temp = new Array();
        for(var i=0;i<=r_result.length;i++){
            if(condition.distance>=calDistance(userCoordinatelat,userCoordinatelng,r_result[i].latitude,r_result[i].longitude)){
                temp.push(r_result[i]);
            }
        }
    }
    if(condition.address!=null) {
        if(temp!=null)
        for(var i=0;i<=temp.length;i++){
            for(var element in temp[i]){
                if(element=="address"){
                    if(temp[i].address!=condition.address;){
                        delete temp[i];
                    }
                }
            }
        }else{
            temp = new Array();
            for(var i=0;i<=r_result.length;i++){
                if(r_result[i].address==condition.address){
                    temp.push(r_result[i]);
                }
            }
        }
    }else if(condition.score!=null){
        if(temp!=null){
            for(var i=0;i<=temp.length;i++){
                for(var element in temp){
                    if(element == "score"){
                        if(temp[i].score!=condition.score){
                            delete temp[i];
                        }
                    }
                }
            }
        }else{
            temp = new Array();
            for(var i=0;i<=r_result.length;i++){
                if(r_result[i].score==condition.score){
                    temp.push(r_result[i]);
                }
            }
        }
    }
}*/


