import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../slices/cartSlice";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = async (dishId) => {
    const payload = { changeQuantity: -1 };
    setLoading(true);

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload
      );

      if (response.status === 200) {
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (dishId) => {
    const payload = { changeQuantity: 1 };
    setLoading(true);

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload
      );

      if (response.status === 200) {
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (dishId) => {
    setLoading(true);

    try {
      const response = await axios.delete(`${VITE_BACKEND_URL}/cart/${dishId}`);

      if (response.status === 200) {
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to remove product from cart");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center p-5 bg-white rounded-lg shadow-lg hover:shadow-2xl mb-6 transition-all duration-300 ease-in-out">
      
      <div className="flex items-center space-x-5 w-2/3">
        <img
          src={item.dish.image}
          alt={item.dish.name}
          className="w-20 h-20 object-cover rounded-lg shadow-md"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{item.dish.name}</h3>
          <p className="text-sm text-gray-500">₹{item.dish.price}</p>
        </div>
      </div>

      
      <p className="text-lg font-semibold text-gray-700 w-1/6">
        ₹{item.dish.price * item.quantity}
      </p>

      
      <div className="flex items-center space-x-3 w-1/6">
        <button
          onClick={() => handleRemoveItem(item.dish._id)}
          className="bg-yellow-400 text-white px-3 py-1 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300 ease-in-out"
          disabled={loading}
        >
          -
        </button>

        <span className="text-xl font-semibold text-gray-800">{item.quantity}</span>

        <button
          onClick={() => handleIncreaseQuantity(item.dish._id)}
          className="bg-teal-500 text-white px-3 py-1 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 ease-in-out"
          disabled={loading}
        >
          +
        </button>
      </div>
      
       <button
        onClick={() => handleRemoveProduct(item.dish._id)}
        className="bg-red-500 text-white p-2 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out"
        disabled={loading}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CartItem;
