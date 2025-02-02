import React from "react";
import { Star, ShoppingCart, Edit2, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../slices/cartSlice";
import { useRetryCall } from "../hooks";
import { notifyError, notifySuccess } from "../App";

const Card = ({ dish, onEdit, onDelete, isMerchant}) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.dish && item.dish._id === dish._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, retryCall] = useRetryCall("post");


  const handleAddToCart = (dishId) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    if (isMerchant) {
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
        notifyError("Failed to add dish to cart");
      }
    };
    addDishToCart();
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-black shadow-lg transform transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-64 object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              dish.inStock
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {dish.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      
      <div className="p-4 text-white">
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-amber-500" />
          <span className="text-neutral-300">{dish.rating}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
        <p className="text-neutral-400 text-sm mb-2">{dish.category}</p>
        <p className="text-amber-600 font-semibold">{`₹${dish.price}`}</p>

        <div className="flex gap-2 mt-4">
          {isInCart ? (
            <button
              onClick={handleGoToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-full transition-colors"
            >
              <ShoppingCart size={18} />
              View Cart
            </button>
          ) : (
            dish.inStock && (
              <button
                onClick={() => handleAddToCart(dish._id)}
                disabled={loading}
                className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  "Add to Cart"
                )}
              </button>
            )
          )}
        </div>

        {isMerchant && (
        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={() => onEdit(dish)}
            className="flex items-center justify-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white py-2 px-4 rounded-full transition-colors"
          >
            <Edit2 size={16} />
            Edit
          </button>
          <button
            onClick={() => onDelete(dish)}
            className="flex items-center justify-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 px-4 rounded-full transition-colors"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
        )}
      </div>
    </div>
  );
};

export default Card;