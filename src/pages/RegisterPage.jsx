import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { MdFastfood } from "react-icons/md";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  useEffect(() => {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto"; 
      };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-900 p-4">
      <div className="mb-6 flex items-center gap-2">
              <MdFastfood className="text-yellow-500 text-4xl" />
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Foodie Heaven</h1>
            </div>

      <div className="w-full max-w-md bg-gray-50 dark:bg-gray-800 p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-100 dark:bg-red-800 border border-red-400 dark:border-red-600 rounded-md py-2 mb-4">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-600 dark:text-gray-300 text-center">
          Already have an account?{" "}
          <Link className="text-yellow-500 hover:underline" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
