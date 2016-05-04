

var Letter = function(alphaLetter)
{
	var self = this;
	
	this.draw = true;
	this.letter = alphaLetter;

	this.x;
	this.y;

	this.xTile;
	this.yTILE;
}

Letter.prototype.updateCoords = function (_x, _y, idx, _cam_x, _cam_y)
{
	this.x = _x - _cam_x;
	this.y = _y - _cam_y;

	this.xTILE = pixelToTile(_x);
	this.yTILE = pixelToTile(_y);
}