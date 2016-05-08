var MOUSE_UP = 0;
var MOUSE_DOWN = 1;

var Mouse  = function()		//intialise the mouse for the user
{
	var self = this;		//for self reference

	this.mouseState = MOUSE_UP;		//set intial state to up

	this.x = 0;
	this.y = 0;

	canvas.addEventListener("mousemove", function(evt) {self.mouseMove(evt);} );		//when mouse moves or down or up call these functions which are defined below
	canvas.addEventListener("mousedown", function(evt) {self.mouseDown(evt);} );
	canvas.addEventListener("mouseup",   function(evt) {self.mouseUp(evt);} );
}

Mouse.prototype.mouseMove = function(evt)		//fucntion when mouse is moved
{
	this.x = evt.clientX - canvas.offsetLeft;
	this.y = evt.clientY - canvas.offsetTop;
}

Mouse.prototype.mouseDown = function(evt)		//function when mouse is down
{
	this.x = evt.clientX - canvas.offsetLeft;
	this.y = evt.clientY - canvas.offsetTop;

	this.mouseState = MOUSE_DOWN;
}

Mouse.prototype.mouseUp = function(evt)			//function when mouse is up
{
	this.x = evt.clientX - canvas.offsetLeft;
	this.y = evt.clientY - canvas.offsetTop;

	this.mouseState = MOUSE_UP;
}

Mouse.prototype.getX = function()		//return X coord of mouse
{
	return this.x;
}

Mouse.prototype.getY = function()		//return Y coord of mouse
{
	return this.y;
}

