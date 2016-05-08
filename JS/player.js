//GLOBAL PHYSICS VARIABLES

var METER = TILE; //CHANGE THIS TO MAKE IT MODULAR
var GRAVITY = METER * 9.8 * 3 ; //the '2' is the gravity multiplier
var MAXDX = METER * 10; //max xVelocity
var MAXDY = METER * 20; //max 
var ACCEL = MAXDX * 2; //acceleration in the x direction
var JUMP  = METER * 2200; // JUMPING AMOUNT usually 1800
var FRICTION = MAXDX * 6;

var TIME_PICKUP = 0.2;		//time in seconds between picking up letters;



var self = this;

//assign variables to allow for states

var LIVES = 3;

var LEFT = 0;
var RIGHT = 1;


var Player = function()   //this is the player intialiser to create the player
{	
	this.image = character; //from element loader

	this.x = 320;
	this.y = 240;

	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;

	this.lives = LIVES;

	this.width = character.width;
	this.height = character.height;

	this.falling = true;
	this.jumping = false;

	this.direction = LEFT;

	this.inventory = 0;
	this.inventoryIdx = -1;

	this.pickUpTimer = TIME_PICKUP;		//time in milliseconds of delay between picking up letters
	this.pickUpAllowed = true;

	this.numLetterPlaced = 0;

}

Player.prototype.respawn = function() {
	this.x = 320;
	this.y = 240;

	this.velocityX = 0;
	this.velocityY = 0;

	this.falling = true;
	this.jumping = false;

	if (this.inventory != 0)
	{
		letterObj[this.inventoryIdx].draw = true;
		this.inventoryIdx = -1;
	}

	this.inventory = 0;



}

Player.prototype.Update = function(deltaTime) {
	var left, right, jump;
	left = right = jump = false;

	this.interaction = false;


	this.tx = pixelToTile(this.x);		//the current tile that the palyer is occupying
	this.ty = pixelToTile(this.y);
	


	//context.fillRect(this.x, this.y, 35,35);



	//check for user input for left or right

	if(keyboard.isKeyDown(keyboard.KEY_LEFT) || 
	   keyboard.isKeyDown(keyboard.KEY_A))
	{
		left = true;
		this.direction = LEFT;	//change direction 

	}

	else if (keyboard.isKeyDown(keyboard.KEY_RIGHT) ||
			 keyboard.isKeyDown(keyboard.KEY_D) )
	{
		right = true;
		this.direction = RIGHT; //change direction 
	}

	if ((keyboard.isKeyDown(keyboard.KEY_SPACE) || 
		keyboard.isKeyDown(keyboard.KEY_UP) || 
		keyboard.isKeyDown(keyboard.KEY_W)) && this.jumping === false)
	{
		jump = true;			//check for jump
		//this.jumping = true;
	}

	if (keyboard.isKeyDown(keyboard.KEY_E) || keyboard.isKeyDown(keyboard.KEY_CTRL))		//check for a player interaction check
	{
		this.interaction = true;
	}
	

	//update physics of player

	var wasleft = this.velocityX < 0;		//checks to see whethere the player was left or right
	var wasright = this.velocityX > 0;

	var falling = this.falling;
	var ddx = 0;			//sets the acceleration in the x component without interaction of the user
	var ddy = GRAVITY;		//sets the acceleration of the y component to gravity

	if (left)
	{
		ddx -= ACCEL;
	}

	else if (wasleft)
	{
		ddx += FRICTION;
	}

	if (right)
	{
		ddx += ACCEL;
	}

	else if (wasright)
	{
		ddx -= FRICTION;
	}

	if (jump && !this.jumping && !falling)
	{
		ddy -= JUMP;
		this.jumping = true;
	}

	
	



	this.x += deltaTime * this.velocityX;		//updates the player postition according to there velocity
	this.y += deltaTime * this.velocityY;


	this.velocityX = bound(this.velocityX + (deltaTime * ddx), -MAXDX, MAXDX);	//updates player velocities according to the newly caalculated accel
	this.velocityY = bound(this.velocityY + (deltaTime * ddy), -MAXDY, MAXDY);

	






	//clamp the velocity so the player doesn't stutter
	if ( (wasleft && (this.velocityX > 0))  ||  (wasright && (this.velocityX < 0)))
	{
		this.velocityX = 0;
	}


	//check if fallen off the map
	if (this.y > SCREEN_HEIGHT + 100 )
	{
		this.respawn();
		this.lives --;

		if (this.lives <= 0)
		{
			curGameState = GAMESTATE_ENDGAME;
		}

	}

	//reduce pickUp timer

	this.pickUpTimer -= deltaTime;
	if (this.pickUpTimer <= 0)
	{
		this.pickUpAllowed = true;
		this.pickUpTimer = 0;
	}
	else
	{
		this.pickUpAllowed = false;
	}


	this.checkCollision();	//CHECK FOR COLLISION

	this.inventoryCheck();	//CHECK FOR PICKUP FROM LETTER ORGINIAL POSTION

	this.placementCheck();	//CHECK FOR PICKUP FROM PLACEMENT OR PLACING

}

Player.prototype.checkCollision = function ()
{
	var cell 		  = cellAtTileCoord(LAYER_PLATFORMS, this.tx,      this.ty);				//this calculates all the cells around the player and they return either 1 or 0
	var cellLeft 	  = cellAtTileCoord(LAYER_PLATFORMS, this.tx - 1 , this.ty);				//So that we can see if there is a collision 
	var cellRight     = cellAtTileCoord(LAYER_PLATFORMS, this.tx + 1,  this.ty);
	var cellDown      = cellAtTileCoord(LAYER_PLATFORMS, this.tx,      this.ty + 1);
	var cellDiagRight = cellAtTileCoord(LAYER_PLATFORMS, this.tx + 1,  this.ty + 1);
	var cellDiagLeft  = cellAtTileCoord(LAYER_PLATFORMS, this.tx - 1 , this.ty + 1 );

	var nx = this.x % TILE;				//the differnce that the player is in vs the tile
	var ny = this.y % TILE;	

	//Check for a collision below
	if (this.velocityY > 0){

		if((cellDown && !cell ) || (cellDiagRight && !cellRight && nx) || (!cellLeft && cellDiagLeft))
			{
				this.y = tileToPixel(this.ty);
				this.velocityY = 0;

				this.falling = false;
				this.jumping = false;
				ny = 0;
			}
	}


	//Check for a collision above
	else if (this.velocityY < 0){
		if ((cell && !cellDown) || (cellRight && !cellDiagLeft && nx) || (cellLeft && !cellDiagLeft))
		{
			this.y = tileToPixel(this.ty + 1);
			this.velocityY = 0;

			cell = cellDown;
			cellRight = cellDiagRight;
			ny = 0;
		}
	}


	//check for a collision on the right
	if (this.velocityX > 0)
	{
		if ((cellRight && !cell) || (cellDiagRight && !cellDown && ny))
		{
			this.x = tileToPixel(this.tx);
			this.velocityX = 0;
		}
	}


	//check for a collision on the left
	else if (this.velocityX < 0){
		if ((cell && !cellRight) || (cellDown && !cellDiagRight && ny))
		{
			this.x = tileToPixel(this.tx + 1);
			this.velocityX = 0;
		}
	}
}

Player.prototype.placementCheck = function ()
{
	var cellPlace   = cellAtTileCoord(LAYER_PLACEMENTS,   this.tx, 	  this.ty);	

	if (this.interaction && cellPlace ) 
	{
		for(var placementIdx = 0; placementIdx < placementObj.length; placementIdx++)
		{


			if (checkTileMatch(this.tx, this.ty, placementObj[placementIdx].xTILE, placementObj[placementIdx].yTILE))		// one TILE
			{	
				
				 //placing a letter onto a placement cell
				if (!placementObj[placementIdx].placed && this.inventory != 0 && this.pickUpAllowed)	
				{
					placementObj[placementIdx].letterPlaced = this.inventory;
					placementObj[placementIdx].placed = true;

					this.inventory = 0;

					this.pickUpTimer = TIME_PICKUP;
					this.pickUpAllowed = false;

					this.numLetterPlaced++;		//placed another letter down so increase coutner

					if ( this.numLetterPlaced === mapWordLength )
					{
						if (checkWin())
						{	
							if (currentLevel === numLevels)
							{
								curGameState = GAMESTATE_WIN;		//player has won all lavels
							}

							else
							{	
								currentLevel ++;		//player wins level and goes to next one
								changeMap();
							}
						}
						else
						{
							curGameState = GAMESTATE_ENDGAME;
						}
					}

				}
				//picking a letter from a placement cell
				else if (placementObj[placementIdx].placed && this.inventory === 0 && this.pickUpAllowed)
				{
					this.inventory = placementObj[placementIdx].letterPlaced;
					placementObj[placementIdx].placed = false;

					placementObj[placementIdx].letterPlaced = "";

					this.pickUpTimer = TIME_PICKUP;
					this.pick = false;

					this.numLetterPlaced--;


				}

			}
		}
	}
}




Player.prototype.inventoryCheck = function ()
{
	var cellLetter    = cellAtTileCoord(LAYER_LETTERS,   this.tx, 	  this.ty);		//this checks whether player is on a letter cell

	if(this.interaction && cellLetter )	//check for interaction aswell as on a letter
	{
		for (var letterIdx = 0; letterIdx < letterObj.length ; letterIdx ++)
		{					//x tile component				//y tile component
			if (checkTileMatch(this.tx, this.ty, letterObj[letterIdx].xTILE, letterObj[letterIdx].yTILE) )		// one TILE
			{
				if (!this.inventory)
				{
				this.inventory = letterObj[letterIdx].letter;
				this.inventoryIdx = letterIdx;
				letterObj[letterIdx].draw = false;

				console.log(this.inventory);

				}
			}
		}
	}
}

Player.prototype.Draw = function(deltaTime, _cam_x, _cam_y)
{
	context.save();
	context.drawImage(this.image, this.x - this.width/2 - _cam_x , this.y - this.height/2 - _cam_y);	//draw the player
	
	context.restore();
}





function checkTileMatch (tileToCheckX, tileToCheckY, tileX, tileY)
{
	if ((tileToCheckX === tileX 	&& tileToCheckY === tileY     ) ||
		(tileToCheckX === tileX + 1 && tileToCheckY === tileY     ) ||
		(tileToCheckX === tileX     && tileToCheckY === tileY + 1 ) ||		//checks the four surround tiles since 1 tileset tile is
		(tileToCheckX === tileX + 1 && tileToCheckY === tileY + 1 )  )
	{
		return true;
	}
} 

function checkWin()
{	
	var wordSpelt = "";

	for (var i = 0; i < wordToSpell.length; i++)
	{
			wordSpelt += placementObj[i].letterPlaced
	}

	if (wordSpelt === wordToSpell)
	{
		return true;
	}

	else if ($.inArray(wordSpelt, Arr_word_list) != -1)		//check if the word spelt is a possible word in array
	{
		return true;
	}

	return false;
}