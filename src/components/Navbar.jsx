import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../slices/authSlice";
import axios from "axios";
import { ROLE } from "../constants";

const Navbar = () => {
  const cartLength = useSelector((state) => state.cart.items.length);
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);

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

        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <div className="hidden lg:flex space-x-8">
          {user && <NavLink to="/counter" className="hover:text-gray-300 text-lg font-medium">Counters</NavLink>}
          {user && <NavLink to="/profile" className="hover:text-gray-300 text-lg font-medium">Profile</NavLink>}
          {user && user.role === ROLE.Merchant && <NavLink to="/myCounters" className="hover:text-gray-300 text-lg font-medium">My Counters</NavLink>}
          {user && user.role === ROLE.Admin && <NavLink to="/adminUsers" className="hover:text-gray-300 text-lg font-medium">Manage Users</NavLink>}
          {user && user.role === ROLE.Admin && <NavLink to="/adminCounters" className="hover:text-gray-300 text-lg font-medium">Manage Counters</NavLink>}
        </div>

        <div className="hidden lg:flex items-center space-x-6">
          {user ? (
            <button onClick={handleLogout} className="hover:text-gray-300">Logout</button>
          ) : (
            <NavLink to="/login" className="hover:text-gray-300">Login</NavLink>
          )}
          {user && (
            <div className="relative">
              <NavLink to="/cart" className="hover:text-gray-300">
                <FaShoppingCart size={24} />
              </NavLink>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartLength}
              </span>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-black w-full py-4 space-y-4 text-center">
          {user && <NavLink to="/counter" className="block hover:text-gray-300">Counters</NavLink>}
          {user && <NavLink to="/profile" className="block hover:text-gray-300">Profile</NavLink>}
          {user && user.role === ROLE.Merchant && <NavLink to="/myCounters" className="block hover:text-gray-300">My Counters</NavLink>}
          {user && user.role === ROLE.Admin && <NavLink to="/adminUsers" className="block hover:text-gray-300">Manage Users</NavLink>}
          {user && user.role === ROLE.Admin && <NavLink to="/adminCounters" className="block hover:text-gray-300">Manage Counters</NavLink>}
          {user ? (
            <button onClick={handleLogout} className="block hover:text-gray-300">Logout</button>
          ) : (
            <NavLink to="/login" className="block hover:text-gray-300">Login</NavLink>
          )}
          {user && (
            <div className="flex justify-center mt-2">
              <NavLink to="/cart" className="relative hover:text-gray-300">
                <FaShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartLength}
                </span>
              </NavLink>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
