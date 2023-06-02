import { useContext, useState } from "react";
import * as CONSTANTS from "../../constants/game.constants";
import * as comp from "../../components";
import { GameStateContext } from "../../context";
import * as Utils from "../../utils/utils";
import "./playing.scss";

const Playing = () => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleExit = () => {
    setGameState({
      activeScores: [false, false, false],
      continueButtonDisabled: true,
      currentGame: [],
      gameHistory: [],
      gameNumber: 1,
      gameStats: [],
      roundNumber: 1,
      stage: CONSTANTS.STAGE_SPLASH,
    });
  };

  const handleContinue = () => {
    // get state
    let activeScores = gameState.activeScores;
    let currentGame = gameState.currentGame;
    let gameHistory = gameState.gameHistory;
    let gameNumber = gameState.gameNumber;
    let gameStats = gameState.gameStats;
    let roundNumber = gameState.roundNumber;

    // modify values
    currentGame.push([...activeScores]);
    roundNumber++;
    if (roundNumber > CONSTANTS.MAX_ROUNDS) {
      roundNumber = 1;
      gameHistory.push({ game: `g${gameNumber}`, rounds: currentGame });

      // add game stats to state

      // create object to hold game stats
      const stats = {
        gameNumber,
        totalScore: 0,
        totalSingleBulls: 0,
        totalDoubleBulls: 0,
      };

      // create stats from gameHistory data
      let totalScore = 0;
      let totalSingleBulls = 0;
      let totalDoubleBulls = 0;
      currentGame.map((game) => {
        totalScore += game.reduce((a, b) => a + b, 0);
        totalSingleBulls += Utils.elementCount(game, 3);
        totalDoubleBulls += Utils.elementCount(game, 5);
      });
      stats.totalScore = totalScore;
      stats.totalSingleBulls = totalSingleBulls;
      stats.totalDoubleBulls = totalDoubleBulls;

      // TODO round score total: (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15)

      // update the state with gameStats (push gameStats object to state array)
      gameStats.push(stats);

      // reset current game now stats have been saved
      currentGame = [];
      gameNumber++;
    }

    // update the state
    setGameState({
      ...gameState,
      activeScores: [false, false, false],
      currentGame,
      continueButtonDisabled: true,
      gameNumber,
      roundNumber,
    });
  };

  return (
    <div className="playing">
      <div className="playing__header">
        <div className="playing__scoring">
          <p>
            <strong>Scoring</strong> per dart
          </p>
          <ul>
            <li>Double Bull = 5</li>
            <li>Single Bull = 3</li>
            <li>Between Single Bull to Treble = 1</li>
            <li>Anywhere else = 0</li>
          </ul>
        </div>

        {gameState.gameNumber <= CONSTANTS.MAX_GAMES && (
          <>
            <h1>
              Game <strong>{gameState.gameNumber}</strong> of{" "}
              <strong>{CONSTANTS.MAX_GAMES}</strong>
            </h1>
            <h2>
              Round <strong>{gameState.roundNumber}</strong> of{" "}
              <strong>{CONSTANTS.MAX_ROUNDS}</strong>
            </h2>
          </>
        )}
      </div>

      {gameState.gameNumber <= CONSTANTS.MAX_GAMES && (
        <div>
          <div className="playing__dart-scores">
            <div className="playing__dart-score-row">
              <comp.DartScore
                dartNumber={0}
                activeScore={gameState.activeScores[0]}
                scoreOptions={[0, 1, 3, 5]}
              ></comp.DartScore>
            </div>
            <div className="playing__dart-score-row">
              <comp.DartScore
                dartNumber={1}
                activeScore={gameState.activeScores[1]}
                scoreOptions={[0, 1, 3, 5]}
              ></comp.DartScore>
            </div>
            <div className="playing__dart-score-row">
              <comp.DartScore
                dartNumber={2}
                activeScore={gameState.activeScores[2]}
                scoreOptions={[0, 1, 3, 5]}
              ></comp.DartScore>
            </div>
          </div>
          <div className="playing__buttons">
            <div className="playing__button">
              <comp.Button
                text="Exit"
                onClick={() => {
                  handleExit();
                }}
              ></comp.Button>
            </div>
            <div className="playing__button">
              <comp.Button
                onClick={() => {
                  handleContinue();
                }}
                text="Continue"
                disabled={gameState.continueButtonDisabled}
              ></comp.Button>
            </div>
          </div>
        </div>
      )}

      {gameState.gameStats.length > 0 && (
        <div className="playing__game-stats">
          <p>
            <strong>Game Stats</strong>
          </p>
          <comp.GameStats gameStats={[...gameState.gameStats]}></comp.GameStats>
        </div>
      )}

      {gameState.gameHistory.length > 0 && (
        <div>
          <p>
            <strong>History:</strong>
          </p>
          {gameState.gameHistory.map((history, historyIndex) => {
            return (
              <div key={`history_${historyIndex}`}>
                {JSON.stringify(history)}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Playing;
