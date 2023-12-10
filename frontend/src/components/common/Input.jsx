import { forwardRef } from 'react';

const Input = forwardRef(
  ({ type, placeholder, required, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        required={required}
        type={type}
        placeholder={placeholder}
        className={`w-full outline-none py-2 pl-2 rounded-md outline-1 outline-gray-300 outline-offset-0 focus:outline-blue-600 focus:shadow-[0_0_0_5px_rgb(113,169,247,0.3)]  ${className}`}
        {...props}
      />
    );
  }
);

export default Input;
