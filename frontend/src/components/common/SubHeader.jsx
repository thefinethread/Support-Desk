const SubHeader = ({ children, className = '' }) => {
  return (
    <header
      className={`font-semibold text-3xl py-4 text-gray-500 dark:text-gray-200 ${className}`}
    >
      <h1>{children}</h1>
    </header>
  );
};

export default SubHeader;
