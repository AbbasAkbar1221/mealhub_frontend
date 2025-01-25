import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <NavLink to="/" className="hover:text-gray-300">
            MealHub
          </NavLink>
        </div>

        <div className="flex space-x-4">
          <NavLink to="/counter" className="hover:text-gray-300">
            Counter
          </NavLink>
          <NavLink to="/cart" className="hover:text-gray-300">
            Cart
          </NavLink>
          <NavLink to="/profile" className="hover:text-gray-300">
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
