import { NavLink } from 'react-router-dom';

const NavItem = ({
  path,
  privateNav = false,
  icon: Icon,
  label,
  onClick,
  className = '',
}) => {
  return (
    <li className="text-gray-400">
      <NavLink
        onClick={onClick}
        to={path}
        className={({ isActive }) =>
          isActive && !privateNav ? 'text-accentLightShade ' : ''
        }
      >
        <div
          className={`flex justify-between items-center gap-1 rounded-md py-[10px] px-2 sm:px-4 transition-colors ${className}`}
        >
          <Icon size="1.2rem" />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
