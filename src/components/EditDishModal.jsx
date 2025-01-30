import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDishesOfCounter } from "../slices/counterSlice";
import CircularProgress from "@mui/material/CircularProgress"; 
import Box from "@mui/material/Box";

const EditDishModal = ({ dish, onClose ,loadingModalBg,setLoadingModalBg}) => {
  const [name, setName] = useState(dish.name);
  const [price, setPrice] = useState(dish.price);
  const [image, setImage] = useState(dish.image);
  const [inStock, setInStock] = useState(dish.inStock);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.counter.dishes);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const updatedDish = { name, price, image, inStock };
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/dish/${dish._id}`,
        updatedDish, {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        const updatedDishes = dishes.map((item) =>
          item._id === response.data._id ? response.data : item
        );
        dispatch(setDishesOfCounter(updatedDishes));

        onClose();
      } else {
        throw new Error("Failed to update dish");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadingModalBg()
    }
  };

  return (
    <div className="relative z-[1000]">
      
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Box sx={{ display: "flex" }}>
            <CircularProgress
              size={50}
              color="inherit"
              style={{ color: "black" }}
            />{" "}
            
          </Box>
        </div>
      )}

      
      <div className="fixed inset-0 flex justify-center items-center z-50 mt-10">
        <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
          <div className="bg-white p-8 rounded-2xl w-96">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Dish</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={inStock}
                  onChange={() => setInStock(!inStock)}
                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 text-sm font-medium text-gray-700">
                  In Stock
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
      
                  {loading ? "updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDishModal;
