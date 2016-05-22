var countdownPlaying = false;

function updateTimer(deltaTime)
{
	player1.levelTimer -= deltaTime;

	if (player1.levelTimer <= 14 && !countdownPlaying)
	{
		countdownSFX.play();
		countdownPlaying = true;
	}

	else if (player1.levelTimer > 14)
	{
		countdownPlaying = false;
	}
	

	if (player1.levelTimer <= 0)
	{
		player1.lose();
	}
}