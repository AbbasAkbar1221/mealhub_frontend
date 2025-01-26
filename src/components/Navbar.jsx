import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartLength = useSelector((state)=> state.cart.items.length);
  return (
    <nav className="bg-black text-white p-4 sticky top-0 shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center">
        
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-300">
            MealHub
          </NavLink>
        </div>

        <div className="flex space-x-8">
          <NavLink
            to="/counter"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Counter
          </NavLink>
          <NavLink to="/cart" className="hover:text-gray-300 text-lg font-medium">
            Cart
          </NavLink>
          <NavLink
            to="/profile"
            className="hover:text-gray-300 text-lg font-medium"
          >
            Profile
          </NavLink>
        </div>

        <div className="flex items-center space-x-6">
          <NavLink to="/login" className="hover:text-gray-300">
            Login
          </NavLink>
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
