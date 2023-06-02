import { useContext, useState } from "react";
// import * as CONSTANTS from '../../constants/game.constants';
import * as comp from "../../components";
import { GameStateContext } from '../../context';
import "./summary.scss";

const Summary = () => {
  const { gameState, setGameState } = useContext(GameStateContext);

  return (
    <div className="summary">
      summary
    </div>
  )
}

export default Summary;
