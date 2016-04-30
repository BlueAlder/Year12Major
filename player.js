//GLOBAL PHYSICS VARIABLES

var METER = TILE; //CHANGE THIS TO MAKE IT MODULAR
var GRAVITY = METER * 9.8 * 3 ; //the '2' is the gravity multiplier
var MAXDX = METER * 10; //max xVelocity
var MAXDY = METER * 20; //max 
var ACCEL = MAXDX * 2; //acceleration in the x direction
var JUMP  = METER * 1800; // JUMPING AMOUNT usually 1800
var FRICTION = MAXDX * 6;



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

	this.width = 67;
	this.height = 94;

	this.falling = false;
	this.jumping = false;

	this.direction = LEFT;


}

Player.prototype.respawn = function() {
	this.x = 320;
	this.y = 240;

	this.velocityX = 0;
	this.velocityY = 0;

	this.falling = false;
	this.jumping = false;

}

Player.prototype.Update = function(deltaTime) {
	var left, right, jump;
	left = right = jump = false;


	var tx = pixelToTile(this.x);		//the current tile that the palyer is occupying
	var ty = pixelToTile(this.y);

	var nx = this.x % TILE;				//the differnce that the player is in vs the tile
	var ny = this.y % TILE;	


	var cell 		  = cellAtTileCoord(LAYER_PLATFORMS, tx,      ty);				//this calculates all the cells around the player and they return either 1 or 0
	var cellLeft 	  = cellAtTileCoord(LAYER_PLATFORMS, tx - 1 , ty);				//So that we can see if there is a collision 
	var cellRight     = cellAtTileCoord(LAYER_PLATFORMS, tx + 1,  ty);
	var cellDown      = cellAtTileCoord(LAYER_PLATFORMS, tx,      ty + 1);
	var cellDiagRight = cellAtTileCoord(LAYER_PLATFORMS, tx + 1,  ty + 1);
	var cellDiagLeft  = cellAtTileCoord(LAYER_PLATFORMS, tx - 1 , ty -1 );





	//check for user input for left or right

	if(keyboard.isKeyDown(keyboard.KEY_LEFT))
	{
		left = true;
		this.direction = LEFT;	//change direction 

	}

	else if (keyboard.isKeyDown(keyboard.KEY_RIGHT))
	{
		right = true;
		this.direction = RIGHT; //change direction 
	}

	if ((keyboard.isKeyDown(keyboard.KEY_SPACE) || keyboard.isKeyDown(keyboard.KEY_UP)) && this.jumping === false)
	{
		jump = true;			//check for jump
		//this.jumping = true;
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

	}


	//Check for a collision below
	if (this.velocityY > 0){

		if((cellDown && !cell ) || (cellDiagRight && !cellRight && nx) || (!cellLeft && cellDiagLeft))
			{
				this.y = tileToPixel(ty);
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
			this.y = tileToPixel(ty + 1);
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
			this.x = tileToPixel(tx);
			this.velocityX = 0;
		}
	}


	//check for a collision on the left
	else if (this.velocityX < 0){
		if ((cell && !cellRight) || (cellDown && !cellDiagRight && ny))
		{
			this.x = tileToPixel(tx + 1);
			this.velocityX = 0;
		}
	}

}


Player.prototype.Draw = function(deltaTime, _cam_x, _cam_y)
{
	context.save();
	context.drawImage(this.image, this.x - this.width/2 - _cam_x , this.y - this.height/2 - _cam_y);
	
	context.restore();
}

