import instance from "./axiosInstance";
import { logout } from "../features/auth/authThunk";
import { toast } from "react-toastify";
import { reset } from "../features/auth/authSlice";

// flag used when multiple api calls at once
let isSessionAlreadyExpired = true;

const axiosInterceptor = (store) => {
  // intercept the response
  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const status = err?.response?.status || null;
      // if unauthorized redirect to login page
      if (status === 401 && isSessionAlreadyExpired) {
        isSessionAlreadyExpired = false;
        await store.dispatch(logout());
        await store.dispatch(reset());
        toast.info("Your session has expired. Please login");
      }
      return Promise.reject(err);
    },
  );
};

export default axiosInterceptor;
