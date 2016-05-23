var countdownPlaying = false;

function updateTimer(deltaTime)
{
	player1.levelTimer -= deltaTime;

	if (player1.levelTimer <= 15 && !countdownPlaying)
	{
		countdownSFX.play();
		countdownPlaying = true;
		backgroundMusic.stop();
	}

	else if (player1.levelTimer > 15)
	{
		countdownPlaying = false;
	}
	

	if (player1.levelTimer <= 0)
	{
		player1.lose();
	}
}