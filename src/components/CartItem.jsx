import React from "react";
import { useDispatch } from "react-redux";
import { setCart } from "../slices/cartSlice";
import axios from "axios";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleRemoveItem = async (dishId) => {
    const payload = { changeQuantity: -1 };

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload
      );
      console.log(response.data);

      if (response.status === 200) {
        console.log("Cart updated successfully:", response.data);
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing item:", error.message);
    }
  };

  const handleIncreaseQuantity = async (dishId) => {
    const payload = { changeQuantity: 1 };

    try {
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/cart/${dishId}`,
        payload
      );
      console.log(response.data);

      if (response.status === 200) {
        console.log("Cart updated successfully:", response.data);
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to add item from cart");
      }
    } catch (error) {
      console.error("Error adding item:", error.message);
    }
  };

  const handleRemoveProduct = async (dishId) => {
    try {
      const response = await axios.delete(`${VITE_BACKEND_URL}/cart/${dishId}`);
      console.log(response.data);

      if (response.status === 200) {
        console.log(" Dish deleted successfully from cart:", response.data);
        dispatch(setCart(response.data));
      } else {
        throw new Error("Failed to delete dish from cart");
      }
    } catch (error) {
      console.error("Error deleting dish:", error.message);
    }
  };
  return (
    
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      <div className="flex items-center">
        <img
          src={item.dish.image}
          alt={item.dish.name}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />

        <div>
          <h3 className="text-lg font-semibold">{item.dish.name}</h3>
          <p className="text-sm text-gray-500">₹{item.dish.price}</p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          onClick={() => handleIncreaseQuantity(item.dish._id)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
        >
          +
        </button>
        <span className="mx-2 text-xl">{item.quantity}</span>
        <button
          onClick={() => handleRemoveItem(item.dish._id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
        >
          -
        </button>
        <button
          onClick={() => handleRemoveProduct(item.dish._id)}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Remove
        </button>
      </div>
      <p className="text-lg font-semibold">
        ₹{item.dish.price * item.quantity}
      </p>
    </div>
  );
};

export default CartItem;
