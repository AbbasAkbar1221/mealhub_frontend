// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setCart } from "../slices/cartSlice";
// import CircularProgress from "@mui/material/CircularProgress";
// import { useRetryCall } from "../hooks";
// import axios from "axios";
// import { notifyError, notifySuccess } from "../App";

// const Card = ({ dish, onEdit, onDelete }) => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const isInCart = cartItems.some(
//     (item) => item.dish && item.dish._id === dish._id
//   );
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [loading, retryCall] = useRetryCall("post");
//   const user = useSelector((state) => state.auth.currentUser);
//   const counterDetails = useSelector((state) => state.counter.currentCounter);

//   const handleAddToCart = (dishId) => {
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//     const isMerchant = counterDetails.merchants.some(
//       (merchant) => merchant._id.toString() === user._id.toString()
//     );

//     if (isMerchant) {
//       // toast.error("You can't add your own dish to cart.");
//       notifyError("You can't add your own dish to cart.");
//       return;
//     }

//     const addDishToCart = async () => {
//       try {
//         const response = await retryCall(`${VITE_BACKEND_URL}/cart/${dishId}`);
//         if (response.status === 201) {
//           dispatch(setCart(response.data));
//           notifySuccess("Dish added to cart successfully");
//         } else {
//           throw new Error("Failed to add dish to cart");
//         }
//       } catch (error) {
//         console.log(
//           "Error:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };
//     addDishToCart();
//   };

//   const handleGoToCart = () => {
//     navigate("/cart");
//   };

//   return (
//     <li className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between space-x-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 max-w-full overflow-hidden">
//       <img
//         src={dish.image}
//         alt={dish.name}
//         className="w-28 h-28 object-cover rounded-lg shadow-md"
//       />
//       <div className="flex-1 ml-4">
//         <h3 className="text-xl font-semibold text-gray-800 truncate">
//           {dish.name}
//         </h3>
//         <p className="text-lg text-gray-600 mt-2">₹{dish.price}</p>
//         <p
//           className={`text-sm mt-2 ${
//             dish.inStock ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {dish.inStock ? "In Stock" : "Out of Stock"}
//         </p>
//       </div>

//       <div className="space-x-2 flex items-center">
//         {isInCart ? (
//           <button
//             className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-300"
//             onClick={handleGoToCart}
//           >
//             Go to Cart
//           </button>
//         ) : (
//           dish.inStock && (
//             <button
//               className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
//               onClick={() => handleAddToCart(dish._id)}
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress
//                   size={24}
//                   color="inherit"
//                   className="text-black"
//                 />
//               ) : (
//                 "Add to Cart"
//               )}
//             </button>
//           )
//         )}

//         <button
//           className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
//           onClick={() => onEdit(dish)}
//         >
//           Edit
//         </button>

//         <button
//           className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
//           onClick={() => onDelete(dish)}
//         >
//           Delete
//         </button>
//       </div>
//     </li>
//   );
// };

// export default Card;

import React from "react";
import { Star, ShoppingCart, Edit2, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../slices/cartSlice";
import { useRetryCall } from "../hooks";
import { notifyError, notifySuccess } from "../App";

const Card = ({ dish, onEdit, onDelete }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.dish && item.dish._id === dish._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, retryCall] = useRetryCall("post");
  const user = useSelector((state) => state.auth.currentUser);
  const counterDetails = useSelector((state) => state.counter.currentCounter);

  const isMerchant = counterDetails.merchants.some(
    (merchant) => merchant._id.toString() === user._id.toString()
  );

  const handleAddToCart = (dishId) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const isMerchant = counterDetails.merchants.some(
      (merchant) => merchant._id.toString() === user._id.toString()
    );

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
      {/* Image Section */}
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
        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <Star className="w-5 h-5 text-amber-500" />
          <span className="text-neutral-300">{dish.rating}</span>
        </div>
        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
        {/* Cuisine */}
        <p className="text-neutral-400 text-sm mb-2">{dish.category}</p>
        {/* Price */}
        <p className="text-amber-600 font-semibold">{`₹${dish.price}`}</p>

        {/* Cart Button */}
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

        {/* Admin Actions */}
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