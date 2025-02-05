import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setDishesOfCounter } from "../slices/counterSlice";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { notifyError, notifySuccess } from "../App";

const AddDishModal = ({ counterId, onClose }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState("");
  const [inStock, setInStock] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dishes = useSelector((state) => state.counter.dishes);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const defaultImage = "https://images.pexels.com/photos/257816/pexels-photo-257816.jpeg?auto=compress&cs=tinysrgb&w=600";

    try {
      const token = localStorage.getItem("token");
      const newDish = {
        name,
        price,
        counter: counterId,
        image: image || defaultImage,
        inStock,
        rating,
        category,
      };
      const response = await axios.post(`${VITE_BACKEND_URL}/dish`, newDish, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        const updatedDishes = [...dishes, response.data];
        dispatch(setDishesOfCounter(updatedDishes));
        notifySuccess("Dish added successfully");
        onClose();
      } else {
        throw new Error("Failed to add dish");
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to add dish");
    } finally {
      setLoading(false);
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
            <h2 className="text-2xl font-bold text-white">Add Dish</h2>
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
                step="0.1"
                onChange={(e) =>
                  setRating(
                    e.target.value === "" ? "" : parseFloat(e.target.value)
                  )
                }
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="category"
                  value="Veg"
                  checked={category === "Veg"}
                  onChange={() => setCategory("Veg")}
                  className="w-5 h-5 accent-amber-500"
                />
                Veg
              </label>

              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="category"
                  value="Non-Veg"
                  checked={category === "Non-Veg"}
                  onChange={() => setCategory("Non-Veg")}
                  className="w-5 h-5 accent-amber-500"
                />
                Non-Veg
              </label>
              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="category"
                  value="Beverage"
                  checked={category === "Beverage"}
                  onChange={() => setCategory("Beverage")}
                  className="w-5 h-5 accent-amber-500"
                />
                Beverage
              </label>
              <label className="flex items-center gap-2 text-white">
                <input
                  type="radio"
                  name="category"
                  value="Shake"
                  checked={category === "Shake"}
                  onChange={() => setCategory("Shake")}
                  className="w-5 h-5 accent-amber-500"
                />
                Shake
              </label>
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
                className="accent-amber-500 w-5 h-5 text-amber-500 focus:ring-amber-500 border-gray-300 rounded"
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
                  "Add Dish"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddDishModal;
