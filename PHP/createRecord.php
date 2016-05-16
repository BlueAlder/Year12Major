


<?php
	include "includes/connection.php";
	include "includes/ChromePhp.php";

	$name  = $_POST['inputName'];
	$score = intval($_POST['inputScore']);

	$query = "INSERT INTO Scores (id, name, score) VALUES(NULL, '$name', $score)";
	mysql_query($query) or die(mysql_error());

	header('Location: ../index.php');



?>
<h1> Please Wait while your score is being submitted </h1>
<form action="../index.php">
	<input type="Submit" value="Go Back">
</form>


