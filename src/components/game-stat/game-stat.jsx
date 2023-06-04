import "./game-stat.scss";

const GameStat = ({ gameStat }) => {
  const { totalDoubleBulls, totalSingleBulls, totalScore } = gameStat;

  return (
    <div className="game-stat">
      <div className="game-stat__total">{totalScore}</div>
      <div className="game-stat__total-bull game-stat__total-bull--single">
        <span>{totalSingleBulls}</span>
      </div>
      <div className="game-stat__total-bull game-stat__total-bull--double">
        <span>{totalDoubleBulls}</span>
      </div>
    </div>
  );
};

export default GameStat;
