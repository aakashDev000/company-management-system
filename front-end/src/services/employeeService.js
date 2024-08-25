import axios from "axios";
import authService from "./authService";

const API_URL = "http://localhost:5000/api/employees";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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

const getEmployees = (companyId) =>
  apiClient.get(`${API_URL}/company/${companyId}`);

const createEmployee = (employeeData) =>
  apiClient.post(`${API_URL}/company/${employeeData.company}`, employeeData);

const updateEmployee = (employeeData) =>
  apiClient.put(`${API_URL}/${employeeData._id}`, employeeData);

const deleteEmployee = (employeeId) =>
  apiClient.delete(`${API_URL}/${employeeId}`);

const getEmployeeHierarchy = (employeeId) =>
  apiClient.get(`${API_URL}/hierarchy/${employeeId}`);

const employeeService = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeHierarchy,
};

export default employeeService;
