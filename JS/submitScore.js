

function submitScore(deltaTime)
{

	var name = prompt("What is your name?");
	

	document.getElementById("inputName").value = name;
	document.getElementById("inputScore").value = player1.score;

	document.getElementById("submitScore").submit();
	 
	alert("Your score of "+ player1.score+" has been submitted");


		
	curGameState = GAMESTATE_SPLASH;

}