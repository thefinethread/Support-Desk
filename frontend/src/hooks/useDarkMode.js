import { useEffect, useState } from 'react';

const html = document.documentElement;

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('darkTheme') || false
  );

  useEffect(() => {
    isDarkMode && html.classList.add('dark');
  }, []);

  const toggleMode = () => {
    localStorage.setItem('darkTheme', !isDarkMode);
    html.classList.toggle('dark');
    setIsDarkMode((prev) => !prev);
  };

  return { isDarkMode, toggleMode };
};

export default useDarkMode;
