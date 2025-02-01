// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import CartItem from "../components/CartItem";
// import { setTotalAmount } from "../slices/cartSlice";
// import CircularProgress from "@mui/material/CircularProgress";

// const CartPage = () => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalAmount = useSelector(setTotalAmount);
//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="container mx-auto p-6  rounded-xl shadow-lg w-full min-h-screen bg-gray-100">
//       <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">
//         Your Cart
//       </h2>

//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty.</p>
//       ) : (
//         <div>
//           <div className="space-y-6">
//             {cartItems.map((item) =>
//               item.dish && <CartItem key={item._id} item={item} /> 
//             )}
//           </div>

//           <div className="mt-8 flex justify-between items-center max-w-md mx-auto">
//             <h3 className="text-2xl font-semibold text-gray-900">
//               Total: ₹{totalAmount}
//             </h3>
//             <button
//               className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300"
//               disabled={loading}
//             >
//               {loading ? (
//                 <CircularProgress size={24} className="text-white" />
//               ) : (
//                 "Checkout"
//               )}
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
import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector(setTotalAmount);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-amber-500 font-serif italic text-2xl mb-2">
            Your Order
          </h2>
          <div className="flex items-center justify-center gap-4">
            <ShoppingCart className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold text-white">Shopping Cart</h1>
          </div>
        </motion.div>

        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-neutral-400 text-xl">Your cart is empty</p>
            <button className="mt-6 px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-sm transition-colors">
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <div className="bg-black rounded-sm p-6">
            <div className="space-y-6">
              {cartItems.map((item) =>
                item.dish && (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <CartItem item={item} />
                  </motion.div>
                )
              )}
            </div>

            <motion.div 
              className="mt-12 border-t border-neutral-800 pt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-4xl mx-auto">
                <div className="text-center md:text-left">
                  <p className="text-neutral-400 mb-2">Total Amount</p>
                  <h3 className="text-3xl font-bold text-white">
                    ₹{totalAmount.toLocaleString()}
                  </h3>
                </div>
                
                <button
                  className="w-full md:w-auto bg-amber-600 hover:bg-amber-700 text-white px-12 py-4 rounded-sm font-semibold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} className="text-white" />
                  ) : (
                    <>
                      Proceed to Checkout
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;