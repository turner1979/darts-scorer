import "./instructions.scss";

const Instructions = () => {
  return (
    <div className="instructions">
      <p>
        <strong>Scoring</strong> per dart
      </p>
      <ul>
        <li>Double Bull = 5</li>
        <li>Single Bull = 3</li>
        <li>Between Single Bull to Treble = 1</li>
        <li>Anywhere else = 0</li>
      </ul>
    </div>
  );
};

export default Instructions;
