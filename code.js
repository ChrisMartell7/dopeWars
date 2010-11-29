
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

var newsFeed;

//will hold current coat. order is same as above (alphabetical)
var coatInfo = [0,0,0,0,0,0,0,0];
var itemInfo;

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
	acidCurrent = Math.round(rand);
	return acidCurrent;
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
	cocaineCurrent =  Math.round(rand);
	return cocaineCurrent;
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
	eCurrent =  Math.round(rand);
	return eCurrent;
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
	heroinCurrent = Math.round(rand);
	return heroinCurrent;
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
	pcpCurrent = Math.round(rand);
	return pcpCurrent;
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
	shroomsCurrent = Math.round(rand);
	return shroomsCurrent;
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
	speedCurrent = Math.round(rand);
	return speedCurrent;
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
	weedCurrent =  Math.round(rand);
	return weedCurrent;
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

function getDrugPrice(){

	document.getElementById("Acid").innerHTML="<th>Acid $</th><td>"+acid() + "</td><td><input type=\"text\" name=\"acid\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(0)'/></td><td><input type='submit' value='sell' onclick='sellStuff(0)'</td>";
	document.getElementById("Cocaine").innerHTML="<th>Cocaine $</th><td>"+cocaine() + "</td><td><input type=\"text\" name=\"cocaine\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(1)'/></td><td><input type='submit' value='sell' onclick='sellStuff(1)'</td>";
	document.getElementById("E").innerHTML="<th>Ecstasy $</th><td>"+e() + "</td><td><input type=\"text\" name=\"e\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(2)'/></td><td><input type='submit' value='sell' onclick='sellStuff(2)'</td>";
	document.getElementById("Heroin").innerHTML="<th>Heroin $</th><td>"+heroin() + "</td><td><input type=\"text\" name=\"heroin\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(3)'/></td><td><input type='submit' value='sell' onclick='sellStuff(3)'</td>";
	document.getElementById("PCP").innerHTML="<th>PCP $</th><td>"+pcp() + "</td><td><input type=\"text\" name=\"pcp\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(4)'/></td><td><input type='submit' value='sell' onclick='sellStuff(4)'</td>";
	document.getElementById("Shrooms").innerHTML="<th>Shrooms $</th><td>"+shrooms() + "</td><td><input type=\"text\" name=\"shrooms\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(5)'/></td><td><input type='submit' value='sell' onclick='sellStuff(5)'</td>";
	document.getElementById("Speed").innerHTML="<th>Speed $</th><td>"+speed() + "</td><td><input type=\"text\" name=\"speed\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(6)'/></td><td><input type='submit' value='sell' onclick='sellStuff(6)'</td>";
	document.getElementById("Weed").innerHTML="<th>Weed $</th><td>"+weed() + "</td><td><input type=\"text\" name=\"weed\" size= \"3\" /></td><td><input type='submit' value='buy' onclick='buyStuff(7)'/></td><td><input type='submit' value='sell' onclick='sellStuff(7)'</td>";
	
}
function init(){
	//create array and initialize to 0
	coatInfo = new Array(8);
	itemInfo = new Array(8);
	for(i = 0; i < 8; i++){
		coatInfo[i]=0;
	}
	updateInfo();	
	getDrugPrice();
	loadItem();
	newsFeed ="";
	newsEvent("<b>News:</b><br>");
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
	updateCoat();

}


function updateCoat(){
	var output = "<b>Coat:</b><br>";
	for (var i = 0; i < coatInfo.length; i++){
		if(coatInfo[i] > 0){
			output += itemInfo[i] + coatInfo[i]; 
		}
	}		
	document.getElementById("drugs").innerHTML = output;
}

function newsEvent(action){
	newsFeed += action ;
	document.getElementById("news").innerHTML = newsFeed;	
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
		newsEvent("Flew to " + newLocation + "<br>");
		getDrugPrice();
	}

}

function buyStuff(item){

	var price = parseInt(document.getElementById("drugTable").childNodes[1].childNodes[item*2+2].childNodes[1].innerHTML);
	var quantity = parseInt(document.getElementById("drugTable").childNodes[1].childNodes[item*2+2].childNodes[2].childNodes[0].value);

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
	updateInfo();
}


function sellStuff(item){
	var price = document.getElementById("drugTable").childNodes[1].childNodes[item*2+2].childNodes[1].innerHTML;
	var quantity = document.getElementById("drugTable").childNodes[1].childNodes[item*2+2].childNodes[2].childNodes[0].value;
		
	if(quantity > coatInfo[item]){
		return;
	}
	//check if item is not being sold in the city
	
	//take away from coat
	coat -= quantity;
	coatInfo[item] -= quantity;
	
	//add to cash
	cash += price*quantity;
	updateInfo();	
}
