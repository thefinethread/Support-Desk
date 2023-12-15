import ReactLoading from 'react-loading';

const Spinner = ({
  color = '#48D6D2',
  size = 35,
  children,
  className = '',
}) => {
  return (
    <div
      className={`w-full h-full flex justify-center gap-1 items-center text-accentLightShade font-semibold ${className}`}
    >
      <ReactLoading type="spin" color={color} height={size} width={size} />
      {children}
    </div>
  );
};

export default Spinner;
