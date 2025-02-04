import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../slices/cartSlice";
import axios from "axios";
import { Trash2, Minus, Plus } from "lucide-react";
import { notifyError, notifySuccess } from "../App";

const CartItem = ({ item, setLoading, loading }) => {
  const dispatch = useDispatch();
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRemoveItem = async (dishId) => {
    const payload = { changeQuantity: -1 };
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(setCart(response.data));
        notifySuccess("Item removed from cart");
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      notifyError("Failed to remove item from cart");
    } finally {
      setLoading(false);
    }
  };

  const handleIncreaseQuantity = async (dishId) => {
    const payload = { changeQuantity: 1 };
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(setCart(response.data));
        notifySuccess("Cart updated successfully");
      } else {
        throw new Error("Failed to update cart");
      }
    } catch (error) {
      notifyError("Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProduct = async (dishId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        dispatch(setCart(response.data));
        notifySuccess("Dish removed from cart");
      } else {
        throw new Error("Failed to remove product from cart");
      }
    } catch (error) {
      notifyError("Failed to remove dish from cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-6">
      <div className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800 transition-all duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-lg">
            <img
              src={item.dish.image}
              alt={item.dish.name}
              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <h3 className="text-lg sm:text-xl font-bold text-white">{item.dish.name}</h3>
            <p className="text-amber-500 font-semibold text-sm sm:text-base">
              ₹{item.dish.price}
            </p>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-white">
              ₹{item.dish.price * item.quantity}
            </p>
            <p className="text-sm text-neutral-400">Total</p>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center bg-black rounded-lg p-1">
              <button
                onClick={() => handleRemoveItem(item.dish._id)}
                className="p-2 text-neutral-400 hover:text-amber-500 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                <Minus size={16} />
              </button>

              <span className="w-10 text-center text-white font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => handleIncreaseQuantity(item.dish._id)}
                className="p-2 text-neutral-400 hover:text-amber-500 transition-colors disabled:opacity-50"
                disabled={loading || !item.dish.inStock}
              >
                <Plus size={16} />
              </button>
            </div>

            <button
              onClick={() => handleRemoveProduct(item.dish._id)}
              className="p-2 text-neutral-400 hover:text-red-500 transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;