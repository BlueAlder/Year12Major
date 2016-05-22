var canvas = document.getElementById("gameCanvas");		//set canvas variable from HTML and get the context
var context = canvas.getContext("2d");

var startFrameMillis = Date.now();
var endFrameMillis = Date.now();			//intialise the delta time

var keyboard = new Keyboard();	//initialise keyboard and player
var mouse = new Mouse();
var player1 = new Player();

var wordList = "http://bluealder.github.io/wordLists/";		//define location of list of words 
								//convert this txt file to array

var wordToSpell;		//intialise varibles
var scrambledWord;

var documentReady = true;
	



//GET GLOBAL VARIABLES

var SCREEN_WIDTH = canvas.width;
var SCREEN_HEIGHT = canvas.height;

var Cam_X = 0;		//intiate the camera for scrolling map
var Cam_Y = 0;
var Cam_ratio = 0.07;

var GAMESTATE_SPLASH = 0;				//create variables for gamestates so not confused
var GAMESTATE_GAME = 1;
var GAMESTATE_ENDGAME = 2;
var GAMESTATE_WIN = 3;
var GAMESTATE_LEADERBOARDS = 4;
var GAMESTATE_SUBMIT = 5;
var GAMESTATE_MINIGAME = 6;
var curGameState = GAMESTATE_SPLASH;	//set initial game state

var LEVEL_TIME = 30;

var mapWordLength;

var fps = 0;		//start the FPS
var fpsCount = 0;
var fpsTime = 0;


function getDeltaTime(){
	endFrameMillis = startFrameMillis;	
	startFrameMillis = Date.now();

	//this finds the time between the last animation request frame and the next one
	//this is so that 
	var deltaTime = (startFrameMillis - endFrameMillis) * 0.001;

	if (deltaTime > 1)
	{
		deltaTime = 1;
	}

	return deltaTime;
}

function loadMap() 		//this function selects a random word from the list and then loads
						//the map and collision for when the player starts a new map
{		
	var developingOnBus = false;

	mapWordLength = lengthOfWordInMap();		//no internet connection
	if (developingOnBus)
	{
		wordToSpell = "mid";
	}
	else
	{
		populateWordList(wordList + mapWordLength + "letters.txt");	//get appropriate word list
		wordToSpell = selectWord(mapWordLength);
	}

	
		

	loadCollisionMap(currentMap);		//loads collision map of the current map
	player1.code.push(wordToSpell);		//adds the word to the players 'code'
	console.log(player1.code);					
	

	scrambledWord = scrambleWord(wordToSpell);		//randomise order of word
	definePlacements(mapWordLength);				//assign each placement to a letter

}



function run() {		//the main function that is called each time the screen is to be updated from the animation frame

	if (documentReady)
	{
		var deltaTime = getDeltaTime();

		context.fillStyle = "red";
		context.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);


		context.save();
		context.globalAlpha = "0.5"
		context.drawImage(background, 0, 0);
		context.restore();




		switch(curGameState)				//choose which game state to run and choose appropriate function
		{
			case GAMESTATE_SPLASH:
				runSplash(deltaTime);
				break;
			case GAMESTATE_GAME:
				runGame(deltaTime);
				break;
			case GAMESTATE_WIN:
				runWin(deltaTime);
				break;
			case GAMESTATE_ENDGAME:
				runEndGame(deltaTime);
				break;
			case GAMESTATE_LEADERBOARDS:
				runLeaderboards(deltaTime);
				break;
			case GAMESTATE_SUBMIT:
				runSubmitScore(deltaTime);
				break;
			case GAMESTATE_MINIGAME:
				runMiniGame(deltaTime);


		}

		

		

		fpsTime += deltaTime;		//update fps counter
		fpsCount++;

		if (fpsTime >= 1){
			fpsTime -= 1;
			fps = fpsCount;
			fpsCount = 0;
		}

		var drawUIDebug = false;

		if (drawUIDebug)		//draws debuggin info about the current state of the game
		{


			var pushDown = 30;

			context.fillStyle = "blue";
			context.font="14px Arial";	
			context.fillText("FPS: " + fps, 5, 55 + pushDown);

			//context.fillText("Current Word: " + wordToSpell, 5, 70 + pushDown, 200);

			context.fillText("Inventory: " + player1.inventory, 5, 85 + pushDown, 100);

			context.fillText("MouseX: " +mouse.getX(), 5, 100 + pushDown);
			context.fillText("MouseY: " +mouse.getY(), 5, 115 +  pushDown);

			context.fillText("PlayerX: "+Math.round(player1.x), 5, 130 + pushDown);
			context.fillText("PlayerY: "+Math.round(player1.y), 5, 145 + pushDown);
		}

	}

	else		//if the document has not loaded all the elemets display a loading screen
	{
		context.fillStyle = "black";
		context.fillRect(0,0, SCREEN_WIDTH, SCREEN_HEIGHT);

		context.fillStyle = "white";
		context.font = "50px Arial";
		var textMeasure = context.measureText("Loading...");
		context.fillText("Loading...", SCREEN_WIDTH/2 - textMeasure.width/2, SCREEN_HEIGHT/2);
	}


}

function drawDebug(_cam_x, _cam_y)		//various debugging tools that are actuivated but hcangin a boolean
{	

	context.save();
	var drawOutlinePlayer = false;

	if (drawOutlinePlayer)	//box around the hit box of the player
	{
		context.strokeRect(player1.x - TILE - _cam_x, player1.y - player1.height/2 - _cam_y, 2 * TILE, player1.height);

	}

	
	context.fillStyle = "red";
	context.fillRect(player1.x - _cam_x, player1.y - _cam_y , 5, 5);

	var draw_cells = false;

	if (draw_cells){		//draw the cells that are being used to check collision


	context.strokeStyle = 'red';
	context.strokeRect(player1.x - _cam_x, player1.y - _cam_y, TILE, TILE);		//DRAW CELL
	context.strokeRect(player1.x - _cam_x - TILE, player1.y - _cam_y, TILE, TILE);		//DRAW CELL left
	context.strokeRect(player1.x - _cam_x + TILE, player1.y - _cam_y, TILE, TILE);		//DRAW CELL RIGHT
	//context.strokeRect(player1.x - _cam_x, player1.y - _cam_y + TILE, TILE, TILE);		//DRAW CELL DOWN
	context.strokeRect(player1.x - _cam_x + TILE, player1.y + TILE - _cam_y, TILE, TILE);		//DRAW CELL DIAG RIGHT
	//context.strokeRect(player1.x - _cam_x - TILE, player1.y - _cam_y + TILE, TILE, TILE);		//DRAW CELL

	}

	
	context.restore();

	var drawLetterCell = false;


	if (drawLetterCell)		//draw the places where the letters are being placed
	{
		for(var i = 0; i < letterCoords.length ; i++)
		{	
			context.fillStyle = "blue";
			context.fillRect(tileToPixel(letterCoords[i][1]) - _cam_x, tileToPixel(letterCoords[i][2]) - _cam_y, TILE, TILE);
		}
	}



	context.restore();


}

function debug_draw_map(input_cells, _cam_x, _cam_y)	//this draws the collision boxes around the various layers
{


	var drawMapDebug = false;
	if (drawMapDebug)
	{



	    context.save();


	    for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	    {

	        for(var y = 0; y < input_cells[layerIdx].length; y++)
	        {
	            for(var x = 0; x < input_cells[layerIdx][y].length; x++)
	            {
	                if(input_cells[layerIdx][y][x] !=  0)
	                {
	                	if (layerIdx == LAYER_PLATFORMS)
	                	{	
	                		context.strokeStyle = "green";
	                		context.lineWidth = 1;
	                		context.strokeRect(x * TILE- _cam_x, y * TILE - _cam_y, TILE, TILE);
	                	}

	                	
	                    
	                    

	                }
	            }
	        }
	    }
	    
	    context.restore();
	}
}


function runSplash(deltaTime)		//the splash sscereen gamestate
{
	var buttonWidth = SCREEN_WIDTH/2 - 30

	if(  (mouse.x >= 20) 						&& 		//create a 'button' that and check for bounds of a click
		(mouse.x <= 20 +  SCREEN_WIDTH/2 - 30)  && 
		(mouse.y >= SCREEN_HEIGHT/2 + 50) 		&& 
		(mouse.y <= SCREEN_HEIGHT/2 + 50 + 100) )
	{
		context.font = "30px Arial";
		if (mouse.mouseState === MOUSE_DOWN)		//start the game
		{		
			backgroundMusic.play(); 		//FIX
			curGameState = GAMESTATE_GAME;	//change game state to playing game
			restartGame();
		}
	}

	else if ( (mouse.x >= SCREEN_WIDTH/2 + 10)  &&		//second button is to view the leaderboards
			   mouse.x <= SCREEN_WIDTH/2 + 10 + buttonWidth &&
			   mouse.y >= SCREEN_HEIGHT/2 + 50  &&
			   mouse.y <= SCREEN_HEIGHT/2 + 50 + 100)
	{
		context.font = "30px Arial";
		if (mouse.mouseState === MOUSE_DOWN)
		{
			curGameState = GAMESTATE_LEADERBOARDS;	//change gamestate to view the leaderboards

		}
	}

	else
	{
		context.font = "20px Arial";
	}
	

	//the following draws the elements that is on the splash screen itself
	context.save();
	context.fillStyle = "black";
	
	context.globalAlpha = 1;
	context.lineWidth = 2;

	context.drawImage(getTheCodeLogo, SCREEN_WIDTH/2 - getTheCodeLogo.width/2, 50, getTheCodeLogo.width, getTheCodeLogo.height);


	//draw button boxes
	context.fillRect(20, SCREEN_HEIGHT/2 + 50, buttonWidth, 100 );		//left box
	context.fillRect(SCREEN_WIDTH/2 + 10, SCREEN_HEIGHT/2 + 50, buttonWidth, 100); 	//right box

	context.fillStyle = "blue";
	var textMeasure = context.measureText("Play The Game!");
	context.fillText("Play The Game!", 20 + (SCREEN_WIDTH/2 - 30)/2 - textMeasure.width/2, (SCREEN_HEIGHT/2 + 50) + (100)/2  );	

	textMeasure = context.measureText("View Leaderboards");
	var drawX = SCREEN_WIDTH/2 + 10 + (SCREEN_WIDTH/2 - 30)/2 - textMeasure.width/2;
	var drawY = (SCREEN_HEIGHT/2 + 50) + (100)/2;
	context.fillText("View Leaderboards", drawX, drawY);


	context.restore();


}

function runGame(deltaTime)		//the main function that alls the sub-modules that the game runs
								//self-explanatory in their names
{
	updateTimer(deltaTime);
	updateLevel();
	player1.Update(deltaTime);
	updateCamera();


	drawLevel(Cam_X, Cam_Y, scrambledWord);
	player1.Draw(deltaTime, Cam_X, Cam_Y);
	drawDebug(Cam_X, Cam_Y);
	debug_draw_map(cells, Cam_X, Cam_Y);
	drawUI();




}

function runWin(deltaTime) 		//the winning game state
{
	context.fillStyle = "black";
	context.font = "50px Arial";
	var textMeasure = context.measureText("Congrats You Win!");
	context.fillText("Congrats You Win!", SCREEN_WIDTH/2 - (textMeasure.width/2), SCREEN_HEIGHT/2);

	submitScore();

	if (keyboard.isKeyDown(keyboard.KEY_ENTER))		//return back to splash screen
	{
		curGameState = GAMESTATE_SPLASH;

	}
	else if(keyboard.isKeyDown(keyboard.KEY_F))	//they can submit their score for entry into leaderboards
	{
		curGameState = GAMESTATE_SUBMIT;
	}


}

function runEndGame(deltaTime)		//when the player loses the game splash
{
	context.fillStyle = "black";
	context.font = "50px Arial";
	var textMeasure = context.measureText("sry ur silly,");
	context.fillText("sry ur silly,", SCREEN_WIDTH/2 - (textMeasure.width/2), SCREEN_HEIGHT/2);

	textMeasure = context.measureText("cant spel "+ wordToSpell);
	context.fillText("cant spel "+ wordToSpell, SCREEN_WIDTH/2 - (textMeasure.width/2), SCREEN_HEIGHT/2 + 50);

	context.fillText("Press 'f' to submit score", 20, SCREEN_HEIGHT - 20);

	if (keyboard.isKeyDown(keyboard.KEY_ENTER))	//option to return back to the splash screen
	{
		curGameState = GAMESTATE_SPLASH;
		player1.Reset();

	}

	else if(keyboard.isKeyDown(keyboard.KEY_F))	//they can submit their score for entry into leaderboards
	{
		curGameState = GAMESTATE_SUBMIT;
	}
}

function runSubmitScore(deltaTime) //this function allows the player to submit their score to the database
{
	context.save();

	context.font = "30px Arial";
	context.fillStyle = "black";

	textMeasure = context.measureText("Press F to Submit Score");
	context.fillText("Press F to Submit Score", SCREEN_WIDTH/2 - textMeasure.width, SCREEN_HEIGHT); 
	if (keyboard.isKeyDown(keyboard.KEY_F) && !accepted)	//make sure they havent already submitted a score
	{
		submitted = false;
	}

	else if (keyboard.isKeyDown(keyboard.KEY_ENTER)) //bring them back to the splash screen
	{
		curGameState = GAMESTATE_SPLASH;
	}

	submitScore(deltaTime);	//submit their score

	context.restore();
}

function runLeaderboards(deltaTime)		//run leaderbaords 
{
	loadLeaderboards();
	
	if (keyboard.isKeyDown(keyboard.KEY_ENTER))
	{
		curGameState = GAMESTATE_SPLASH;
	}
}

function runMiniGame(deltaTime)	//run the minigame between level difficulties
{
	miniGame(deltaTime);
}

function updateCamera()	//this updates the camera that follows the player around
						//also using the lerp function to give it a slight delay
{
	var left_stop = 0;
	var top_stop = 0;
	var right_stop = TILE * MAP.tw - SCREEN_WIDTH;
	var bottom_stop = TILE * MAP.th - SCREEN_HEIGHT;

	var new_pos_x = player1.x - SCREEN_WIDTH/2;
	var new_pos_y = player1.y - SCREEN_HEIGHT/2;

	if (new_pos_x < left_stop)		//stop on left of map
	{
		new_pos_x = left_stop;
	}

	else if (new_pos_x > right_stop)	//stop on right of map
	{
		new_pos_x = right_stop;
	}



	if (new_pos_y < top_stop)		//stop of top of map
	{
		new_pos_y = top_stop;
	}

	else if (new_pos_y > bottom_stop)		//stop on bottom of map
	{
		new_pos_y = bottom_stop;
	}


	var lerpedCamX = lerp(Cam_X, new_pos_x, Cam_ratio);		//LERP LERP
	var lerpedCamY = lerp(Cam_Y, new_pos_y, Cam_ratio);


	Cam_X = lerpedCamX;
	Cam_Y = lerpedCamY;


	
}

function lerp(left_value, right_value, ratio)	//small delay in value
{
	return left_value + ratio * ( right_value - left_value);
};


function restartGame()			//reset the entire game from when a player wins or loses
{	
	curGameState = GAMESTATE_GAME;
	currentLevel = STARTING_LEVEL;
	changeMap();
	player1.lives = LIVES;
	player1.respawn;

}


//this function calls the 'run' function 60 times a second so that the game is running at 60 FPS, it requests the animation frame
//depending on whether the browser supports it or just manulaly sets it.
(function()
{
	var onEachFrame;
	if(window.requestAnimationFrame)
	{
		onEachFrame = function(cb)
		{
			var _cb = function() { cb(); window.requestAnimationFrame(_cb); }
			_cb();
		};
	}

	else if(window.mozRequestAnimationFrame)
	{
		onEachFrame = function(cb)
		{
			var _cb = function() {cb(); window.mozRequestAnimationFrame(_cb); }
			_cb();
		};

	}

	else
	{
		onEachFrame = function(cb)
		{
			setInterval(cb, 1000/60);
		}
	}


	window.onEachFrame = onEachFrame;
}
)();


$('img').on("load", function() {documentReady = true;} );

window.onEachFrame(run);		//call the run function

