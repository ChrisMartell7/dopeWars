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

$uid= substr($temp,39);
$name = $token['name'];
$session = $facebook->getSession();
$me = null;
// Session based API call.
if ($session) {
  try {
    $uid = $facebook->getUser();
    $me = $facebook->api('/me');
    $name = $me['name'];
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
<head>
</head>

<iframe src="http://www.facebook.com/plugins/live_stream_box.php?app_id=110042632398450&amp;width=400&amp;height=500&amp;via_url&amp;always_post_to_friends=false" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:400px; height:500px;" allowTransparency="true"></iframe>

</html>
