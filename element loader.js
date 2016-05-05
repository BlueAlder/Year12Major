var character = document.createElement("img");
character.src = "Graphics/p1_jump.png";

var tileset = document.createElement("img");
tileset.src = currentMap.tilesets[0].image;

var alphaTileset = document.createElement("img");
alphaTileset.src = currentMap.tilesets[1].image

var background = document.createElement("img");
background.src = "Graphics/background.png";

var UIInventory = document.createElement("img");
UIInventory.src = "Graphics/UI/inventory.png";

function drawUI()
{
	context.save();

	context.globalAlpha = 0.5;
	context.drawImage(UIInventory, SCREEN_WIDTH - UIInventory.width, SCREEN_HEIGHT - UIInventory.height);

	if (player1.inventory != 0)
	{	
		context.globalAlpha = 1;
		context.font = "5px Arial";			//FIX ME IM NOT PRINTING TO SCREEN :()
		context.fillStyle = "black";
		context.fillText(player1.inventory, SCREEN_WIDTH - UIInventory.width, SCREEN_HEIGHT - UIInventory.height);
	}

	context.restore();
}