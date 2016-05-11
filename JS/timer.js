function updateTimer(deltaTime)
{
	player1.levelTimer -= deltaTime;

	if (player1.levelTimer <= 0)
	{
		curGameState = GAMESTATE_ENDGAME;
	}
}