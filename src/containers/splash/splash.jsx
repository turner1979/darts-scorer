import { useContext, useState } from "react";
// import * as CONSTANTS from '../../constants/game.constants';
import * as comp from "../../components";
import { GameStateContext } from '../../context';
import "./splash.scss";

const Splash = () => {
  const { gameState, setGameState } = useContext(GameStateContext);

  const handleStartGame = () => {
    // // reset error and loading states
    // setErrorMsg('');
    // setLoading(true);
    // Ga.eventStartGame();
    // // make request to get todays words (conundrums)
    // axios.post(apiUrl + '/today').then((res) => {
    //   const { words } = res.data;
    //   const decryptedWords = Utils.getDecryptedWords(words);
    //   setLoading(false);
    //   setGameState({
    //     ...gameState,
    //     stage: CONSTANTS.STAGE_ROUND,
    //     round: 1,
    //     words: decryptedWords
    //   });
    //   Ga.eventStartGameSuccess();
    // }).catch((e) => {
    //   setErrorMsg('There was an error loading the game data, please try again later.');
    //   setLoading(false);
    //   Ga.eventStartGameError();
    // });
  };

  return (
    <div className="splash">
      <p>Darts Scorer</p>
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
