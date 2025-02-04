import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCounterDetails, setDishesOfCounter } from "../slices/counterSlice";
import { removeProduct } from "../slices/cartSlice";
import axios from "axios";
import { Plus, ChefHat } from "lucide-react";
import EditDishModal from "./EditDishModal";
import AddDishModal from "./AddDishModal";
import Card from "./Card";
import { motion } from "framer-motion";
import { notifyError, notifySuccess } from "../App";

const DishCard = () => {
  const [loading, setLoading] = useState(true);
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const counterDetails = useSelector((state) => state.counter.currentCounter);
  const user = useSelector((state) => state.auth.currentUser);
  const dishes = useSelector((state) => state.counter.dishes);
  const [selectedDish, setSelectedDish] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const [showAddDishModal, setShowAddDishModal] = useState(false);

  const isMerchant = counterDetails?.merchants?.some(
    (merchant) => merchant._id.toString() === user?._id?.toString()
  );
  
  function makeLoadingFalse() {
    setLoadingModalBg(false);
  }

  useEffect(() => {
    if (selectedDish || showAddDishModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedDish, showAddDishModal]);

  
  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchDishes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/dish`, {
          params: { counterId },
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status === 200) {
          dispatch(setDishesOfCounter(response.data));
        } else {
          throw new Error("Failed to fetch dishes");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
    return () => dispatch(setDishesOfCounter([]));
  }, [counterId]);

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchCounter = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${VITE_BACKEND_URL}/counter/${counterId}`, {
          headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          dispatch(setCounterDetails(response.data));
        } else {
          throw new Error("Failed to fetch counter");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
    return () => dispatch(setCounterDetails([]));
  }, []);

  const handleDeleteDish = async (dish) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.delete(
        `${VITE_BACKEND_URL}/dish/${dish._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        dispatch(setDishesOfCounter(dishes.filter((item) => item._id !== dish._id)));
        dispatch(removeProduct(dish._id));
        notifySuccess("Dish deleted successfully");
      } else {
        throw new Error("Failed to delete dish");
      }
    } catch (error) {
      console.error("Error:", error.message);
      notifyError("Failed to delete dish");
    } finally {
      setLoading(false);
    }
  };

  const handleEditDish = (dish) => {
    setSelectedDish(dish);
    setLoadingModalBg(true);
  };

  const handleAddDish = () => {
    setLoadingModalBg(true);
    setShowAddDishModal(true);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-neutral-900">
      {loadingModalBg && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"></div>
      )}
      
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <ChefHat className="w-10 h-10 text-amber-500 mr-3" />
            <h2 className="text-5xl font-bold text-white">
              {counterDetails?.name || "Our Menu"}
            </h2>
          </div>
          <p className="text-neutral-400 text-lg mt-4 mb-6">
            Discover our carefully curated selection of delicious dishes
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-600 to-amber-500 mx-auto"></div>
        </motion.div>

        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {isMerchant && (
          <button
            onClick={() => handleAddDish()}
            className="group flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-sm transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg"
          >
            <Plus size={20} className="group-hover:rotate-90 transition-transform duration-300" />
            Add New Dish
          </button>
          )}
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {dishes.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
              <ChefHat className="w-16 h-16 text-neutral-700 mb-4" />
              <p className="text-2xl text-neutral-400 mb-2">No dishes available yet</p>
              <p className="text-neutral-600">Start by adding your first dish to the menu</p>
            </div>
          ) : (
            dishes.map((dish, index) => (
              <motion.div
                key={dish._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <Card
                  dish={dish}
                  onEdit={handleEditDish}
                  onDelete={handleDeleteDish}
                  isMerchant={isMerchant}
                  setLoading={setLoading}
                />
              </motion.div>
            ))
          )}
        </motion.div>

        {selectedDish && (
          <EditDishModal
            dish={selectedDish}
            loadingModalBg={loadingModalBg}
            setLoadingModalBg={makeLoadingFalse}
            onClose={() => {
              setSelectedDish(null);
              makeLoadingFalse();
            }}
          />
        )}

        {showAddDishModal && (
          <AddDishModal
            counterId={counterId}
            setLoadingModalBg={makeLoadingFalse}
            onClose={() => {
              setShowAddDishModal(false);
              makeLoadingFalse();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DishCard;