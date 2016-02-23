//GLOBAL PHYSICS VARIABLES

var METER = 36; //CHANGE THIS TO MAKE IT MODULAR
var GRAVITY = METER * GRAVITY * 2; //the '2' is the gravity multiplier
var MAXDX = METER * 10; //max xVelocity
var MAXDY = METER * 15; //max 
var ACCEL = MAXDX * 2; //acceleration in the x direction
var JUMP  = METER * 1800; // JUMPING AMOUNT
var FRICTION = MAXDX * 6;



var self = this;

//assign variables to allow for states

var LIVES = 3;

var LEFT = 0;
var RIGHT = 1;


var Player = function()   //this is the player intialiser to create the player
{	
	this.image = character;

	this.x = 320;
	this.y = 240;

	this.velocityX = 0;
	this.velocityY = 0;
	this.angularVelocity = 0;
	this.rotation = 0;

	this.lives = LIVES;

	this.width = 67;
	this.height = 94;

	this.falling = true;
	this.jumping = false;

	this.direction = LEFT;


}

Player.prototype.update = function(deltaTime) {
	var left, right, jump;
	left = right = jump = false;

	//check for user input for left or right

	if(keyboard.isKeyDown(keyboard.KEY_LEFT))
	{
		left = true;
		this.direction = LEFT;

	}

	else if (keyboard.isKeyDown(keyboard.KEY_RIGHT))
	{
		right = true;
		this.direction = RIGHT;
	}

	if (keyboard.isKeyDown(keyboard.KEY_SPACE) || keyboard.isKeyDown(keyboard.KEY_UP))
	{
		jump = true;

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


	this.x += deltaTime * this.velocityX;		//updates the player postition according to there velocity
	this.y += deltaTime * this.velocityY;

	this.velocityX = bound(this.velocityX + (deltaTime * ddx), -MAXDX, MAXDX);	//updates player velocities according to the newly caalculated accel
	this.velocityY = bound(this.velocityY + (deltaTime * ddx), -MAXDY, MAXDY);

	if ( (wasleft && (this.velocityX > 0))  ||  (wasright && (this.velocityY < 0)))
	{
		this.velocityX = 0;
	}

}


Player.prototype.Draw = function()
{
	context.save();
	context.drawImage(this.image, this.x)
	context.restore();
}