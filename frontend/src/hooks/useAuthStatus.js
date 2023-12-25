import { useSelector } from "react-redux";

const useAuthStatus = () => {
  const user = useSelector((store) => store.auth.user);

  const loggedIn = !!user;

  return { loggedIn };
};

export default useAuthStatus;
