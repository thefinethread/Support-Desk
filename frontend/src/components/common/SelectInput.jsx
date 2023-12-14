const SelectInput = ({ id, label, options, value, placeholder, onChange }) => {
  return (
    <div className="mb-3 text-left">
      <label htmlFor={id} className="font-medium text-sm block mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`w-full outline-none py-[9px] pl-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-secondaryLightShade focus:shadow-[0_0_0_5px_rgb(42,111,219,0.3)] disabled:cursor-not-allowed`}
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
