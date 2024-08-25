import axios from "axios";
import authService from "./authService";

const API_URL = `${process.env.REACT_APP_API}/dashboard`;

// Create an axios instance with default settings
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to inject the token
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Service methods
const getCompaniesCount = () => apiClient.get("/total-companies");
const getEmployeesCount = () => apiClient.get("/total-employees");
const getEmployeesByCompanyCount = () => apiClient.get("/stats");

// Export the service as an object
const dashboardService = {
  getCompaniesCount,
  getEmployeesCount,
  getEmployeesByCompanyCount,
};

export default dashboardService;
