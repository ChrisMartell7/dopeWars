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



<fb:serverFbml style="width: 550px; height: 490px;" height="490" width="550" >
        <script type="text/fbml">
        <fb:fbml>

            <fb:request-form
                method='POST'
                type='Come sling some dope with me!'
                content='Would you like to try and sling some drugs??'
                    <fb:req-choice url="http://apps.facebook.com/110042632398450"
                        label="Confirm" />
                <fb:multi-friend-selector cols="4" style="width: 550px; height: 490px;"
                    actiontext="Invite your friends to the dark world of drug trading. ">
            </fb:request-form>
        </fb:fbml>
        </script>
</fb:serverFbml>



<!--
<fb:serverFbml style="width: 550px;">  
     <script type="text/fbml">
        <fb:fbml>
            <fb:request-form
                action="http://apps.facebook.com/110042632398450/"
                method="POST"
                invite="true"
                type="XFBML"
                content="This is a test invitation from XFBML test app">
                <fb:req-choice url="http://apps.facebook.com/110042632398450/" label="Confirm" />
             </fb:request-form>
                <fb:multi-friend-selector
                    showborder="false"
                    actiontext="Invite your friends to use Facebook." />
         </fb:fbml>
    </script>
</fb:serverFbml>

-->
