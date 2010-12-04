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
    $me = $facebook->api('/me');
    $uid = $facebook->getUser();
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
	<fb:serverFbml>
	<script type="text/fbml">
	<fb:fbml>
	    <fb:request-form
	        method='POST'
	        type='Sling drugs with me'
	        content='Would you like to try and sling some drugs??'
	            <fb:req-choice url="http://apps.facebook.com/smiley/yes.php" 
	                label="Yes" />'
	            <fb:req-choice url="http://apps.facebook.com/smiley/no.php" 
	                label="No" />'
	        <fb:multi-friend-selector 
	            actiontext="Invite your friends to try and be a better drug dealer than you.">
	    </fb:request-form>
	</fb:fbml>
	</script>
	</fb:serverFbml>
