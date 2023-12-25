const SubHeader = ({ children, className = "" }) => {
  return (
    <header
      className={`py-4 text-3xl font-semibold text-gray-500 dark:text-gray-200 ${className}`}
    >
      <h1>{children}</h1>
    </header>
  );
};

export default SubHeader;
