
var character = document.createElement("img");		//load player sprite
character.width = 70;
character.height = 80;

var characterLeft = document.createElement("img");
characterLeft.src = "Graphics/playerSpriteLeft.png";


var characterRight = document.createElement("img");
characterRight.src = "Graphics/playerSpriteRight.png";


var volumeIcon = document.createElement("img");
volumeIcon.src = "Graphics/UI/volume.png";
volumeIcon.width = 20;
volumeIcon.height = 20;

var muteIcon = document.createElement("img");
muteIcon.src = "Graphics/UI/volumeOff.png";
muteIcon.width = 20;
muteIcon.height = 20;




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
UIHearts.width = 35;
UIHearts.height = 35;

var UIHeartOutline = document.createElement("img");	//load UI heart outline
UIHeartOutline.src = "Graphics/UI/heart_outline.png";
UIHeartOutline.width = 35;
UIHeartOutline.height = 35;

var getTheCodeLogo = document.createElement("img");
getTheCodeLogo.src = "Graphics/getTheCodeLogo.png"
getTheCodeLogo.width = 300;
getTheCodeLogo.height = 300;






function drawUI()
{
	drawInventory();
	drawLives();
	drawScore();

}

function drawInventory()
{
	context.save();

	context.globalAlpha = 0.3;

	//drawing inventory


	if (player1.inventory != 0)
	{	
		context.globalAlpha = 1;

		context.drawImage(UIInventory, 0, SCREEN_HEIGHT - UIInventory.height);

		var alphaTileIdx = alphabet.indexOf(player1.inventory);
		var sx = ALPHATILE_PADDING + (alphaTileIdx % ALPHATILE_COUNT_X) * (TILESET_TILE + ALPHATILE_SPACING);			//set cliping for alphatileset
        var sy =  ALPHATILE_PADDING + (Math.floor(alphaTileIdx/ALPHATILE_COUNT_Y)) * (TILESET_TILE + ALPHATILE_SPACING);

     
        context.drawImage(alphaTileset, sx, sy, TILESET_TILE, TILESET_TILE, UIInventory.width - 90, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);
	}
	else
	{
		context.drawImage(UIInventory, 0, SCREEN_HEIGHT - UIInventory.height);

		var alphaTileIdx = 27; 		//blank tile
		var sx = ALPHATILE_PADDING + (alphaTileIdx % ALPHATILE_COUNT_X) * (TILESET_TILE + ALPHATILE_SPACING);			//set cliping for alphatileset
        var sy =  ALPHATILE_PADDING + (Math.floor(alphaTileIdx/ALPHATILE_COUNT_Y)) * (TILESET_TILE + ALPHATILE_SPACING);

        context.drawImage(alphaTileset, sx, sy, TILESET_TILE, TILESET_TILE,  UIInventory.width - 90, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);

	}

	context.strokeStyle = "black";
	context.lineWidth = 2;
	context.strokeRect(UIInventory.width - 90, SCREEN_HEIGHT - 80, TILESET_TILE, TILESET_TILE);



	context.restore();
}

function drawLives() 
{	
	context.save();
	context.globalAlpha = 1 ;

	

	for (var i = 0; i < MAX_LIVES; i++)
	{
		var heartOffset = (5 + UIHearts.width) * i  + UIHearts.width + 5;
		context.drawImage(UIHeartOutline, SCREEN_WIDTH - heartOffset, 0, UIHeartOutline.width, UIHeartOutline.height);

		if (i < player1.lives)
		{
			context.drawImage(UIHearts, SCREEN_WIDTH - heartOffset, 0, UIHearts.width, UIHearts.height);
		}
	}

	context.restore();
}

function drawScore()
{
	context.save();

	context.font = "30px Arial";
	context.fillStyle = "black";

	var textMeasure  = context.measureText(player1.score);
	context.fillText("Score: "+player1.score, 30, 30);
	context.fillText("Timer: " + Math.ceil(player1.levelTimer), 30, 60 );

	context.restore();
}