import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCompaniesCount,
  fetchEmployeesByCompanyCount,
  fetchEmployeesCount,
} from "../state/dashboardSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    companiesCount,
    employeesCount,
    employeesByCompanyCount,
    loading,
    error,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchCompaniesCount());
    dispatch(fetchEmployeesCount());
    dispatch(fetchEmployeesByCompanyCount());
  }, [dispatch]);

  const handleViewCompanies = () => {
    navigate("/companies");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={handleViewCompanies}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
        >
          View Companies
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-4xl">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Companies
          </h2>
          <p className="text-5xl font-bold text-blue-600 mt-4">
            {loading ? "Loading..." : companiesCount.totalCompanies}
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 text-center transform hover:scale-105 transition-transform">
          <h2 className="text-xl font-semibold text-gray-700">
            Total Employees
          </h2>
          <p className="text-5xl font-bold text-green-600 mt-4">
            {loading ? "Loading..." : employeesCount.totalEmployees}
          </p>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Employees Per Company
        </h2>
        {loading ? (
          <div className="text-center text-gray-500">Loading data...</div>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">
                  Company Name
                </th>
                <th className="px-4 py-2 border-b text-left text-gray-700 font-semibold">
                  Company Code
                </th>
                <th className="px-4 py-2 border-b text-right text-gray-700 font-semibold">
                  Employee Count
                </th>
              </tr>
            </thead>
            <tbody>
              {employeesByCompanyCount.length > 0 ? (
                employeesByCompanyCount.map((stat, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b text-left text-gray-600">
                      {stat.companyName}
                    </td>
                    <td className="px-4 py-2 border-b text-left text-gray-600">
                      {stat.companyCode}
                    </td>
                    <td className="px-4 py-2 border-b text-right text-gray-600">
                      {stat.employeeCount}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
