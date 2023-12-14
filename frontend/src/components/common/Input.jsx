const Input = ({
  id,
  type,
  placeholder,
  required,
  value,
  label,
  className = '',
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="font-medium text-sm block mb-1">
        {label}
      </label>
      <input
        value={value}
        id={id}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={placeholder}
        className={`w-full outline-none py-2 pl-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-[0_0_0_5px_rgb(42,111,219,0.3)] disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </>
  );
};

export default Input;
