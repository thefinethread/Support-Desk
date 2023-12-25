const Button = ({
  children,
  version = 'primary',
  type = 'button',
  className = '',
  disabled = false,
  onClick,
  props,
}) => {
  const primary =
    'bg-accentDarkShade dark:bg-accentDarkMode text-white dark:text-zinc-100';
  const secondary =
    'border-2 border-accentLightShade dark:border-accentDarkMode text-accentLightShade dark:text-accentDarkMode';
  const disabledStyles =
    'disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:text-white disabled:border-none disabled:scale-100 disabled:cursor-not-allowed ';

  return (
    <button
      onClick={onClick}
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
