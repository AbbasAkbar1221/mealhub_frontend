import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../slices/counterSlice";
import AddCounterModal from "../components/AddCounterModal";

const AdminCounters = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();

useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]); 

  useEffect(() => {
    const fetchCounters = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/counter`);
        dispatch(setCounters(response.data));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCounters();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      await axios.delete(`${VITE_BACKEND_URL}/counter/${id}`);
      dispatch(setCounters(counters.filter((counter) => counter._id !== id)));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddCounter = (newCounter) => {
    dispatch(setCounters([...counters, newCounter]));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={60} color="inherit" className="text-black" />
      </div>
    );

  if (error)
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;

  return (
    <div>
      {loadingModalBg && (
        <div className="fixed opacity-30 h-[100vh] w-[100vw]  bg-black z-[100]"></div>
      )}
      <div className="p-6 min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-center mb-8">Counters</h1>

        <div className="flex justify-start mb-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
            onClick={() => {
              setIsModalOpen(true), setLoadingModalBg(true);
            }}
          >
            Add Counter
          </button>
        </div>

        {counters.length === 0 ? (
          <p className="text-center text-gray-400">No counters found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <div
                key={counter._id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold mb-4">{counter.name}</h2>
                <p className="text-gray-400 mb-6">{counter.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      alert("Edit functionality not implemented yet")
                    }
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(counter._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {isModalOpen && (
          <AddCounterModal
            onClose={() => {
              setIsModalOpen(false);
              setLoadingModalBg(false);
            }}
            onAddCounter={handleAddCounter}
            setLoadingModalBg={() => {
              setLoadingModalBg(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCounters;
