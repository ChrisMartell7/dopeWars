<?php

appId="110042632398450";
appSecret="63c61ce39cf08a56b0b6f04c8b6ef414";
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
		echo '<tr><td>'.$user.'</td><td>'.$newScore.'</td></tr>';
		$i++;
		$newScore=0;//so it doesn't print multiple times
	}
	echo '<tr><td>'.$score['name'].'</td><td>'.$score['score'].'</td></tr>';
	
}
?>
</table>
<?php

$db->close();
include 'templates/footer.php';
?>
