<style>
.newScore{
	font-weight:bold;
}
</style>
<center>
<?php

if(isset($_GET['money']))
	$newScore = (int)$_GET['money'];
else 
	$newScore=0;


$title='HighScores';
$db =new mysqli('127.0.0.1','chris2','eagle','dopewars');

$query = 'select * from highscores order by score desc limit 10';

$results = $db->query($query);
$done = true;
?>
<script type="text/javascript">
	if(days == 0){
		<?php $done=false; ?>
	}
</script>
<table>
<tr>
<th style="width:5em">Name</th><th>Score</th>
</tr>
<?php
for ($i=1;$i<=10;$i++){
	$score = $results->fetch_assoc();
	if ($newScore > (int)$score['score'] && $done == true){
		//get userName from facebook
		$user = $_GET['name'];
		
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
<input type="submit" value="Play Again?"  onclick="initializeValues();loadGame();" />
<?php

$db->close();

?>
</center>
