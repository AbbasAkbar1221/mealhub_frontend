import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { setTotalAmount } from "../slices/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(setTotalAmount);
  const [loading, setLoading] = useState(false);

  return (
    <div className="container mx-auto p-6  rounded-xl shadow-lg w-full min-h-screen bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
        Your Cart
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-6">
            {cartItems.map((item) =>
              item.dish && <CartItem key={item._id} item={item} /> 
            )}
          </div>

          <div className="mt-8 flex justify-between items-center max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900">
              Total: ₹{totalAmount}
            </h3>
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} className="text-white" />
              ) : (
                "Checkout"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
