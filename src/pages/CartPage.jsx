// import React from "react";
// import { useSelector } from "react-redux";
// import CartItem from "../components/CartItem";
// import { setTotalAmount } from "../slices/cartSlice";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector(setTotalAmount);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-3xl font-semibold text-center mb-6">Your Cart</h2>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div>
//           <div>
//             {cartItems.map((item) => (
//               <CartItem key={item._id} item={item} />
//             ))}
//           </div>

//           <div className="mt-6 flex justify-between">
//             <h3 className="text-xl font-semibold">Total: ₹{totalAmount}</h3>
//             <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition duration-300">
//               Checkout
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { setTotalAmount } from "../slices/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(setTotalAmount);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    setLoading(true);
    // Add checkout logic here, then set loading to false once done.
    setTimeout(() => setLoading(false), 2000); // Simulating a network request
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-xl shadow-lg">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-700">Total: ₹{totalAmount}</h3>
            <button
              onClick={handleCheckout}
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
