import React from 'react';

const StyledText = ({ bgColor = 'bg-gray-500', children, className = '' }) => {
  return (
    <span
      className={`text-white font-semibold text-[9px] rounded-sm tracking-wide px-2 ${bgColor} ${className}`}
    >
      {children}
    </span>
  );
};

export default StyledText;
