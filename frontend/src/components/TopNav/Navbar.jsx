import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RiMoonFill, RiSunFill } from "react-icons/ri";
import { logout } from "../../features/auth/authThunk";
import NavItem from "./NavItem";
import Container from "../common/Container";
import { reset } from "../../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import useAuthStatus from "../../hooks/useAuthStatus";
import { menuItems } from "../../constants/menuItems";
import useDarkMode from "../../hooks/useDarkMode";

const Navbar = () => {
  const { user, hasError, message, success } = useSelector(
    (state) => state.auth,
  );

  // const { darkTheme } = useSelector((state) => state.theme);

  const { darkTheme, toggleThemeMode } = useDarkMode();

  const { loggedIn } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    if (user && hasError) {
      toast.error(message);
    }

    if (!loggedIn && success) {
      navigate("/");
      dispatch(reset());
    }
  }, [loggedIn, user, hasError, success, navigate, message, dispatch]);

  return (
    <header>
      <Container>
        <nav className="flex h-16 items-center justify-between border-b-2 font-medium dark:border-b-zinc-700">
          <div>
            <Link to="/">
              <h1 className="text-xl font-bold">Support Desk</h1>
            </Link>
          </div>
          <ul className="flex items-center justify-between gap-1">
            <button onClick={toggleThemeMode}>
              {darkTheme ? (
                <RiSunFill size="1rem" />
              ) : (
                <RiMoonFill size="1rem" />
              )}
            </button>
            {menuItems
              .filter((item) =>
                loggedIn ? item.privateNav === true : item.privateNav === false,
              )
              .map((item) => (
                <NavItem
                  onClick={item.privateNav && handleLogout}
                  key={item.label}
                  {...item}
                  className={item.privateNav ? "flex-row-reverse" : ""}
                />
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
