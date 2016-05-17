function loadLeaderboards()
{


	var names = [document.getElementById("name1").value, 
				 document.getElementById("name2").value,
				 document.getElementById("name3").value,
				 document.getElementById("name4").value,
				 document.getElementById("name5").value,
				 document.getElementById("name6").value,
				 document.getElementById("name7").value,
				 document.getElementById("name8").value,
				 document.getElementById("name9").value,
				 document.getElementById("name10").value];
	
	var scores =[document.getElementById("score1").value,
				 document.getElementById("score2").value,
				 document.getElementById("score3").value,
				 document.getElementById("score4").value,
				 document.getElementById("score5").value,
				 document.getElementById("score6").value,
				 document.getElementById("score7").value,
				 document.getElementById("score8").value,
				 document.getElementById("score9").value,
				 document.getElementById("score10").value];


	context.save();

	context.font = "20px Arial";
	context.fillStyle = "black";

	for(var i = 0; i < names.length; i ++)			//load names
	{
		context.fillText(names[i], 0, i * SCREEN_HEIGHT/10);
	}

	context.font = "10px Arial";
	context.fillStyle = "blue";
	var spacing = 10;	//spacing between name and score in the fields

	for (var i = 0; i < scores.length; i++)
	{
		context.fillText(scores[i], 0, i * SCREEN_HEIGHT/10 + spacing);
	}


	context.restore();
	
	if (keyboard.isKeyDown(keyboard.KEY_ENTER) )
	{
		curGameState = GAMESTATE_SPLASH;
	}

}