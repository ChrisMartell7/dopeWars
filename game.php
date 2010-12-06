<center>
        <div id="gameinfo">
                <div id="userInfo"></div>
		<div id="userScore"></div>
        </div>
	<div id="playerStatus">
                <div id="JetTo">
                                Jet to: <select id="loc" onchange="travel(this.value);">
                                        <option value="Bronx">Bronx</option>
                                        <option value="Ghetto">Ghetto</option>
                                        <option value="Queens">Queens</option>
                                        <option value="Central Park">Central Park</option>
                                        <option value="Manhatten">Manhatten</option>
                                        <option value="Brooklyn">Brooklyn</option>
                                        <option value="Coney Island">Coney Island</option>
                                </select>
                </div>
                <div id="Days"></div>
                <div id="Coat"></div>
                <div id="CoatSize"></div>
                <div id="Cash"></div>
                <div id="Debt"></div>
                <div id="Bank"></div>
                <div id="CurrentLoc"></div>
                <div id="Guns"></div>
                <div id="Health"></div>
        </div>

        <!-- Row 1 will hold the news and side items -->
        <div id="row1">
                <div id="news" align="left" style="overflow-y:scroll"></div>
                <div id="side"></div>
        </div>
	<div id="row2">
                <div id="city">
                   <table id="drugTable" style="height:100%">
                        <tr><th>Drug Name</th><td>Price</td><td>Quantity</td><td>Buy</td><td>Sell</td></tr>
                        <tr id="Acid"></tr>
                        <tr id="Cocaine"></tr>
                        <tr id="Ecstasy"></tr>
                        <tr id="Heroin"></tr>
                        <tr id="PCP"></tr>
                        <tr id="Shrooms"></tr>
                        <tr id="Speed"></tr>
                        <tr id="Weed"></tr>
                   </table>
                </div>
                <div id="coatList"></div>
        </div><!-- end row2 -->
</center>
