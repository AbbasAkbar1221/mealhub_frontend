// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setDishesOfCounter } from "../slices/counterSlice";
// import CircularProgress from "@mui/material/CircularProgress"; 
// import Box from "@mui/material/Box";

// const EditDishModal = ({ dish, onClose ,loadingModalBg,setLoadingModalBg}) => {
//   const [name, setName] = useState(dish.name);
//   const [price, setPrice] = useState(dish.price);
//   const [image, setImage] = useState(dish.image);
//   const [inStock, setInStock] = useState(dish.inStock);
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const dishes = useSelector((state) => state.counter.dishes);

//   const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const updatedDish = { name, price, image, inStock };
//       const response = await axios.patch(
//         `${VITE_BACKEND_URL}/dish/${dish._id}`,
//         updatedDish, {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         const updatedDishes = dishes.map((item) =>
//           item._id === response.data._id ? response.data : item
//         );
//         dispatch(setDishesOfCounter(updatedDishes));

//         onClose();
//       } else {
//         throw new Error("Failed to update dish");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setLoadingModalBg()
//     }
//   };

//   return (
//     <div className="relative z-[1000]">
      
//       {loading && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <Box sx={{ display: "flex" }}>
//             <CircularProgress
//               size={50}
//               color="inherit"
//               style={{ color: "black" }}
//             />{" "}
            
//           </Box>
//         </div>
//       )}

      
//       <div className="fixed inset-0 flex justify-center items-center z-50 mt-10">
//         <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
//           <div className="bg-white p-8 rounded-2xl w-96">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Dish</h2>
            
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Price
//                 </label>
//                 <input
//                   type="number"
//                   value={price}
//                   onChange={(e) => setPrice(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Image URL
//                 </label>
//                 <input
//                   type="text"
//                   value={image}
//                   onChange={(e) => setImage(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div className="flex items-center">
//                 <input
//                   type="checkbox"
//                   checked={inStock}
//                   onChange={() => setInStock(!inStock)}
//                   className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                 />
//                 <label className="ml-3 text-sm font-medium text-gray-700">
//                   In Stock
//                 </label>
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
      
//                   {loading ? "updating..." : "Save Changes"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDishModal;


import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDishesOfCounter } from "../slices/counterSlice";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { notifyError, notifySuccess } from "../App";

const EditDishModal = ({ dish, onClose,loadingModalBg,setLoadingModalBg }) => {
  const [name, setName] = useState(dish.name);
  const [price, setPrice] = useState(dish.price);
  const [image, setImage] = useState(dish.image);
  const [inStock, setInStock] = useState(dish.inStock);
  const [rating, setRating] = useState(dish.rating);
  const [category, setCategory] = useState(dish.category);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.counter.dishes);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const updatedDish = { name, price, image, inStock, category, rating };
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/dish/${dish._id}`,
        updatedDish,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedDishes = dishes.map((item) =>
          item._id === response.data._id ? response.data : item
        );
        dispatch(setDishesOfCounter(updatedDishes));
        notifySuccess("Dish updated successfully");
        onClose();
      } else {
        throw new Error("Failed to update dish");
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to update dish");
    } finally {
      setLoading(false);
      setLoadingModalBg()
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="fixed inset-0 flex items-center justify-center z-50 px-4 mt-10"
    >
      <div className="bg-neutral-900 rounded-sm border border-neutral-800 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Edit Dish</h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Rating
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
                className=" accent-amber-500 w-5 h-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
              />
              <label className="text-sm font-medium text-neutral-300">
                In Stock
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-neutral-800 text-white px-4 py-3 rounded-sm hover:bg-neutral-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-amber-600 text-white px-4 py-3 rounded-sm hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default EditDishModal;
