import Dart from './dart';

const Icon = props => {
  switch (props.name) {
    case 'dart':
      return <Dart {...props} />;
    default:
      return;
  }
};

export default Icon;
