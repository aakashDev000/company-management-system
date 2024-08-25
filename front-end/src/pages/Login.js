import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../state/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then(() => {
      navigate("/admin-dashboard");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-gray-800 text-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <p className="text-red-500 mb-4">
              {error.message && error.message}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition disabled:bg-blue-400"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="text-gray-400 hover:text-white transition"
            >
              Don't have an account? Admin Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
