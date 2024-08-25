import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../state/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            to="/admin-dashboard"
            className="text-lg font-medium hover:text-gray-300 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/companies"
            className="text-lg font-medium hover:text-gray-300 transition"
          >
            Companies
          </Link>
        </div>
        <div className="text-center flex-1">
          <h1 className="text-xl font-semibold tracking-wider text-gray-200 uppercase">
            Company Employee Information System
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
