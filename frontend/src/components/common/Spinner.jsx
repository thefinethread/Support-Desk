import ReactLoading from 'react-loading';

const Spinner = ({ color = '#6b5ca5ff', size = 35 }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ReactLoading type="spin" color={color} height={size} width={size} />
    </div>
  );
};

export default Spinner;
