var character = document.createElement("img");		//load player sprite
character.src = "Graphics/playerSprite.png";
character.width = 70;
character.height = 80;

var tileset = document.createElement("img");		//load map tileset
tileset.src = currentMap.tilesets[0].image;

var alphaTileset = document.createElement("img");	//load alphabet tileset
alphaTileset.src = currentMap.tilesets[1].image

var background = document.createElement("img");		//laod background image
background.src = "Graphics/background.png";

var UIInventory = document.createElement("img");	//load inventory image
UIInventory.src = "Graphics/UI/inventory.png";

var UIHearts = document.createElement("img");		//load UI hearts
UIHearts.src = "Graphics/UI/heart.png";

var UIHeartOutline = document.createElement("img");	//load UI heart outline
UIHeartOutline.src = "Graphics/UI/heart_outline.png"

var getTheCodeLogo = document.createElement("img");
getTheCodeLogo.src = "Graphics/getTheCodeLogo.png"
getTheCodeLogo.width = 200;
getTheCodeLogo.height = 200;


function drawUI()
{
	drawInventory();
	drawLives();

}

function drawInventory()
{
	context.save();

	context.globalAlpha = 0.3;

	//drawing inventory


	if (player1.inventory != 0)
	{	
		context.globalAlpha = 1;

		context.drawImage(UIInventory, SCREEN_WIDTH - UIInventory.width, SCREEN_HEIGHT - UIInventory.height);

		var alphaTileIdx = alphabet.indexOf(player1.inventory);
		var sx = ALPHATILE_PADDING + (alphaTileIdx % ALPHATILE_COUNT_X) * (TILESET_TILE + ALPHATILE_SPACING);			//set cliping for alphatileset
        var sy =  ALPHATILE_PADDING + (Math.floor(alphaTileIdx/ALPHATILE_COUNT_Y)) * (TILESET_TILE + ALPHATILE_SPACING);

     
        context.drawImage(alphaTileset, sx, sy, TILESET_TILE, TILESET_TILE, SCREEN_WIDTH -  80, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);
	}
	else
	{
		context.drawImage(UIInventory, SCREEN_WIDTH - UIInventory.width, SCREEN_HEIGHT - UIInventory.height);

		var alphaTileIdx = 27; 		//blank tile
		var sx = ALPHATILE_PADDING + (alphaTileIdx % ALPHATILE_COUNT_X) * (TILESET_TILE + ALPHATILE_SPACING);			//set cliping for alphatileset
        var sy =  ALPHATILE_PADDING + (Math.floor(alphaTileIdx/ALPHATILE_COUNT_Y)) * (TILESET_TILE + ALPHATILE_SPACING);

        context.drawImage(alphaTileset, sx, sy, TILESET_TILE, TILESET_TILE, SCREEN_WIDTH -  80, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);

	}

	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.strokeRect(SCREEN_WIDTH -  80, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);



	context.restore();
}

function drawLives() 
{	
	context.save();
	context.globalAlpha = 1 ;

	

	for (var i = 0; i < LIVES; i++)
	{
		var heartOffset = (5 + UIHearts.width) * i  + UIHearts.width + 5;
		context.drawImage(UIHeartOutline, SCREEN_WIDTH - heartOffset, 0);

		if (i < player1.lives)
		{
			context.drawImage(UIHearts, SCREEN_WIDTH - heartOffset, 0);
		}
	}

	context.restore();
}