/* author 101522074 黃士軒
 * 此檔案負責選單的操作
 */

/* 讀取目前的模式，並更新選單的圖示
 * mode = 1 : 我的（單人資料來源）
 * mode = 2 : 我們的（多人資料來源）
 */
function loadMode(){

	var mode = localStorage["mode"];
    //alert(mode);
    if(mode == 2){

    	$("#mode img").attr("src", "images/men.png");

    }else{
        $("#mode img").attr("src", "images/man.png");

    }

}

/* 
 * 切換目前的模式，1 => 2, 2 => 1
 */
function switchMode(){

    //alert("123");
    if(localStorage["mode"] == 2){
	    localStorage["mode"] = 1;
    }else{
    	localStorage["mode"] = 2;
    }
    loadMode();
}