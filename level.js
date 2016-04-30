var currentMap = testLevel; //Set the current map to the test level in the load in this case this is the test level
var LAYER_COUNT = currentMap.layers.length;

var LAYER_BACKGROUND = 1;
var LAYER_PLATFORMS = 0;		//so we can easily differentiaite the two


//the below variables sets the standard for the map when it loads they are then updated as the updateMap function is called
var TILESET_PADDING  = currentMap.tilesets[0].margin;
var TILESET_COUNT_X = 12;								//this is needed for cropping the tileset when we intiallise the map
var TILESET_COUNT_Y = 12;

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
function loadCollisionMap(_level)
{
	updateLevel();

	//load the collision map data into a multidimensional var cells array for plotting
	//The collision squares are 35 x 35 px but each tile is 70px so we need to create 4 collison boxes
	//we need a 3 dimmensional array to hold which correspond to LAYERS, X, Y coordinates

	//this collision map will simple hold a data value that is either a  1 or 0 which determines if there is a box there or not

	for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx++)
	{
		var idx = 0;   //this will be the counter that loops through each data set of each layer of the map
		cells[layerIdx] = [];  //create a y component

		for (var y = 0; y < _level.layers[layerIdx].height; y++)
		{
			cells[layerIdx][y] = [];    //create an x component

			for (var x = 0; x < _level.layers[layerIdx].width; x++)
			{

				if (_level.layers[layerIdx].data[idx] != 0)
				{



					if (y == 0)
					{
						cells[layerIdx][y][x]   = 1;		//this is a check so it puts a 'roof' on the game  
						cells[layerIdx][y][x+1] = 1;
					}

					else 
					{
						cells[layerIdx][y][x]     = 1;
						cells[layerIdx][y-1][x]   = 1;
						cells[layerIdx][y-1][x+1] = 1;		//set the four colison boxes
						cells[layerIdx][y][x+1]   = 1;
					}

				}

				else if (cells[layerIdx][y][x] != 1)
				{
					cells[layerIdx][y][x] = 0;     //this index doesnt have a value so we set it
				}


				

				idx ++;   //increment the index for the next data point in the layer

			}
		}
	}
}

function updateLevel() 
{
	TILE = currentMap.tilewidth;
	TILESET_TILE = currentMap.tilesets[0].tilewidth;
    TILESET_SPACING = currentMap.tilesets[0].spacing;
    tileset.src = currentMap.tilesets[0].image;
    MAP.tw = currentMap.layers[LAYER_PLATFORMS].width;			//this updates the level for any changes in the level as the game progresses
    MAP.th = currentMap.layers[LAYER_PLATFORMS].height;
}



function drawLevel(_cam_x, _cam_y)
{
	for (var layerIdx = 0; layerIdx < LAYER_COUNT; layerIdx ++)
	{
		var idx = 0;

		for (var y = 0; y < currentMap.layers[layerIdx].height; y++)
		{
			for (var x = 0; x < currentMap.layers[layerIdx].width; x++)
			{
				//the tiles in the Tiled map are base 1 (meaning a value of 0 means no tile), so subtract one form the tilset id to get the
                //correct tile

                var tileIndex = currentMap.layers[layerIdx].data[idx] - 1;

                //before we draw the map we need to know where to clip the tileset and the spacing between the tiles
               
                var sx = TILESET_PADDING + (tileIndex % TILESET_COUNT_X) * (TILESET_TILE + TILESET_SPACING);
                var sy = TILESET_PADDING + (Math.floor(tileIndex/TILESET_COUNT_Y)) * (TILESET_TILE + TILESET_SPACING);



                context.drawImage(tileset, sx, sy, TILESET_TILE, TILESET_TILE, x*TILE - _cam_x, (y-1)*TILE - _cam_y, TILESET_TILE, TILESET_TILE );
                
                //context.strokeStyle = 'black';
                //context.rect(x*TILE, y*TILE, TILE, TILE);
                //context.stroke();

                idx++;
			}

				


		}

	}
}


function tileToPixel(tile)		//this function finds the tile that the player is currently on and
{								//returns the pixel that corresponds to that tile
	return tile * TILE;

}

function pixelToTile(pixel)
{
	return Math.floor(pixel/TILE);	//this is the reverse of the above function as if you want to get the 
}									// tile from the pixel. We floor it so we get whole integers as Tiles



function cellAtPixelCoord(layer, x, y)	//this function is to check whether there is a cell at a certain spot within the parameters of the layer
{										// and coordinates within the map
	if ( x < 0 || x > SCREEN_WIDTH || y > 0)
	{
		return 1;
	}

	if (y > SCREEN_HEIGHT)							
	{
		return 0;
		player.dead = true;
	}



	return cellAtTileCoord(layer, pixelToTile(x), pixelToTile(y));

};

function cellAtTileCoord(layer, tx, ty)			//this function gets the tile and checks whethere coords are at either side of the map and so puts a blockade
{												//at the end of the map and also a roof on it.
	 if (tx < 0 || tx > MAP.tw || ty < 0)
	 {
	 	if ( layer == LAYER_PLATFORMS)
	 	{
	 		return 1;
	 	}

	 	else {
	 		return 0;
	 	}
	 }

	if(ty >= MAP.th)
	{
        return 0;
    }

	return cells[layer][ty][tx];
};






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