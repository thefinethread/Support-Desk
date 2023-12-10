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
      className={`w-full py-2 rounded-md bg-black text-white cursor-pointer hover:bg-gray-800 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
