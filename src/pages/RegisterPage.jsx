import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { notifyError, notifySuccess } from "../App";
import { UtensilsCrossed, ChevronRight, User, Mail, Lock } from "lucide-react";

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
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/register`, formData);

      if (response.status === 200) {
        navigate("/login");
        notifySuccess("Account created successfully. Please login to continue.");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed");
      notifyError(error.response?.data?.message || "Registration failed");
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
        <p className="text-amber-500 font-serif italic">Begin Your Culinary Adventure</p>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-neutral-900 rounded-lg p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium text-neutral-400">
                Username
              </label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-400">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full bg-black border border-neutral-800 text-white px-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  required
                />
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
              Create Account
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-neutral-800">
            <p className="text-center text-sm text-neutral-500">
              Already have an account?{" "}
              <Link to="/login" className="text-amber-500 hover:text-amber-400 transition-colors">
                Sign in
              </Link>
            </p>
          </div>

          <p className="text-xs text-neutral-500 mt-6 text-center">
            By creating an account, you agree to Foodie Heaven's{" "}
            <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-500 hover:text-amber-400 transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}