import "./game-stats.scss";

const GameStats = ({ gameStats }) => {
  return (
    <div className="game-stats">
      {gameStats.map((gameStat, index) => {
        const { totalDoubleBulls, totalSingleBulls, totalScore  } = gameStat;
        return (
          <div className="game-stats__stat">
            <p>
              { totalScore }&nbsp;
              {`(S: ${totalSingleBulls}, D: ${totalDoubleBulls})`}
              {index !== gameStats.length - 1 ? "," : ""}
              &nbsp;
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default GameStats;
