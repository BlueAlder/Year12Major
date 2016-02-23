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

}