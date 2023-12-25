const Input = ({
  id,
  type,
  placeholder,
  required = true,
  value,
  label,
  className = '',
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="font-semibold block mb-1">
        {label}
      </label>
      <input
        value={value}
        id={id}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={placeholder}
        className={`w-full outline-none py-2 pl-2 dark:bg-zinc-800 rounded-md outline-1 outline-gray-300 dark:outline-zinc-700 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom dark:focus:shadow-darkCustom disabled:cursor-not-allowed ${className}`}
        {...props}
      />
    </>
  );
};

export default Input;
