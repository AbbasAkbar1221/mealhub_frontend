import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCounterDetails, setDishesOfCounter } from "../slices/counterSlice";
import EditDishModal from "./EditDishModal";
import CircularProgress from "@mui/material/CircularProgress";
import Card from "./Card";


const DishCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const counterDetails = useSelector((state) => state.counter.details);
  const dishes = useSelector((state) => state.counter.dishes);
  const [selectedDish, setSelectedDish] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  function makeLoadingFalse() {
    setLoadingModalBg(false);
  }
  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/dish`, {
          params: { counterId },
        });
        if (response.status === 200) {
          dispatch(setDishesOfCounter(response.data));
        } else {
          throw new Error("Failed to fetch dishes");
        }
      } catch (error) {
        setError(error.message);
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
        const response = await axios.get(`${VITE_BACKEND_URL}/counter/${counterId}`, {
        });
        if (response.status === 200) {
          dispatch(setCounterDetails(response.data));
        } else {
          throw new Error("Failed to fetch counter");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounter();
    return () => dispatch(setCounterDetails([]));
  }, [counterId]);


  const handleEditDish = (dish) => {
    setSelectedDish(dish);
    setLoadingModalBg(true);
  };

  if (loading) {
    return (
      <div className="text-center h-[100vh] p-6 flex justify-center items-center">
        <CircularProgress size={50} color="inherit" className="text-black" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <>
      {loadingModalBg && (
        <div className="fixed opacity-30 h-[100vh] w-[100vw]  bg-black z-[100]"></div>
      )}
      <div className="container mx-auto p-6 max-w-screen-lg z-30">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Dishes
        </h2>

        {counterDetails && (
          <div className="counter-details mb-6">
            <h3 className="text-xl font-medium text-gray-800">
              Counter Name: {counterDetails.name}
            </h3>
          </div>
        )}

        <ul className="space-y-6">
          {dishes.map((dish) => (
            <Card
              key={dish._id}
              dish={dish}
              setLoadingModalBg={setLoadingModalBg}
              onEdit={handleEditDish}
            />
          ))}
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
      </div>
    </>
  );
};

export default DishCard;
