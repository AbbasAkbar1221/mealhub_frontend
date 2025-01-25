import React from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, addItemToCart, removeProduct } from "../slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  

  const handleRemoveItem = () => {
    dispatch(removeItemFromCart(item.dish._id));
  };

  const handleIncreaseQuantity = () => {
    console.log("item to add",item);
    console.log("item to add dish",item.dish);

    if (item.dish && item.dish._id) {
      dispatch(addItemToCart(item));
  } else {
      console.error('Dish is undefined or missing _id:', item.dish);
  }
  };

  const handleRemoveProduct = () => {
    dispatch(removeProduct(item.dish._id));
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
          onClick={handleIncreaseQuantity}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition duration-300"
        >
          +
        </button>
        <span className="mx-2 text-xl">{item.quantity}</span>
        <button
          onClick={handleRemoveItem}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-300"
        >
          -
        </button>
        <button
          onClick={handleRemoveProduct}
          className="ml-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition duration-300"
        >
          Remove
        </button>
      </div>
      <p className="text-lg font-semibold">₹{item.dish.price * item.quantity}</p>
    </div>
  );
};

export default CartItem;
