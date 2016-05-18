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

	context.font = "40px Arial";
	context.fillStyle = "black";
	var topShift = 50;

	for(var i = 0; i < names.length/2; i ++)			//load names from first half of leaderboards
	{
		context.fillText((i + 1)+". "+names[i], 0, (i + 1) * SCREEN_HEIGHT/(scores.length/2) - topShift);
	}

	for (var u = names.length/2; u < names.length; u++)		//load names from second half of leaderbaords
	{
		context.fillText((u + 1)+". "+names[u], SCREEN_WIDTH/2, (u - scores.length/2 + 1) * SCREEN_HEIGHT/(scores.length/2) - topShift);
	}

	context.font = "30px Arial";
	context.fillStyle = "blue";
	var spacing = 40;	//spacing between name and score in the fields

	for (var i = 0; i < scores.length/2; i++)
	{
		context.fillText(scores[i], 0, (i + 1) * SCREEN_HEIGHT/(scores.length/2) + spacing - topShift);
	}

	for (var u = scores.length/2; u < scores.length; u ++)
	{
		context.fillText(scores[u], SCREEN_WIDTH/2, (u - scores.length/2 + 1) * SCREEN_HEIGHT/(scores.length/2) + spacing - topShift);
	}



	context.restore();
	
	if (keyboard.isKeyDown(keyboard.KEY_ENTER) )
	{
		curGameState = GAMESTATE_SPLASH;
	}

}