import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CompanyManagement from "./pages/CompanyManagement";
import EmployeeManagement from "./pages/EmployeeManagement";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {isAuthenticated ? (
          <>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/companies" element={<CompanyManagement />} />
            <Route
              path="/companies/:companyId/employees"
              element={<EmployeeManagement />}
            />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
