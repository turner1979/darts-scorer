import './button.scss';

const Button = ({ children, text, hasIcon = false, ...other }) => {
  return (
    <button className='button' {...other}>
      { children }
      <p className={ hasIcon ? 'has-icon' : ''}>{ text }</p>
    </button>
  );
}

export default Button;
