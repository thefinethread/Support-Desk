import React from "react";

const StyledText = ({ bgColor = "bg-gray-500", children, className = "" }) => {
  return (
    <span
      className={`rounded-sm px-2 text-[9px] font-semibold tracking-wide text-white ${bgColor} ${className}`}
    >
      {children}
    </span>
  );
};

export default StyledText;
