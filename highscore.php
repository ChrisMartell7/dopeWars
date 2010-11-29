<?php

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
    $uid = $facebook->getUser();
    $me = $facebook->api('/me');
  } catch (FacebookApiException $e) {
    error_log($e);
  }
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
<body>

Hello <fb:name uid='<?php echo $fb_user; ?>' useyou='false' possessive='true' />! Welcome to my first application!

<?php

/* We'll also echo some information that will
  help us see what's going on with the Facebook API: */
echo "<pre>Debug:" . print_r($facebook,true) . "</pre>";

?>



<?php

if(isset($_GET['money']))
	$newScore = (int)$_GET['money'];
else 
	$newScore=0;


$title='HighScores';
include 'templates/header.php';
$db =new mysqli('127.0.0.1','chris2','eagle','dopewars');

$query = 'select * from highscores order by score desc limit 10';

$results = $db->query($query);
?>
<table>
<tr>
<th>Name</th><th>Score</th>
</tr>
<?php
for ($i=1;$i<=10;$i++){
	$score = $results->fetch_assoc();
	if ($newScore > (int)$score['score']){
		//get userName from facebook
		$user = 'new';
		
		$query = 'insert into highscores values(null,"'.$user.'",'.$newScore.');';
		$db->query($query);	
		echo '<tr class="newScore"><td class="name">'.$user.'</td><td class="score">'.$newScore.'</td></tr>';
		$i++;
		$newScore=0;//so it doesn't print multiple times
	}
	echo '<tr><td class="name">'.$score['name'].'</td><td class="score">'.$score['score'].'</td></tr>';
	
}


?>
</table>
<?php

$db->close();
include 'templates/footer.php';

?>

</body>
</html>
