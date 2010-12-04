//Global Modifiers
var drugFontSize = 12.5;//the size of the the font for the table that holds drugs
var numDrugs = 8;


var days = 30;
var coat = 0;
var coatSize = 100;
var cash = 2000;
var debt = 2000;
var guns = 0;
var bank = 0;
var health = 100;
var currentLoc="Bronx";
var interestRate = 12;
/*
 * write some comments 
 */
//drug pricing info
var eMax = 75;
var eMin = 10;
var acidMax = 3300;
var acidMin = 1600;
var cocaineMax = 30000;
var cocaineMin = 20000;
var shroomsMax = 1300;
var shroomsMin = 1000;
var heroinMax = 7000;
var heroinMin = 5500;
var pcpMax = 6100;
var pcpMin = 4500;
var speedMax = 115;
var speedMin = 220;
var weedMax = 900;
var weedMin = 350;


//These will hold the current state of the game
var newsFeed;
var userName;
var userPic;
var sideItem;

//will hold current coat. order is same as above (alphabetical)
var coatInfo = [0,0,0,0,0,0,0,0];
var currentPrice = [0,0,0,0,0,0,0,0];

var gunNames = ["9mil","glock","AK","shotty","38 special"];
var gunPrices = [2000,3000,5000,10000,15000];
var gunAmounts =[0,0,0,0,0];

var itemInfo;
var firstTime;


function loadAbout(){
	xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","about.html",false);
        xmlhttp.send();
	document.getElementById("main").style.border = "2px solid";
        document.getElementById("main").innerHTML = xmlhttp.responseText;
}


function loadGame(){
	xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","game.php",false);
        xmlhttp.send();
        document.getElementById("main").innerHTML = xmlhttp.responseText;
	document.getElementById("main").style.border = "0px solid";
	
	//refresh all of the game info values
	refreshGameValues();
}
function loadHighscore(){
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","highscore.php?money="+(cash-debt+bank)+"&name="+userName,false);
        xmlhttp.send();
	document.getElementById("main").style.border = "2px solid";
        document.getElementById("main").innerHTML = xmlhttp.responseText;
}
function loadInvite(){
	xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET","friends.php",false);
        xmlhttp.send();
	document.getElementById("main").style.border = "2px solid";
        document.getElementById("main").innerHTML = xmlhttp.responseText;
}
function loadChat(){
	window.open ("chatWindow.php","mywindow","status=1, width=425, height=550");		
}

function graphStreamPublish(){
       var body = 'Reading New Graph api & Javascript Base FBConnect Tutorial';
        FB.api('/me/feed', 'post', { message: body }, function(response) {
            if (!response || response.error) {
                 alert('Error occured');
            } else {
                 alert('Post ID: ' + response.id);
            }
       });
}
function refreshAds(){
/*
	

	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET","php/newAd.php",true);
	xmlhttp.onreadystatechange=function(){
  		if (xmlhttp.readyState==4 && xmlhttp.status==200){
 			alert(xmlhttp.responseText);
			document.getElementById("ad1").innerHTML=xmlhttp.responseText;
    		}
  	}
	xmlhttp.send();
	
	xmlhttpb = new XMLHttpRequest();
	xmlhttpb.open("GET","php/newAdbottom.php",true);
	xmlhttpb.onreadystatechange=function(){
  		if (xmlhttpb.readyState==4 && xmlhttpb.status==200){
 			document.getElementById("ad2").innerHTML=xmlhttpb.responseText;
    		}
  	}
	xmlhttpb.send();
*/
}
function refreshGameValues(){
	//First welcome them either back or for the first time
	if(firstTime == 0){
                document.getElementById("userInfo").innerHTML = "Hello " + userName + "! " + userPic;
                firstTime = 1;
        }else{
                document.getElementById("userInfo").innerHTML = "Welcome Back " + userName + "! " + userPic;
        }
	
	//Update the player status
	updatePlayerStatus();

	//Get them news
	newsEvent("");	
	
	//update the side pannel
	updateSideItem();

	//get the drug prices
	getDrugPrice();

	//update the coat pannel
	updateCoat();	

	//set the size of the drug table
        document.getElementById("drugTable").style.fontSize=drugFontSize;

}

function acid()
{
        var min = acidMin;
        var max = acidMax;
        if(currentLoc == "Bronx")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Coney Island")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[0] = Math.round(rand);
}

function cocaine()
{
        var min = cocaineMin;
        var max = cocaineMax;
        if(currentLoc == "Brooklyn")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Manhatten")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[1] =  Math.round(rand);
}

function e()
{
        var min = eMin;
        var max = eMax;
        if(currentLoc == "Manhatten")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Ghetto")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[2] =  Math.round(rand);
}

function heroin()
{
        var min = heroinMin;
        var max = heroinMax;
        if(currentLoc == "Coney Island")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Central Park")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[3] = Math.round(rand);
}

function pcp()
{
        var min = pcpMin;
        var max = pcpMax;
        if (currentLoc === "Queens")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[4] = Math.round(rand);
}

function shrooms()
{
        var min = shroomsMin;
        var max = shroomsMax;
        if(currentLoc == "Queens")
	{
		max = min;
                min = min /2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[5] = Math.round(rand);
}

function speed()
{
        var min = speedMin;
        var max = speedMax;
        if(currentLoc == "Ghetto")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Brooklyn")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[6] = Math.round(rand);
}

function weed()
{
        var min = weedMin;
        var max = weedMax;
        if(currentLoc == "Central Park")
	{
		max = min;
                min = min /2;
        }
	else if (currentLoc === "Bronx")
	{
		min = max;
                max = max * 2;
        }
	var rand= min+(Math.random()*(max-min));
	currentPrice[7] =  Math.round(rand);
}


function loadItem(){
	itemInfo[0] = "Acid ";
	itemInfo[1] = "Cocaine ";
	itemInfo[2] = "Ecstasy ";
	itemInfo[3] = "Heroin ";
	itemInfo[4] = "PCP ";
	itemInfo[5] = "Shrooms ";
	itemInfo[6] = "Speed ";
	itemInfo[7] = "Weed ";
	
}
function listCoat(){
	var coatList = "";
	for(var i = 0; i < 8; i++){
		if(coatInfo[i] != 0){
			coatList += itemInfo[i]+"<form method=\"post\" action=\"\">"+
						"<textarea name=\"drugHolding\" cols=\"3\" rows=\"1\">"+
						coatInfo[i]+
						"</textarea> "+
						"<input type=\"submit\" value=\"Sell\" /> " +
						"<input type=\"submit\" value=\"Dump\" /> " +
						"</form>";
		}
	}
}
function updateDrugPrice(){
	acid();
	cocaine();
	e();
	heroin();
	pcp();
	shrooms();
	speed();
	weed();
}
function getDrugPrice(){
	var output = "<th>";
	for(var i = 0; i < itemInfo.length; i++){
		output+=itemInfo[i]+" $</th><td>" + currentPrice[i] +  "</td><td><input type=\"text\" name=\"" + itemInfo[i] + "\" id=\"drug" + i + "\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(" + i + ")'/></td><td><input type='submit' value='sell' onclick='sellStuff(" + i + ")'</td>"; 
		document.getElementById(itemInfo[i]).innerHTML = output;
		output = "<th>";
	} 
}

function initializeValues(){
	days = 30;
	coat = 0;
	coatSize = 100;
	cash = 2000;
	debt = 2000;
	guns = 0;
	bank = 0;
	health = 100;
	currentLoc="Bronx";
	interestRate = 12;
	newsFeed="<b>News:</b><br>";
	for(var i = 0; i < coatInfo.length; i++){
		coatInfo[i] = 0;
	}
	for(var i = 0; i < gunAmounts.length; i++){
		gunAmounts[i] = 0;
	}
	
	//get the side item
	updateSideItem();

	//get the drug prices for the city
	updateDrugPrice();
}
function init(uname,  u){
	if(uname){
		userName = uname;
	}else{
		userName = "NONAME!";
	}
	
	//if no user id passed in then use the default facebook logo. If id is then use their picture
	if(u){
		userPic = "<img src=\"https://graph.facebook.com/"+u+"/picture\" height=\"27\">";
	}else{
		userPic =  "<img src=\"http://farm1.static.flickr.com/225/503165914_a680a56c77_t.jpg\" height=\"27\">";
	}
	
	//allocate array
	coatInfo = new Array(numDrugs);
        itemInfo = new Array(numDrugs);


	//Initialize all values
	initializeValues();	
	
	//Load the game and welcome them
	firstTime = 0;	
	loadGame();
	

	//create array and initialize to 0
	coatInfo = new Array(8);
	itemInfo = new Array(8);
	for(i = 0; i < 8; i++){
		coatInfo[i]=0;
	}
}

function updatePlayerStatus(){
	document.getElementById("Days").innerHTML="Days: " + days;
  	document.getElementById("Coat").innerHTML="Coat: " + coat + "/<span id=\"CoatSize\"></span>";
	document.getElementById("CoatSize").innerHTML=coatSize;
	document.getElementById("Cash").innerHTML="Cash: $" + cash;
	document.getElementById("Debt").innerHTML="Debt: $" + debt;
	document.getElementById("Guns").innerHTML="Guns: " + guns;
	document.getElementById("Bank").innerHTML="Bank: $" + bank;
	document.getElementById("Health").innerHTML="Health: " + health;
	document.getElementById("CurrentLoc").innerHTML="Current City: " + currentLoc;
	updateCoat();
	refreshAds();
}


function updateCoat(){
	var output = "<b>Coat:</b><br>";
	for (var i = 0; i < coatInfo.length; i++){
		if(coatInfo[i] > 0){
			output += itemInfo[i] + coatInfo[i] + "<br>"; 
		}
	}		
	document.getElementById("coatList").innerHTML = output;
}
function repay(){
	var amount = parseInt(document.getElementById("sharkVal").value);
	cash -= amount;
	debt -= amount;
	updatePlayerStatus();
}
function borrow(){
	var amount = parseInt(document.getElementById("sharkVal").value);
	debt += amount;
	cash += amount;
	updatePlayerStatus();
}
function withdraw(){
	var amount = parseInt(document.getElementById("bankVal").value);
	if(amount<=bank){
		cash += amount;
		bank -= amount;
	}
	updatePlayerStatus();
}
function buyGun(i){
	if(document.getElementById(gunNames[i]).value=="on"){
		if(cash>=gunPrices[i]){
			gunAmounts[i]=1;
			cash-=gunPrices[i];
			guns++;
		}else{
			document.getElementById(gunNames[i]).checked=false;
		}
		
	}else{
		if(gunAmounts[i]==1){
			gunAmounts[i]=0;
			cash+=gunPrices[i];
			guns--;
		}
	}
	updatePlayerStatus();
}


function updateSideItem(){
	var output = "";
	if(currentLoc == "Bronx"){
		output += "<b>Bank</b><br><input type=\"text\" id=\"bankVal\" size= \"10\" /></td><td><input type='submit' value='Deposit' onclick='deposit()'/> <input type='submit' value='Withdraw' onclick='withdraw()'/>";
		output += "<br><br><b>Loan Shark</b><br><input type=\"text\" id=\"sharkVal\" size= \"10\" /></td><td><input type='submit' value='Borrow' onclick='borrow()'/> <input type='submit' value='Repay' onclick='repay()'/>";
	}
	else{
	var i = Math.floor(Math.random()*5);
	output += "<b>Guns</b><br />";
		if(gunAmounts[i])
			output+="<label for='"+gunNames[i]+"'>"+gunNames[i]+"($"+gunPrices[i]+")</label><input checked type='checkbox' id='"+gunNames[i]+"' onclick='buyGun("+i+")' /><br/>";
		else
			output+="<label for='"+gunNames[i]+"'>"+gunNames[i]+"("+gunPrices[i]+")</label><input type='checkbox' id='"+gunNames[i]+"' onclick='buyGun("+i+")'/><br/>";
	}
	document.getElementById("side").innerHTML = output;


}
function deposit(){
	var amount = parseInt(document.getElementById("bankVal").value);
	if(amount<=cash){
		cash -= amount;
		bank += amount;
	}
	updatePlayerStatus();
}
function newsEvent(action){
	newsFeed += action ;
	document.getElementById("news").innerHTML = newsFeed;	
}	
function kill(){
	days=1;
	travel("Bronx");
}

function travel(newLocation){
	currentLoc = newLocation;
	days -= 1;
	debt = Math.floor(debt*(100+interestRate)/100);
	if(days == 0){
		loadHighscore();
	}else{
		updatePlayerStatus();
		newsEvent("Flew to " + newLocation + "<br>");
		getDrugPrice();
		updateSideItem();	
	}

}

function buyStuff(item){

//	var price = parseInt(document.getElementById("drugTable").childNodes[1].childNodes[item*2+2].childNodes[1].innerHTML);
	var price = currentPrice[item];
	if(document.getElementById("drug"+item).value == "")
	{	
		return;
	}
	var quantity = parseInt(document.getElementById("drug"+item).value);
	document.getElementById("drug"+item).value = "";
	//check coat size
	if(quantity+coat > coatSize){
		return;
	}
	//check money available
	if((price*quantity) > cash){
		return;
	}
	//add to coat
	coat += quantity;
	coatInfo[item]+= quantity;
	
	//subtract money
	cash -= (price*quantity);
	updatePlayerStatus();
}


function sellStuff(item){
	var price = currentPrice[item];
	if(document.getElementById("drug"+item).value == "")
        {
                return;
        }
	var quantity = document.getElementById("drug"+item).value;
		
	document.getElementById("drug"+item).value = "";
	if(quantity > coatInfo[item]){
		return;
	}
	//check if item is not being sold in the city
	
	//take away from coat
	coat -= quantity;
	coatInfo[item] -= quantity;
	
	//add to cash
	cash += price*quantity;
	updatePlayerStatus();	
}
