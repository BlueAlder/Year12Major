


<?php
	include "includes/connection.php";

	$name  = $_POST['inputName'];
	$score = $_POST['inputScore'];

	$query = "SELECT * FROM Scores";
	$result = mysql_query($query);
	$increment = 0;

	$person = mysql_fetch_array($result);
	$numElements = count($person);

	if ($numElements < 10)
	{
		mysql_query("ALTER TABLE Scores AUTO_INCREMENT = $increment");

	

		mysql_query ("INSERT INTO Scores (id, name, score) VALUES(NULL, '$name', '$score')") or die(mysql_error());
		header( 'Location: ../index.php?worked');
	}
	else
	{
		header('Location: ../index.php?nowork');
	}

	
		
	echo "Record Saved";
	
	



?>
<h1> Please Wait while your score is being submitted </h1>

