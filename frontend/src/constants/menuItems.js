import { RiLogoutBoxRLine, RiUserAddLine } from "react-icons/ri";

export const menuItems = [
  {
    label: "Login",
    icon: RiUserAddLine,
    path: "/login",
    privateNav: false,
  },
  {
    label: "Logout",
    icon: RiLogoutBoxRLine,
    path: "",
    privateNav: true,
  },
];
