import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCounterDetails, setCounters } from "../slices/counterSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CounterCard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counter.counters);

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const fetchCounters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch counters");
        }
        dispatch(setCounters(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
    ()=> dispatch(setCounters([]));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0  bg-opacity-50 z-50">
        <CircularProgress
          size={50}
          color="inherit"
          style={{ color: "black" }}
        />
      </div>
    );
  }

  

  const handleCounterClick = (counter) => {
    dispatch(setCounterDetails(counter));
    navigate(`/dishes/${counter._id}`);
  };

return (
  <div className="min-h-screen bg-gray-100 py-8 px-4">
    <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
      Restaurant Counters
    </h2>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {counters.map((counter) => (
        <li
          key={counter._id}
          onClick={() => handleCounterClick(counter)}
          className="flex flex-col items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        >
          <span className="text-xl font-semibold text-gray-900">
            {counter.name}
          </span>
          <span className="mt-3 text-sm font-semibold text-gray-700">
            {counter.description}
          </span>
          <div className="mt-3 text-sm text-gray-600">
            <strong className="text-gray-800">Merchants:</strong>
            {counter.merchants.length > 0 ? (
              counter.merchants.map((merchant, index) => (
                <span key={merchant._id} className="ml-2">
                  {merchant.name}
                  {index < counter.merchants.length - 1 && ", "}
                </span>
              ))
            ) : (
              <span className="text-gray-500">No merchants available</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}

export default CounterCard;
