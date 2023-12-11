const Button = ({
  children,
  version = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  props,
}) => {
  const primary = 'bg-accentDarkShade text-white';
  const secondary = 'border-2 border-accentLightShade text-accentLightShade';
  const disabledStyles =
    'disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed ';

  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      className={`w-full h-11 rounded-md ${
        version === 'primary' ? primary : secondary
      } ${
        disabled ? disabledStyles : ''
      } cursor-pointer font-bold hover:scale-95 transition-transform ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
