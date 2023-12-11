import { NavLink } from 'react-router-dom';

const NavItem = ({
  path,
  privateNav = false,
  icon: Icon,
  label,
  onClick,
  className = '',
  hoverBgColor,
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
          className={`flex justify-between items-center gap-1 rounded-md py-1 px-2 transition-colors hover:${
            hoverBgColor || 'bg-gray-100'
          } ${className}`}
        >
          <Icon size="1.2rem" />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
