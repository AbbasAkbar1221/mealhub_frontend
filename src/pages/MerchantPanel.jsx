import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCounterDetails, setCounters } from "../slices/counterSlice";
import { motion } from "framer-motion";
import { Edit2, Store } from "lucide-react";
import MerchantCounterModal from "../components/MerchantCounterModal";

const MerchantPanel = () => {
  const [loading, setLoading] = useState(true);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const [loadingModalBg, setLoadingModalBg] = useState(false);
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();

   useEffect(() => {
      if (selectedCounter || showCounterModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [showCounterModal, selectedCounter]);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/counter/merchant/counter`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        dispatch(setCounters(response.data));
      } catch (error) {
        console.error("Error fetching counters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
    return () => dispatch(setCounters([]));
  }, [dispatch]);

  useEffect(() => {
    document.body.style.overflow = showCounterModal ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showCounterModal]);

  const handleEditCounter = (counter) => {
    setSelectedCounter(counter);
    dispatch(setCounterDetails(counter));
    setShowCounterModal(true);
    setLoadingModalBg(true)
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900 py-12 px-6">
       {loadingModalBg && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"></div>
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
            Merchant Dashboard
          </h3>
          <h2 className="text-4xl font-bold text-white mb-8 flex items-center justify-center gap-4">
            <Store className="w-10 h-10" /> Counters
          </h2>
        </motion.div>

        {counters.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No counters available.</p>
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
                <h2 className="text-2xl font-bold text-white mb-3">{counter.name}</h2>
                <p className="text-neutral-400 mb-4">{counter.description}</p>

                <button
                  onClick={() => handleEditCounter(counter)}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2 rounded-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {showCounterModal && (
        <MerchantCounterModal
          counter={selectedCounter}
          onClose={() => {setShowCounterModal(false);
            setLoadingModalBg(false)}
          }
        />
      )}
    </div>
  );
};

export default MerchantPanel;
