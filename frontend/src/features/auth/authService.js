import instance from '../../axios/axiosInstance';

const API_URL = '/api/users';

const registerUser = async (user) => {
  return await instance.post(`${API_URL}/register`, user);
};

const loginUser = async (user) => {
  return await instance.post(`${API_URL}/login`, user);
};

const logoutUser = async () => {
  return await instance.post(`${API_URL}/logout`);
};

export { registerUser, loginUser, logoutUser };
