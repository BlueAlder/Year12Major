var name = ""
var timeDelay = 0.1;
var inputTimer = timeDelay;

function submitScore(deltaTime)
{

	if (keyboard.isKeyDown(keyboard.KEY_ENTER) ) 
	{
			curGameState = GAMESTATE_SPLASH;
			//check the letters that is pressed down
	}

	if(inputTimer <= 0)
	{
		if (keyboard.isKeyDown(keyboard.KEY_BKSPC) )
		{
				name = name.substring(0, name.length - 1);
		} 
		else
		{
			for(var i = 0;  i < keyboard.keys.length; i ++)
			{
				if(keyboard.keys[i])
				{
					name += String.fromCharCode(i);
				}
			}
		}
		inputTimer = timeDelay;
	}
	else
	{
		inputTimer -= deltaTime;
	}

		


	context.save();

	context.fillStyle = "black";
	context.font = "20px Arial"
	var textMeasure = context.measureText(name);
	context.fillText(name, SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);
	context.restore();

}