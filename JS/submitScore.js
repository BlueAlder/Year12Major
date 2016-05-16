var submitted = false;

function submitScore(deltaTime)
{

	if (!submitted)
	{
		var name = prompt("What is your name?", "John Doe");

		if ( (name != "") && (name.length <= 25) )
		{
			submitted = true;
			document.getElementById("inputName").value = name;
			document.getElementById("inputScore").value = player1.score;
			document.getElementById("submitScore").submit();
			 
			alert("Your score of "+ player1.score+" has been submitted");
		}

		else 
		{
			submitted = true;
			alert("Sorry your name doesn't fit the requirements")
		}
	}



	context.save();
	context.fillStyle = "white";
	context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

	var textMeasure = context.measureText("Loading...")
	context.fillStyle = "black";
	context.fillText("Loading...", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);

	context.restore();
	


}