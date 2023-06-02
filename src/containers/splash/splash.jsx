import { useContext, useState } from "react";
import * as CONSTANTS from "../../constants/game.constants";
import * as comp from "../../components";
import { GameStateContext } from "../../context";
import "./splash.scss";

const Splash = () => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleStartGame = () => {
    setGameState({
      ...gameState,
      stage: CONSTANTS.STAGE_PLAYING,
    });
  };

  return (
    <div className="splash">
      <h1 className="splash__title">
        <strong>Darts Scorer</strong>
      </h1>
      <div className="splash__icon">
        <comp.Icon name="dartboard" width={128} fill={"#aa0000"}></comp.Icon>
      </div>
      <div className="splash__button">
        <comp.Button
          onClick={() => {
            handleStartGame();
          }}
          text={"Start Game"}
        ></comp.Button>
      </div>
    </div>
  );
};

export default Splash;
