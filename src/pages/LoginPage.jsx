import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdFastfood } from "react-icons/md";
import { setLoading } from "../slices/authSlice";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/login`, { email, password });

      const { token, refresh_token} = response?.data || {};

      if (!token || !refresh_token) {
        throw new Error("Invalid response from the server. Please try again.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refresh_token);

      dispatch(setLoading(true));
      try {
        const userResponse = await axios.get(`${VITE_BACKEND_URL}/cart/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCurrentUser(userResponse.data));
        dispatch(setLoading(false));

        navigate("/counter");
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        dispatch(setLoading(false));
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", errorMessage);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      
      <div className="mb-6 flex items-center gap-2">
        <MdFastfood className="text-yellow-500 text-4xl" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Foodie Heaven</h1>
      </div>

      
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white text-center mb-4">
          Sign in to Foodie Heaven
        </h2>

        <form onSubmit={handleSubmit}>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-50 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          >
            Sign in
          </button>
        </form>

        
        {error && (
          <p className="text-white-600 text-center bg-red-100 dark:bg-red-700 border border-red-400 rounded-md text-sm mt-4 px-3 py-2">
            {error}
          </p>
        )}

        
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4 text-center">
          By continuing, you agree to Foodie Heaven's{" "}
          <a href="#" className="text-yellow-500 hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-yellow-500 hover:underline">
            Privacy Policy
          </a>
          .
        </p>

        
        <div className="mt-4 text-center text-sm text-white">
          Don't have an account?{" "}
          <Link className="text-yellow-500 hover:underline" to="/register">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
