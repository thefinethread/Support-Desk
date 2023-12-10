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
      className={`w-full h-11 rounded-md bg-black text-white cursor-pointer hover:bg-gray-800 disabled:bg-gray-500 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
