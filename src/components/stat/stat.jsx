import "./stat.scss";

const Stat = ({ text, value }) => {
  return (
    <div className="stat">
      <div className="stat__text">{ text }</div>
      <div className="stat__value">{ value }</div>
    </div>
  );
};

export default Stat;
