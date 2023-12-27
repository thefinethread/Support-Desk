import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

const html = document.documentElement;

const useDarkMode = () => {
  const { darkTheme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("darkTheme", darkTheme);
    darkTheme ? html.classList.add("dark") : html.classList.remove("dark");
  }, [darkTheme]);

  const toggleThemeMode = () => dispatch(toggleTheme());

  return { darkTheme, toggleThemeMode };
};

export default useDarkMode;
