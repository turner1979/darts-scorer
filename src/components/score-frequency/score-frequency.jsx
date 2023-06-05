import './score-frequency.scss';

const ScoreFrequency = ({ frequency, percentage, score }) => {
  return (
    <div className="score-frequency">
      <div className="score-frequency__score">{ score }</div>
      <div className="score-frequency__percentage">
        <span style={{ width: `${percentage}%`}}></span>
      </div>
      <div className="score-frequency__frequency">{ frequency }</div>
    </div>
  );
};

export default ScoreFrequency;
