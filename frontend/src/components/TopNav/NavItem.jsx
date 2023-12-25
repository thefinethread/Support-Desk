import { NavLink } from "react-router-dom";

const NavItem = ({
  path,
  privateNav = false,
  icon: Icon,
  label,
  onClick,
  className = "",
}) => {
  return (
    <li className="text-gray-400">
      <NavLink
        onClick={onClick}
        to={path}
        className={({ isActive }) =>
          isActive && !privateNav ? "text-accentLightShade " : ""
        }
      >
        <div
          className={`flex items-center justify-between gap-1 rounded-md px-2 py-[10px] transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-zinc-700 dark:hover:text-white sm:px-4 ${className}`}
        >
          <Icon size="1.2rem" />
          <span>{label}</span>
        </div>
      </NavLink>
    </li>
  );
};

export default NavItem;
