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
      <label htmlFor={id} className="font-semibold block mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full outline-none py-[9px] dark:bg-zinc-800 dark:outline-zinc-700 px-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-custom disabled:cursor-not-allowed`}
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
