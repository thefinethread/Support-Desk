import { NavLink } from 'react-router-dom';

const NavItem = ({ path, icon: Icon, label }) => {
  return (
    <li className=" hover:text-ruddyBlue">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? 'text-ruddyBlue underline underline-offset-4' : ''
        }
      >
        <div className="flex justify-between items-center gap-1">
          <Icon />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
