const Container = ({ children, className }) => {
  return (
    <div className={`mx-auto h-full w-full max-w-5xl px-4 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
