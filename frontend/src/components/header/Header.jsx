import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authThunk';
import NavItem from './NavItem';
import Container from '../common/Container';
import { reset } from '../../features/auth/authSlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStatus from '../../hooks/useAuthStatus';
import { menuItems } from '../../constants/menuItems';

const Header = () => {
  const { user, hasError, message, success } = useSelector(
    (state) => state.auth
  );

  const { loggedIn } = useAuthStatus();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => dispatch(logout());

  useEffect(() => {
    if (user && hasError) {
      toast.error(message);
    }

    if (!loggedIn && success) {
      navigate('/');
      dispatch(reset());
    }
  }, [loggedIn, user, hasError, success, navigate, message, dispatch]);

  return (
    <header>
      <Container>
        <nav className="flex justify-between items-center h-16 border-b-2 font-medium">
          <div>
            <Link to="/">
              <h1 className="font-bold text-xl">Support Desk</h1>
            </Link>
          </div>
          <ul className="flex justify-between items-center gap-1">
            {menuItems
              .filter((item) =>
                loggedIn ? item.privateNav === true : item.privateNav === false
              )
              .map((item) => (
                <NavItem
                  onClick={item.privateNav && handleLogout}
                  key={item.label}
                  {...item}
                  className={
                    item.privateNav
                      ? 'flex-row-reverse bg-accentDarkShade text-white hover:bg-accentLightShade'
                      : 'hover:bg-gray-100'
                  }
                />
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
