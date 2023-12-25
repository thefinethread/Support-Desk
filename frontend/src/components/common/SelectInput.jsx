const SelectInput = ({
  id,
  label,
  options,
  value,
  placeholder,
  onChange,
  required = true,
}) => {
  return (
    <div className="mb-3 text-left">
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full rounded-md px-2 py-[9px] outline-none outline-1 outline-offset-0 outline-gray-300 focus:shadow-custom focus:outline-secondaryLightShade disabled:cursor-not-allowed dark:bg-zinc-800 dark:outline-zinc-700`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
