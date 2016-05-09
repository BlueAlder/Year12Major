<?php
	include "connection.php";

	$name = $_POST['inputName'];
	$score = $_POST['inputScore'];

	if(!$_POST['submit'])
	{
		echo "value not submitted";
		header('Location: ../../index.php');
	}

	else{
		mysql_query ("INSERT INTO Scores (id, name, score) VALUES(NULL, '$name', '$score')") or die(mysql_error());

		echo "Record Saved";
		header('Location: ../../index.php');
	}
?>