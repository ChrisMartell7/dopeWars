<?php
$blah = $_GET["access_token"];
$website = "https://graph.facebook.com/me?access_token=".$blah;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $website);
curl_setopt($ch,CURLOPT_RETURNTRANSFER,1);
$json = curl_exec($ch);

$token = json_decode($json, true);
//$uid = token["id"];
$temp = $token["link"];
//$uid = explode("=",$token["link"])[1];

require 'facebook.php';
// Create our Application instance.
$facebook = new Facebook(array(
  'appId'  => '110042632398450',
  'secret' => '63c61ce39cf08a56b0b6f04c8b6ef414',
  'cookie' => true,
));

$session = $facebook->getSession();
$me = null;
// Session based API call.
if ($session) {
  try {
    $me = $facebook->api('/me');
    $uid = $facebook->getUser();
    $name = $me['name'];
    $fName = $me['first_name'];
    $lName = $me['last_name'];
  } catch (FacebookApiException $e) {
    error_log($e);
  }
}


if($token['name'] != ''){
	$name = $token['name'];
	$uid = substr($temp,39);
	$fName = $token['first_name'];
	$lName = $token['last_name'];
}

if(!$me && $token['name'] == ''){
$loginUrl = $facebook->getLoginUrl(
                array(
                'canvas'    => 1,
                'fbconnect' => 0,
                'req_perms' => 'publish_stream'
                )
        );
 	echo "Loading please wait...";
	echo "<script type='text/javascript'>top.location.href = '" . $loginUrl. "';</script>";
}


//add user to visitor log
$con = mysql_connect('127.0.0.1','chris2','eagle');
if($con){
	mysql_select_db("dopewars", $con);
	
	$info = mysql_query("select uid from visitors where uid='$uid'");
	if(mysql_num_rows($info) < 1){
		mysql_query("insert into visitors (uid, fName, lName) values ('$uid', '$fName', '$lName')");
	}
	mysql_close($con);
}
// login or logout url will be needed depending on current user state.
if ($me) {
  $logoutUrl = $facebook->getLogoutUrl();
} else {
  $loginUrl = $facebook->getLoginUrl();
}

// This call will always work since we are fetching public data.
$naitik = $facebook->api('/naitik');

?>

<html xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
	<title>DopeWars</title>
<LINK REL=StyleSheet HREF="style.css" TYPE="text/css" MEDIA=screen>
<script type="text/javascript" src="code.js"></script>

<!-- FB:Like button -->
<br>

<!--
Facebook Junk
-->
<script src="http://connect.facebook.net/en_US/all.js"></script>
   <script>
	try{
	        FB.JSON.stringify = function (value) { return JSON.encode(value);};
	        FB.init({
	          appId   : '<?php echo $facebook->getAppId(); ?>',
	          status  : true, // check login status
	          cookie  : true, // enable cookies to allow the server to access the session
	          xfbml   : true // parse XFBML
	        });
	}
	finally{}
	
    </script>

<!-- End Facebook junk -->

</head>
<body align="left" onload="init('<?php echo $name; ?>', '<?php echo $uid; ?>');">

<script>
  var dialog = {
    method: 'fbml.dialog',
    display: 'dialog',
    fbml: '<fb:header icon="false" decoration="add_border">Hello World!</fb:header><fb:profile-pic uid="5526183"></fb:profile-pic>',
    width: 800,
    height: 100
  };
  FB.ui(dialog, Log.info.bind('fbml.dialog callback'));
</script>

<script type="text/javascript">
function getHighScore(){
        highestScore=<?php
                               $db =new mysqli('127.0.0.1','chris2','eagle','dopewars');
                               $query = 'select * from highscores order by score desc limit 1';
                               $results = $db->query($query);
                               $score = $results->fetch_assoc();
                               echo $score['score'];
                         ?>;
}

</script>


<table width="725" height = "550">
<td width ="150" >
	<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#appId=110042632398450&amp;xfbml=1"></script>
	<fb:like href="http://www.facebook.com/apps/application.php?id=110042632398450" layout="box_count" show_faces="true" width="150"></fb:like>
<!--
<fb:serverFbml  width="150" height ="0">
<script type="text/fbml">
<fb:fbml>
        <fb:share-button class="meta">
        <meta name="title" content="Dope Wars"/>
        <meta name="description" content="Come and sling some dope with me on Dope Wars!"/>
	  <link rel="image_src" href="http://www.hyperarts.com/facebook/static-fbml-bible/_img/share-img-100x150.gif"/>
       <link rel="target_url" href="http://www.facebook.com/dope_war"/>
	  </fb:share-button>
</fb:fbml>
</script>
</fb:serverFbml>
-->	
	<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#appId=110042632398450&amp;xfbml=1"></script><fb:login-button perms="email" show-faces="true" width="150" max-rows="2"></fb:login-button>
	<br><br>

<!--Ads -->
<script type="text/javascript"><!--
google_ad_client = "ca-pub-0186828430337412";
/* dopeWars */
google_ad_slot = "2203235739";
google_ad_width = 120;
google_ad_height = 240;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
<!-- End Ads -->
<br>

</td>

<td width="575" height="100%">
	<div id="menu">
                <div id="aboutButton"> <a class="squarebutton" href="javascript:loadAbout()"><span>About</span></a> </div>
        	<div id="gameButton"> <a class="squarebutton" href="javascript:loadGame()"><span>Game</span></a> </div>
                <div id="highscoreButton"> <a class="squarebutton" href="javascript:loadHighscore()"><span>High Score</span></a></div>
                <div id="inviteButton"> <a class="squarebutton" href="javascript:loadInvite()"><span>Invite</span></a> </div>
		<div id="chatButton"> <a class="squarebutton" href="javascript:loadChat()"><span>Chat</span></a> </div>
        	<div id="currentHighscore"></div>
	</div>
	<!-- This is the main window. It is the main focus -->
	<div id="main">	</div>
</td>
</table>
<br><br>
<button type="button" onclick="updateDrugPrice(); getDrugPrice()">Update!</button>
<button type="button" onclick="kill()">Kill!</button>
<button type="button" onclick="graphStreamPublish()">Post</button>

<br>
<!-- Begin bottom ad -->
<div id="ad2"><script type="text/javascript"><!--
google_ad_client = "ca-pub-0186828430337412";
/* dopeWars Bottom */
google_ad_slot = "8312322855";
google_ad_width = 728;
google_ad_height = 90;
//-->
</script>
<script type="text/javascript"
src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
</div>
<!-- end bottom ad -->
	</center>
</body>

</html>
