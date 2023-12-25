const Header = ({ children, className = "" }) => {
  return (
    <header
      className={`py-4 text-3xl font-semibold text-gray-800 dark:text-zinc-100 ${className}`}
    >
      <h1>{children}</h1>
    </header>
  );
};

export default Header;
