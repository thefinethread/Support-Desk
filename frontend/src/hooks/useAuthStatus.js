import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const user = useSelector((store) => store.auth.user);

  useEffect(() => {
    user ? setLoggedIn(true) : setLoggedIn(false);
  }, [user]);

  return { loggedIn };
};

export default useAuthStatus;
