import axios from 'axios';

const API_URL = '/api/users';

const registerUser = async (user) => {
  return await axios.post(`${API_URL}/register`, user);
};

const loginUser = async (user) => {
  return await axios.post(`${API_URL}/login`, user);
};

export { registerUser, loginUser };
