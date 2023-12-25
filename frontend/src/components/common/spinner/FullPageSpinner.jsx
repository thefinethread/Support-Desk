import ReactLoading from "react-loading";

const FullPageSpinner = ({
  color = "#48D6D2",
  size = 35,
  children,
  className = "",
}) => {
  return (
    <div className="absolute h-full w-full">
      <div
        className={`flex h-full w-full items-center justify-center gap-1 font-semibold text-accentLightShade ${className}`}
      >
        <ReactLoading type="spin" color={color} height={size} width={size} />
        {children}
      </div>
    </div>
  );
};

export default FullPageSpinner;
