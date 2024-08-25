import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:5000/api/companies";

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
const getCompanies = () => apiClient.get("/");
const createCompany = (companyData) => apiClient.post("/", companyData);
const updateCompany = (companyData) =>
  apiClient.put(`/${companyData._id}`, companyData);
const deleteCompany = (companyId) => apiClient.delete(`/${companyId}`);

// Export the service as an object
const companyService = {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
};

export default companyService;
