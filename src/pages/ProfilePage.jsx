import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { MdShoppingCart } from "react-icons/md";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const cartItems = user?.cart || [];

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-3xl mt-10 dark:bg-gray-900 dark:text-white backdrop-blur-lg border border-gray-200 dark:border-gray-800">
      
      <div className="flex items-center gap-6 border-b pb-6 dark:border-gray-700">
        
        <div className="relative w-20 h-20 rounded-full overflow-hidden shadow-lg">
          <Avatar
            sx={{
              width: "100%",
              height: "100%",
              fontSize: "2rem",
              background: "linear-gradient(135deg, #ff8a00, #da1b60)",
              color: "#fff",
            }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </div>

        <div>
          <h2 className="text-3xl font-bold tracking-wide">{user?.name || "Guest User"}</h2>
          <p className="text-gray-500 dark:text-gray-400">{user?.email || "Email not available"}</p>

          <span
            className={`px-4 py-1 text-sm rounded-full font-semibold inline-block mt-3 shadow-md ${
              user?.role === "Admin"
                ? "bg-red-500 text-white"
                : user?.role === "Merchant"
                ? "bg-blue-500 text-white"
                : "bg-green-500 text-white"
            }`}
          >
            {user?.role || "Customer"}
          </span>
        </div>
      </div>

      {/* <div className="mt-8">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <MdShoppingCart className="text-blue-500 text-2xl" />
          Cart Items ({cartItems.length})
        </h3>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 mt-2 italic">Your cart is empty.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {cartItems.map((item, index) => (
              <li
                key={index}
                className="p-4 border rounded-lg flex justify-between items-center dark:border-gray-700 hover:shadow-md transition-all duration-200"
              >
                <span className="font-medium">{item.dish.name}</span>
                <span className="text-gray-500 dark:text-gray-400">x{item.quantity}</span>
              </li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default ProfilePage;
