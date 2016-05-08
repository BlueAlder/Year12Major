<?php
	include 'includes/connection.php';

	$query = "SELECT * FROM scores";

	$result = mysql_query($query);

	while($person = mysql_fetch_array($result)) 
	{
		echo "<h3>" . $person['name'] . "</h3>";
	}



?>