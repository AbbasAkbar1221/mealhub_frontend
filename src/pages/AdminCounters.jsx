import React, { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../slices/counterSlice";
import AddCounterModal from "../components/AddCounterModal";
import EditCounterModal from "../components/EditCounterModal";

const AdminCounters = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCounter || isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen, selectedCounter]);

  useEffect(() => {
    const fetchCounters = async () => {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCounters(response.data));
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCounters();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.delete(`${VITE_BACKEND_URL}/counter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCounters(counters.filter((counter) => counter._id !== id)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCounter = (newCounter) => {
    dispatch(setCounters([...counters, newCounter]));
  };

  const handleEditCounter = (updatedCounter) => {
    dispatch(
      setCounters(
        counters.map((counter) =>
          counter._id === updatedCounter._id ? updatedCounter : counter
        )
      )
    );
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress size={60} color="inherit" className="text-black" />
      </div>
    );

  

  return (
    <div>
      {loadingModalBg && (
        <div className="fixed opacity-30 h-[100vh] w-[100vw]  bg-black z-[100]"></div>
      )}
      <div className="p-6 min-h-screen bg-white text-gray-800">
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
          <p className="text-center text-gray-600">No counters found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {counters.map((counter) => (
              <div
                key={counter._id}
                className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
              >
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">{counter.name}</h2>
                <p className="text-gray-600 mb-6">{counter.description}</p>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      setSelectedCounter(counter), setLoadingModalBg(true);
                    }}
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
          />
        )}

        {selectedCounter && (
          <EditCounterModal
            counter={selectedCounter}
            onClose={() => {
              setSelectedCounter(null);
              setLoadingModalBg(false);
            }}
            onUpdateCounter={handleEditCounter}
          />
        )}
      </div>
    </div>
  );
};

export default AdminCounters;
