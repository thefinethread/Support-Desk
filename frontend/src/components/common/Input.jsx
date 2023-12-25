const Input = ({
  id,
  type,
  placeholder,
  required = true,
  value,
  label,
  className = "",
  onChange,
  ...props
}) => {
  return (
    <>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      <input
        value={value}
        id={id}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-md py-2 pl-2 outline-none outline-1 outline-offset-0 outline-gray-300 focus:shadow-custom focus:outline-secondaryLightShade disabled:cursor-not-allowed dark:bg-zinc-800 dark:outline-zinc-700 dark:focus:shadow-darkCustom ${className}`}
        {...props}
      />
    </>
  );
};

export default Input;
