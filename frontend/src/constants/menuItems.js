import {
  RiLoginBoxLine,
  RiLogoutBoxRLine,
  RiUserAddLine,
} from 'react-icons/ri';

export const menuItems = [
  {
    label: 'Login',
    icon: RiLoginBoxLine,
    path: '/login',
    privateNav: false,
  },
  {
    label: 'Register',
    icon: RiUserAddLine,
    path: '/register',
    privateNav: false,
  },
  {
    label: 'Logout',
    icon: RiLogoutBoxRLine,
    path: '',
    privateNav: true,
  },
];
