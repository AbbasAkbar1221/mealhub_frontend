import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../slices/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { useRetryCall } from "../hooks";
import axios from "axios";
import { notifyError, notifySuccess } from "../App";

const Card = ({ dish, onEdit, onDelete }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some(
    (item) => item.dish && item.dish._id === dish._id
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, retryCall] = useRetryCall("post");
  const user = useSelector((state) => state.auth.currentUser);
  const counterDetails = useSelector((state) => state.counter.currentCounter);

  // const handleAddToCart = (dishId) => {
  //   const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  //   const addDishToCart = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const response = await axios.post(`${VITE_BACKEND_URL}/cart/${dishId}`,{},{
  //         headers: { Authorization: `Bearer ${token}` }
  //       })
  //       if (response.status === 201) {
  //         dispatch(setCart(response.data));
  //       } else {
  //         throw new Error("Failed to add dish to cart");
  //       }
  //     } catch (error) {
  //       console.log("Error:", error.message);
  //     }
  //   };
  //   addDishToCart();
  // };

  const handleAddToCart = (dishId) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const isMerchant = counterDetails.merchants.some(
      (merchant) => merchant._id.toString() === user._id.toString()
    );

    if (isMerchant) {
      // toast.error("You can't add your own dish to cart.");
      notifyError("You can't add your own dish to cart.");
      return;
    }

    const addDishToCart = async () => {
      try {
        const response = await retryCall(`${VITE_BACKEND_URL}/cart/${dishId}`);
        if (response.status === 201) {
          dispatch(setCart(response.data));
          notifySuccess("Dish added to cart successfully");
        } else {
          throw new Error("Failed to add dish to cart");
        }
      } catch (error) {
        console.log(
          "Error:",
          error.response ? error.response.data : error.message
        );
      }
    };
    addDishToCart();
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <li className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between space-x-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 max-w-full overflow-hidden">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-28 h-28 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {dish.name}
        </h3>
        <p className="text-lg text-gray-600 mt-2">₹{dish.price}</p>
        <p
          className={`text-sm mt-2 ${
            dish.inStock ? "text-green-500" : "text-red-500"
          }`}
        >
          {dish.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      <div className="space-x-2 flex items-center">
        {isInCart ? (
          <button
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
            onClick={handleGoToCart}
          >
            Go to Cart
          </button>
        ) : (
          dish.inStock && (
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={() => handleAddToCart(dish._id)}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                  className="text-black"
                />
              ) : (
                "Add to Cart"
              )}
            </button>
          )
        )}

        <button
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
          onClick={() => onEdit(dish)}
        >
          Edit
        </button>

        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          onClick={() => onDelete(dish)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Card;
