var Frame = function(x, y, width, height, duration)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.duration = duration;
};

var Sprite = function(filename)
{
	if (filename != null)
	{
		this.image = document.createElement("img");
		this.image.src = filename;
	}

	this.currentAnimation = 0;
	this.currentFrame = 0;

	this.animations = [];
	this.offsets = [];

	this.frameTime = 0;
	this.loop = true;
	this.pingpong = false;
	this.playDir = true;

};