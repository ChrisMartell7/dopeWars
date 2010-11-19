<?php
$title='';
include 'templates/header.php';
$db =new mysqli('127.0.0.1','chris2','eagle','dopewars');

$query = 'select * from highscores order by score desc limit 10';

$results = $db->query($query);

for ($i=1;$i<=10;$i++){
	$score = $results->fetch_assoc();
	echo $score['name'].'<br />';
}


$db->close();
include 'templates/footer.php';
?>
