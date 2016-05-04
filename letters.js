var placementObj = [];

var Letter = function(alphaLetter)		//letter constructer to set basic letters and attributes
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


var Placement = function() 
{
	var self = this;

	this.placed = false;

	this.xTILE;
	this.yTILE;

	this.letterPlaced;


}

function definePlacements(wordLength)
{
	for (var i = 0; i < wordLength; i ++)
	{	
		var placement = new Placement();
		placementObj.push(placement);
	}
}

Placement.prototype.updateCoords = function (_x, _y, _cam_x, _cam_y)
{
	this.x = _x - _cam_x;
	this.y = _y - _cam_y;

	this.xTILE = pixelToTile(_x);
	this.yTILE = pixelToTile(_y);
}