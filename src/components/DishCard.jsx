import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCounterDetails, setDishesOfCounter } from "../slices/counterSlice";
import EditDishModal from "./EditDishModal";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";
import AddDishModal from "./AddDishModal";
import { removeProduct } from "../slices/cartSlice";

const DishCard = () => {
  const [loading, setLoading] = useState(true);
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const counterDetails = useSelector((state) => state.counter.currentCounter);
  const dishes = useSelector((state) => state.counter.dishes);
  const [selectedDish, setSelectedDish] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const [showAddDishModal, setShowAddDishModal] = useState(false);
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
        `${VITE_BACKEND_URL}/dish/${dish._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        dispatch(
          setDishesOfCounter(dishes.filter((item) => item._id !== dish._id))
        );
        dispatch(removeProduct(dish._id));
      } else {
        throw new Error("Failed to delete dish");
      }
    } catch (error) {
      console.error("Error:", error.message);
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
      <div className="text-center h-[100vh] p-6 flex justify-center items-center">
        <CircularProgress size={50} color="inherit" className="text-black" />
      </div>
    );
  }


  return (
    <div className="bg-gray-100 h-[100vh]">
      {loadingModalBg && (
        <div className="fixed opacity-30 h-[100vh] w-[100vw]  bg-black z-[100]"></div>
      )}
      <div className="container mx-auto p-6 max-w-screen-lg z-30 ">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Dishes
        </h2>

        <div className="flex justify-start mb-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={() => handleAddDish()}
          >
            Add Dishes
          </button>
        </div>

        {counterDetails && (
          <div className="counter-details mb-6">
            <h3 className="text-xl font-medium text-gray-900">
              Counter Name: {counterDetails.name}
            </h3>
          </div>
        )}

        <ul className="space-y-6">
          {dishes.length === 0 ? ( <p className="text-2xl text-center text-gray-800">No dishes found.</p>):(
          dishes.map((dish) => (
            // dish._id!== null && (
            <Card
              key={dish._id}
              dish={dish}
              setLoadingModalBg={setLoadingModalBg}
              onEdit={handleEditDish}
              onDelete={handleDeleteDish}
            />
          )))}
          
        </ul>

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
