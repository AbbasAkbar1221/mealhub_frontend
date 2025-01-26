import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import CartItem from "../components/CartItem";
import { setCart } from "../slices/cartSlice";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${VITE_BACKEND_URL}/cart`);
        dispatch(setCart(response.data)); 
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

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
