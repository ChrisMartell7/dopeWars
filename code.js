
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

//current drug prices
var acidCurrent = 0;
var cocaineCurrent = 0;
var eCurrent = 0;
var heroinCurrent = 0;
var pcpCurrent = 0;
var shroomsCurrent = 0;
var speedCurrent = 0;
var weedCurrent = 0;

//will hold current coat. order is same as above (alphabetical)
var coatInfo;
var itemInfo;

function acid(){
	var min = acidMin;
	var max = acidMax;
	if(currentLoc == "Bronx"){
		min = min /2;
	}else if (currentLoc === "Coney Island"){
		max = max * 2;
	}
}

function loadItem(){
	itemInfo[0] = "Acid ";
	itemInfo[1] = "Cocaine ";
	itemInfo[2] = "E ";
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
						"<textarea name=\"drug\" cols=\"3\" rows=\"1\">"+
						coatInfo[i]+
						"</textarea> "+
						"<input type=\"submit\" value=\"Sell\" /> " +
						"<input type=\"submit\" value=\"Dump\" /> " +
						"</form>";
		}
	}
}

function getDrugPrice(city){
	amount = 20;//random numbers
	price = 10;

	document.getElementById("Acid").innerHTML="Acid ("+amount+"): $"+price;
	document.getElementById("Cocaine").innerHTML="Cocaine ";
	document.getElementById("E").innerHTML="Ecstasy ";
	document.getElementById("Heroin").innerHTML="Heroin ";
	document.getElementById("PCP").innerHTML="PCP ";
	document.getElementById("Shrooms").innerHTML="Shrooms ";
	document.getElementById("Speed").innerHTML="Speed ";
	document.getElementById("Weed").innerHTML="Weed ";
	
}
function init(){
	//create array and initialize to 0
	coatInfo = new Array(8);
	itemInfo = new Array(8);
	for(i = 0; i < 8; i++){
		coatInfo[i]=0;
	}
	updateInfo();	
	loadItem();
	getDrugPrice("g");
}

function updateInfo(){
	document.getElementById("Days").innerHTML="Days: " + days;
  	document.getElementById("Coat").innerHTML="Coat: " + coat + "/<span id=\"CoatSize\"></span>";
	document.getElementById("CoatSize").innerHTML=coatSize;
	document.getElementById("Cash").innerHTML="Cash: $" + cash;
	document.getElementById("Debt").innerHTML="Debt: $" + debt;
	document.getElementById("Guns").innerHTML="Guns: " + guns;
	document.getElementById("Bank").innerHTML="Bank: $" + bank;
	document.getElementById("Health").innerHTML="Health: " + health;
	document.getElementById("CurrentLoc").innerHTML="Current City: " + currentLoc;
}

function travel(newLocation){
	currentLoc = newLocation;
	days -= 1;
	debt = Math.floor(debt*(100+interestRate)/100);
	if(days == -1){
	//	document.print("<meta http-equiv=\"refresh\" content =\"\" url='highscore.php'");
		window.location="highscore.php"	
	}else{
		updateInfo();
	}
}

function buyStuff(item, price, quantity){
	//check coat size
	if(quantity > coatSize){
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
}

function sellStuff(item, price, quantity){
	if(quantity > coatInfo[item]){
		return;
	}
	//check if item is not being sold in the city
	
	//take away from coat
	coat -= quantity;
	coatInfo[item] -= quantity;
	
	//add to cash
	cash += price*quantity;
	
}
