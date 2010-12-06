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

?>
<div id="fb-root"></div><script src="http://connect.facebook.net/en_US/all.js#appId=110042632398450&amp;xfbml=1"></script>
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

        var dialog = {
    method: 'fbml.dialog',
    display: 'dialog',
    fbml: '<fb:header icon="false" decoration="add_border">Hello World!</fb:header><fb:profile-pic uid="5526183"></fb:profile-pic>',
    width: 800,
    height: 100
  };

    </script>
<fb:serverFbml >
  
 <script type="text/fbml">
        <fb:fbml>
		<fb:redirect url="https://graph.facebook.com/oauth/authorize?client_id=110042632398450&redirect_uri=redirect2.php?&type=user_agent&display=popup" />
//<fb:redirect url="http://www.facebook.com/connect/uiserver.php?app_id=110042632398450&method=permissions.request&display=popup&next=http://173.203.90.74/dopeWars/%3F&type=user_agent&fbconnect=1" />

	</fb:fbml>
</script>
</fb:serverFbml>
  
<script type="text/javascript">
//window.location="http://www.facebook.com/connect/uiserver.php?app_id=110042632398450&method=permissions.request&display=popup&next=http://173.203.90.74/dopeWars/%3F&type=user_agent&fbconnect=1"
</script>
