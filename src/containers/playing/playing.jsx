import { useContext, useState } from "react";
import * as CONSTANTS from "../../constants/game.constants";
import * as comp from "../../components";
import { GameStateContext } from "../../context";
import * as Utils from "../../utils/utils";
import "./playing.scss";

const Playing = () => {
  const { gameState, setGameState } = useContext(GameStateContext);
  const [activeTab, setActiveTab] = useState(0);

  const handleEndGame = () => {
    const newGameState = {
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
        totalDoubleBulls: 0,
      },
      roundNumber: 1,
      scoreFrequency: [],
      stage: CONSTANTS.STAGE_SPLASH,
    };

    setGameState(newGameState);
    localStorage.setItem(
      CONSTANTS.GAME_STATE_LS_KEY,
      JSON.stringify(newGameState)
    );
  };

  const handleContinue = () => {
    // get state
    let activeScores = gameState.activeScores;
    let currentGame = gameState.currentGame;
    let gameHistory = gameState.gameHistory;
    let gameNumber = gameState.gameNumber;
    let gameStats = gameState.gameStats;
    let roundNumber = gameState.roundNumber;
    let newOverviewStats = gameState.overviewStats;
    let scoreFreqency = gameState.scoreFreqency;

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

      // get score frequencies
      scoreFreqency = Utils.getScoreFrequency(gameState.gameHistory);

      // update the state with gameStats (push gameStats object to state array)
      gameStats.push(stats);

      // Overview stats
      newOverviewStats = {
        gamesPlayed: 0,
        lowestGameScore: 0,
        highestGameScore: 0,
        averageGameScore: 0,
        totalSingleBulls: 0,
        totalDoubleBulls: 0,
      };

      // gamesPlayed
      newOverviewStats.gamesPlayed = gameState.gameStats.length;

      // lowestGameScore and highestGameScore
      const totalScores = [];
      let totalSingleBullsForAllGames = 0;
      let totalDoubleBullsForAllGames = 0;
      gameState.gameStats.map((gameStat) => {
        totalScores.push(gameStat.totalScore);
        totalSingleBullsForAllGames += gameStat.totalSingleBulls;
        totalDoubleBullsForAllGames += gameStat.totalDoubleBulls;
      });
      newOverviewStats.lowestGameScore = Math.min(...totalScores);
      newOverviewStats.highestGameScore = Math.max(...totalScores);

      // averageGameScore
      let total = 0;
      totalScores.forEach((totalScore) => (total += totalScore));
      newOverviewStats.averageGameScore = (
        total / newOverviewStats.gamesPlayed
      ).toFixed(2);

      // totalSingleBulls and totalDoubleBulls
      newOverviewStats.totalSingleBulls = totalSingleBullsForAllGames;
      newOverviewStats.totalDoubleBulls = totalDoubleBullsForAllGames;

      // reset current game now stats have been saved
      currentGame = [];
      gameNumber++;
    }

    // set new gameState
    const newGameState = {
      ...gameState,
      activeScores: [false, false, false],
      currentGame,
      continueButtonDisabled: true,
      gameNumber,
      overviewStats: newOverviewStats,
      roundNumber,
      scoreFreqency,
    };
    setGameState(newGameState);

    // save new gameState to local storage
    localStorage.setItem(
      CONSTANTS.GAME_STATE_LS_KEY,
      JSON.stringify(newGameState)
    );
  };

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div className="playing">
      <div
        className="playing__end-game"
        onClick={() => {
          handleEndGame();
        }}
      >
        <comp.Icon name="close" width={48} fill={"#222"}></comp.Icon>
      </div>

      <div className="playing__header">
        <h2>
          <strong>Game {gameState.gameNumber}</strong>&nbsp;
           Round <strong>{gameState.roundNumber}</strong> of{" "}
          <strong>{CONSTANTS.MAX_ROUNDS}</strong>
        </h2>
      </div>

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
          <div className="playing__dart-scores-quick">
            <comp.DartScoreQuick
              totalScore={3}
              scores={[1, 1, 1]}
            ></comp.DartScoreQuick>
            <comp.DartScoreQuick
              totalScore={5}
              scores={[3, 1, 1]}
            ></comp.DartScoreQuick>
          </div>
        </div>
        <div className="playing__buttons">
          <comp.Button
            onClick={() => {
              handleContinue();
            }}
            text="Continue"
            disabled={gameState.continueButtonDisabled}
          ></comp.Button>
        </div>
      </div>

      <comp.Tabs
        activeTab={activeTab}
        tabs={["Scores", "Stats", "Freq", "Data"]}
        onTabChange={(index) => handleTabChange(index)}
      >
        {activeTab === 0 && gameState.gameStats.length === 0 && (
          <div>
            <p>No games played yet.</p>
          </div>
        )}
        {activeTab === 0 && gameState.gameStats.length > 0 && (
          <div className="playing__scores">
            {[...gameState.gameStats].map((gameStat, index) => (
              <div key={`game-stat${index}`}>
                <comp.GameStat gameStat={gameStat}></comp.GameStat>
              </div>
            ))}
          </div>
        )}

        {activeTab === 1 && (
          <div>
            <comp.Stat
              text={"Games Played"}
              value={gameState.overviewStats.gamesPlayed}
            ></comp.Stat>
            <comp.Stat
              text={"Lowest"}
              value={gameState.overviewStats.lowestGameScore}
            ></comp.Stat>
            <comp.Stat
              text={"Highest"}
              value={gameState.overviewStats.highestGameScore}
            ></comp.Stat>
            <comp.Stat
              text={"Average"}
              value={gameState.overviewStats.averageGameScore}
            ></comp.Stat>
            <comp.Stat
              text={"Total Single Bulls"}
              value={gameState.overviewStats.totalSingleBulls}
            ></comp.Stat>
            <comp.Stat
              text={"Total Double Bulls"}
              value={gameState.overviewStats.totalDoubleBulls}
            ></comp.Stat>
          </div>
        )}

        {activeTab === 2 && gameState.gameHistory.length === 0 && (
          <div>
            <p>No games played yet.</p>
          </div>
        )}
        {activeTab === 2 && gameState.gameStats.length > 0 && (
          <div>
            {gameState.scoreFreqency.map((sf, index) => {
              return (
                <comp.ScoreFrequency
                  key={`score-frequency_${index}`}
                  score={sf.score}
                  percentage={sf.percentage}
                  frequency={sf.frequency}
                ></comp.ScoreFrequency>
              );
            })}
          </div>
        )}

        {activeTab === 3 && gameState.gameHistory.length > 0 && (
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

            <p style={{ marginTop: "16px" }}>
              <strong>Raw</strong>
            </p>
            {[...gameState.gameStats].map((gameStat, index) => {
              return (
                <span key={`raw_${index}`}>{gameStat.totalScore}&nbsp;</span>
              );
            })}
          </div>
        )}
      </comp.Tabs>
    </div>
  );
};

export default Playing;
