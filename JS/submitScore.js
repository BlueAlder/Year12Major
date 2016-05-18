var submitted = false;
var accepted = false;

function submitScore(deltaTime)
{

	if (!submitted)
	{
		var name = prompt("What is your name? (max 11 Characters", "John Doe");

		if ( (name != "") && (name.length <= 11) )
		{
			submitted = true;
			accepted = true;
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


	if (accepted)
	{
		context.save();
		context.fillStyle = "white";
		context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
	
		var textMeasure = context.measureText("Loading...")
		context.fillStyle = "black";
		context.fillText("Loading...", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);
	
		context.restore();
	}
	
	


}