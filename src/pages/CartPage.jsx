import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { setTotalAmount } from "../slices/cartSlice";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(setTotalAmount);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div>
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <h3 className="text-xl font-semibold">Total: ₹{totalAmount}</h3>
            <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
