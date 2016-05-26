//THE MAIN IDEA BEHIND THIS GAME IS THAT YOU HAVE TO CLICK LETTERS ON YOUR KEYBOARD AS FAST AS POSSIBLE AND IF ITS RIGHT THEN
//YOU GET THE NEXT LETTER IF YOU COMPLETE THE WORD IN THE SET AMOUNT OF TIME THEN YOU WIN THE LIFE


var PLAYING = 0
var WIN = 1;
var LOSE = 2;

var miniGameState = PLAYING;

var instructionTimer = 4;

var MINIGAME_TIMER = 0.5;
var wordTimer = MINIGAME_TIMER;

function miniGame(deltaTime)
{	
		//get first word spelt
	context.save();
	
	context.font = "30px Andale Mono";
	context.fillStyle = "blue"; 
	var userInput = "";

	if (miniGameState == PLAYING)
	{


		if (instructionTimer > 0)
		{
			
			var textMeasure = context.measureText("Please type your code as it appears on the screen");
			context.fillText("Please type your code as it appears on the screen", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);
			instructionTimer -= deltaTime;
		}

		else if (wordTimer > 0)
		{
			
			var textMeasure = context.measureText(player1.code[0]);
			context.fillText(player1.code[0], SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);
			wordTimer -= deltaTime;

			if (wordTimer <= 0)
			{
				context.fillStyle = "black";
				context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
				context.fillStyle = "white";
				context.fillText("?", SCREEN_WIDTH/2, SCREEN_HEIGHT/2);
			}
		}
		else
		{	
			
			userInput = prompt("Spell the Word!");
			if (userInput === player1.code[0])
			{
				player1.code.splice(0 , 1);

				if (player1.code.length == 0)
				{	
					backgroundMusic.mute();
					miniGameState = WIN;
					player1.lives ++;
					player1.score += 50;
					gotCodeSFX.play();
				}

				
			}
			else
			{
				miniGameState = LOSE;
			}
			wordTimer = MINIGAME_TIMER + 1;	//add one due to delta time being 1 from the prompt
		}
	}
	
	else if (miniGameState == WIN)
	{
		var textMeasure = context.measureText("You Got The Code!");
		context.fillText("You Got The Code!", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2 - 40);
		textMeasure = context.measureText("Have a life and 50 Points!");
		context.fillText("Have a life and 50 Points!", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2)
		textMeasure = context.measureText("Press Enter to Continue!");
		context.fillText("Press Enter to Continue!", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2 + 40);

	}

	else if (miniGameState == LOSE)
	{
		var textMeasure = context.measureText("You lose the code :(");
		context.fillText("You lose the code :(", SCREEN_WIDTH/2  - textMeasure.width/2, SCREEN_HEIGHT/2);
		textMeasure = context.measureText("Press Enter to Continue!");
		context.fillText("Press Enter to Continue!", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2 + 40);
	}



	if (keyboard.isKeyDown(keyboard.KEY_ENTER) && (miniGameState == WIN || miniGameState == LOSE ))
	{
		miniGameState = PLAYING;
		instructionTimer = 5;
		curGameState = GAMESTATE_GAME;
		currentLevel++;
		player1.code = [];
		player1.levelLoop = 0;
		changeMap();
		
	}

	context.restore();

}