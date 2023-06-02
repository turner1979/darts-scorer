import { useContext } from 'react';
import "./dart-score.scss";
import * as comp from '../../components';
import { GameStateContext } from "../../context";

const DartScore = ({ activeScore, dartNumber, scoreOptions }) => {
  const { gameState, setGameState } = useContext(GameStateContext);
  
  const handleClick = (dartNumberIndex, scoreOptionIndex) => {
    const activeScores = gameState.activeScores;
    activeScores[dartNumberIndex] = scoreOptions[scoreOptionIndex];
    const continueButtonDisabled = !gameState.activeScores.every(v => v !== false);

    setGameState({
      ...gameState,
      activeScores,
      continueButtonDisabled
    });
  };

  return (
    <div className="dart-score">
      <div className="dart-score__number">
        <comp.Icon name='dart' width={32} fill={'#fff'}></comp.Icon>
        <span>{ dartNumber + 1 }</span>
      </div>
      <div className="dart-scrore__scores">
        {scoreOptions.map((scoreOption, index) => {
          return (
            <div
              key={`dart-score-${index}`}
              onClick={() => handleClick(dartNumber, index) }
              className={`dart-score__score ${
                activeScore === scoreOption ? 'dart-score__score--active' : ''
              }`}
            >
              {scoreOption}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DartScore;
