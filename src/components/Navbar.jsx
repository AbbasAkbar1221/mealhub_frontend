import React from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import axios from "axios";

const Navbar = () => {
  const cartLength = useSelector((state) => state.cart.items.length);
  // const cartLength = useSelector((state) =>
  //   state.cart.items.filter((item) => item.dish !== null).length
  // );
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      
      const refreshToken = localStorage.getItem("refreshToken");
  
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      await axios.post(`${VITE_BACKEND_URL}/auth/logout`, { token: refreshToken });
  
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
  
      dispatch(removeCurrentUser());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  

  return (
    <nav className="bg-black text-white p-4 sticky top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-300">
          Foodie Heaven
          </NavLink>
        </div>

        <div className="flex space-x-8">
          <NavLink
            to="/counter"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Counter
          </NavLink>
          <NavLink
            to="/profile"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Profile
          </NavLink>
          <NavLink
            to="/myCounters"
            className="hover:text-gray-300 text-lg font-medium"
          >
            My Counters
          </NavLink>
          <NavLink
            to="/adminUsers"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Manage Users
          </NavLink>
          <NavLink
            to="/adminCounters"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Manage Counters
          </NavLink>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-300">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className="hover:text-gray-300">
              Login
            </NavLink>
          )}

          <div className="relative">
            <NavLink to="/cart" className="hover:text-gray-300">
              <FaShoppingCart size={24} />
            </NavLink>
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartLength}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
