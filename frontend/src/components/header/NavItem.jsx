import { NavLink } from 'react-router-dom';

const NavItem = ({ path, icon: Icon, label }) => {
  return (
    <li className="text-gray-400">
      <NavLink
        to={path}
        className={({ isActive }) => (isActive ? 'text-ultraViolet ' : '')}
      >
        <div className="flex justify-between items-center gap-1  hover:bg-gray-100 hover:rounded-md  py-1 px-2">
          <Icon size="1.2rem" />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
