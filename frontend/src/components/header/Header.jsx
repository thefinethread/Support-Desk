import { Link } from 'react-router-dom';
import { RiLoginBoxLine, RiUserAddLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import NavItem from './NavItem';
import Container from '../common/Container';

const menuItems = [
  {
    label: 'Login',
    icon: RiLoginBoxLine,
    path: '/login',
    private: false,
  },
  {
    label: 'Register',
    icon: RiUserAddLine,
    path: '/register',
    private: false,
  },
  {
    label: 'Logout',
    icon: RiUserAddLine,
    path: '',
    private: true,
  },
];

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <header>
      <Container>
        <nav className="flex justify-between items-center h-16 border-b-2 font-medium">
          <div>
            <Link to="/">
              <h1 className="font-bold text-xl">Support Desk</h1>
            </Link>
          </div>
          <ul className="flex justify-between items-center">
            {menuItems
              .filter((item) =>
                user ? item.private === true : item.private === false
              )
              .map((item) => (
                <NavItem key={item.label} {...item} />
              ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
