import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCounters } from "../slices/counterSlice";
import { Store, PlusCircle, Edit2, Trash2, Users } from "lucide-react";
import { motion } from "framer-motion";
import AddCounterModal from "../components/AddCounterModal";
import EditCounterModal from "../components/EditCounterModal";
import { notifyError, notifySuccess } from "../App";

const AdminCounters = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const [merchantsList, setMerchantsList] = useState([]);
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

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${VITE_BACKEND_URL}/user/list/merchants`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.status === 200) {
          setMerchantsList(response.data);
        }
      } catch (error) {
        console.error("Error fetching merchants:", error.message);
      }
    };

    fetchMerchants();
    return () => setMerchantsList([]);
  }, []);


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
    return () => dispatch(setCounters([]));
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
      const token = localStorage.getItem("token");
      await axios.delete(`${VITE_BACKEND_URL}/counter/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setCounters(counters.filter((counter) => counter._id !== id)));
      notifySuccess("Counter deleted successfully");
    } catch (err) {
      console.error(err);
      notifyError("Failed to delete counter");
    }
  };

  const handleAddCounter = (newCounter) => {
    const counter = {
      ...newCounter,
        merchants: merchantsList.filter((merchant) =>
          newCounter.merchants.includes(merchant._id)
        ),
    };
    dispatch(setCounters([...counters, counter]));
  };

  const handleEditCounter = (updatedCounter) => {
    const updatedCounters = {...updatedCounter,
      merchants: merchantsList.filter((merchant) =>
        updatedCounter.merchants.includes(merchant._id)
      ),
    }
    dispatch(
      setCounters(
        counters.map((counter) =>
          counter._id === updatedCounter._id ? updatedCounters : counter
        )
      )
    );
  };

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-900">
      {loadingModalBg && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
      )}

      <div className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
              Administration
            </h3>
            <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-4">
              <Store className="w-10 h-10" />
              Counter Management
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start mb-8"
          >
            <button
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-sm flex items-center gap-2 transition-colors"
              onClick={() => {
                setIsModalOpen(true);
                setLoadingModalBg(true);
              }}
            >
              <PlusCircle className="w-5 h-5" />
              Add Counter
            </button>
          </motion.div>

          {counters.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No counters found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {counters.map((counter, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={counter._id}
                  className="bg-black p-6 rounded-sm hover:bg-neutral-800 transition-colors"
                >
                  <h2 className="text-2xl font-bold text-white mb-3">
                    {counter.name}
                  </h2>
                  <p className="text-neutral-400 mb-4">{counter.description}</p>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-amber-500 mb-2">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">Merchants</span>
                    </div>
                    <div className="text-neutral-400 text-sm">
                      {counter.merchants.length > 0 ? (
                        counter.merchants.map((merchant, index) => (
                          <span key={merchant._id}>
                            {merchant.name}
                            {index < counter.merchants.length - 1 && ", "}
                          </span>
                        ))
                      ) : (
                        <span className="text-neutral-500">
                          No merchants available
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setSelectedCounter(counter);
                        setLoadingModalBg(true);
                      }}
                      className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(counter._id)}
                      className="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 rounded-sm flex items-center justify-center gap-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </motion.div>
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
    </div>
  );
};

export default AdminCounters;
