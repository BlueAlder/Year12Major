var currentMap = testLevel; //Set the current map to the test level in the load in this case this is the test level
var LAYER_COUNT = currentMap.layers.length;

var LAYER_BACKGROUND = 0;
var LAYER_PLATFORMS = 1;		//so we can easily differentiaite the two


//the below variables sets the standard for the map when it loads they are then updated as the updateMap function is called
var TILESET_PADDING  = currentMap.tilesets[0].margin;
var TILESET_COUNT_X = 14;								//this is needed for cropping the tileset when we intiallise the map
var TILESET_COUNT_Y = 14;

var TILE = currentMap.tilewidth;
var TILESET_TILE = currentMap.tilesets[0].tilewidth;
var TILESET_SPACING = currentMap.tilesets[0].spacing;

var MAP = 
{
	tw: currentMap.layers[LAYER_PLATFORMS].width,
	th: currentMap.layers[LAYER_PLATFORMS].height
};

//for cell collision we are going to make the collision cells 35 x 35
//as the tiles are 70x70 there are 4 collision cells to each tile

var cells = [];
function loadLevel(_level)
{
	updateLevel();

	//load the collision map data into a multidimensional var cells array for plotting

	for (layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		
	}

}

function updateLevel() 
{
	TILE = currentMap.tilewidth;
	TILESET_TILE = currentMap.tilesets[0].tilewidth;
    TILESET_SPACING = currentMap.tilesets[0].spacing;
    tileset.src = CurrentMap.tilesets[0].image;
    MAP.tw = CurrentMap.layers[LAYER_GROUND].width;			//this updates the level for any changes in the level as the game progresses
    MAP.th = CurrentMap.layers[LAYER_GROUND].height;
}




















function bound(value, min, max )
{
	if (value < min){
		return min;
	}

	else if (value > max)
	{
		return max;
	}

	return value;
}