

<!DOCTYPE html>
<head>
	<title>Sam Calamos</title>
	<link rel="stylesheet" type="text/css" href="Styles/styles.css" />
</head>


<body>
	<div class="topBanner">
		<div id= "leftLogo">
			<center><img id="logo" src="Graphics/getTheCodeLogo.png" style = "width:100;height:100px;"></center>
		</div>	
		<div id="topTitle">
			<h1>GET THE CODE V3.2.0</h1>
		</div>
	</div>

	<div id="canvas">
		<center><canvas id="gameCanvas" width="640" height="480">
			If you can read this text then your browser does not support HTML 5
		</canvas></center>
		<script src="JS/jquery-2.2.3.js"></script>
		<script src="JS/submitScore.js"></script>
		<script src="JS/letters.js"></script>
		<script src="JS/words.js"></script>
		<script src="JS/levelData.js"></script>
		<script src="JS/level.js"></script>
		<script src="JS/element loader.js"></script>
		<script src="JS/animation.js"></script>
		<script src="JS/player.js"></script>
		<script src="JS/keyboard.js"></script>
		<script src="JS/mouse.js"></script>
		<script src="JS/main.js"></script>
	</div>


	<div id="footer">
		<p>Controls are arrow keys or WASD</p>
		<p>E or CONTROL to interact with letters</p>
		<p>Sam Calamos 2016  &#169</p>
	</div>


	<form action="PHP/includes/createRecord.php" name="submitScore" method="post">
		Name<input type = "text" name = "inputName" value = "" /><br>
		Score<input type = "text" name = "inputScore" value = "" />
		<br/>

		<input type="submit" name = "submit" />

</body>

<?php
		
		include 'PHP/includes/connection.php';

		$query = "SELECT * FROM Scores";
		$result = mysql_query($query);

		while($person = mysql_fetch_array($result) )
		{
			echo "<h3 style='color:white;' >" . $person['name'] . "</h3>";
			echo "<h3 style='color:white;' >" . $person['score'] . "</h3>";
		}
?>



</html>