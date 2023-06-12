import { useContext } from "react";
import { GameStateContext } from "../../context";
import "./dart-score-quick.scss";

const DartScoreQuick = ({ totalScore, scores }) => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleClick = (scores) => {
    setGameState({
      ...gameState,
      activeScores: [...scores],
      continueButtonDisabled: false
    });
  };

  return (
    <div className="dart-score-quick" onClick={() => handleClick(scores)}>
      <p>
        <strong>{totalScore}</strong> <span>{scores.join(",")}</span>
      </p>
    </div>
  );
};

export default DartScoreQuick;
