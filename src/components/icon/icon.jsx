import Dart from "./dart";
import Dartboard from "./dartboard";

const Icon = (props) => {
  switch (props.name) {
    case "dart":
      return <Dart {...props} />;
    case "dartboard":
      return <Dartboard {...props} />;
    default:
      return;
  }
};

export default Icon;
