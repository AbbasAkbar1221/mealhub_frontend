import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { setLoading } from "../slices/authSlice";
import { notifyError, notifySuccess } from "../App";
import {
  UtensilsCrossed,
  ChevronRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      const { token, refresh_token } = response?.data || {};

      if (!token || !refresh_token) {
        throw new Error("Invalid response from the server. Please try again.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refresh_token);

      dispatch(setLoading(true));
      try {
        const userResponse = await axios.get(
          `${VITE_BACKEND_URL}/user/details`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setCurrentUser(userResponse.data));
        notifySuccess("Logged in successfully");
        dispatch(setLoading(false));
        navigate("/counter");
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        notifyError("Failed to fetch user details. Please try again.");
        dispatch(setLoading(false));
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
      console.error("Login failed:", errorMessage);
    }
  };

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <UtensilsCrossed className="text-amber-500 w-8 h-8" />
          <h1 className="text-4xl font-bold text-white">Foodie Heaven</h1>
        </div>
        <p className="text-amber-500 font-serif italic">
          Your Culinary Journey Begins Here
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-neutral-900 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Sign in to Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-400">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-400">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5 focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-3 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-amber-500 hover:text-amber-400 transition-colors"
              >
                Create one now
              </Link>
            </p>
          </div>

          <p className="text-xs text-neutral-500 mt-6 text-center">
            By continuing, you agree to Foodie Heaven's{" "}
            <a
              href="#"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-amber-500 hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}