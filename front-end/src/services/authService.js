import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response;
};

const register = async (credentials) => {
  const response = await axios.post(`${API_URL}/register`, credentials);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response;
};

// Optional: Utility function to get token for authenticated requests
const getToken = () => localStorage.getItem("token");

const authService = {
  login,
  register,
  getToken,
};

export default authService;
