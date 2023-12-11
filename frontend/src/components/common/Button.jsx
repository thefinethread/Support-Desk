const Button = ({
  children,
  type = 'button',
  className = '',
  disabled = false,
  props,
}) => {
  return (
    <button
      type={type}
      className={`w-full h-11 rounded-md bg-accentDarkShade text-white cursor-pointer hover:bg-accentLightShade disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
