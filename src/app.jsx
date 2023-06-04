import React, { useState, useMemo, useEffect } from 'react';
import "./app.scss";
import * as CONSTANTS from "./constants/game.constants";
import * as containers from "./containers";
import * as comp from "./components";
import { GameStateContext } from "./context";

function App() {
  const [gameState, setGameState] = useState({
    activeScores: [false, false, false],
    continueButtonDisabled: true,
    currentGame: [],
    gameHistory: [],
    gameNumber: 1,
    gameStats: [],
    overviewStats: {
      gamesPlayed: 0,
      lowestGameScore: 0,
      highestGameScore: 0,
      averageGameScore: 0,
      totalSingleBulls: 0,
      totalDoubleBulls: 0
    },
    roundNumber: 1,
    stage: CONSTANTS.STAGE_SPLASH
  });

  const gameStateValue = useMemo(
    () => ({ gameState, setGameState }), 
    [gameState]
  );

  useEffect(() => {
    // retrieve gameState from localstorage and set gameState
    const gameStateFromLS = localStorage.getItem(CONSTANTS.GAME_STATE_LS_KEY);
    if (gameStateFromLS) {
      setGameState(JSON.parse(gameStateFromLS))
    }
  }, []);

  return (
    <div className="app">
      <GameStateContext.Provider value={ gameStateValue }>
        <comp.Content>
          <div className="app__aligner">
            { gameState.stage === CONSTANTS.STAGE_SPLASH && <containers.Splash></containers.Splash> }
            { gameState.stage === CONSTANTS.STAGE_PLAYING && <containers.Playing></containers.Playing> }
            { gameState.stage === CONSTANTS.STAGE_SUMMARY && <containers.Summary></containers.Summary> }
          </div>
        </comp.Content>
      </GameStateContext.Provider>
    </div>
  );
}

export default App;
