import ClipLoader from 'react-spinners/ClipLoader';

const Spinner = ({ color = '#6b5ca5ff', size = 35 }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ClipLoader color={color} size={size} />
    </div>
  );
};

export default Spinner;
