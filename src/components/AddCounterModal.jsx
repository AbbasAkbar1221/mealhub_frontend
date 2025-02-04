import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X, Store, Trash2 } from "lucide-react";
import { notifySuccess, notifyError } from "../App";

const AddCounterModal = ({ onClose, onAddCounter }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=600");
  const [merchantsList, setMerchantsList] = useState([]);
  const [selectedMerchants, setSelectedMerchants] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleMerchantAdd = (merchantId) => {
    const merchant = merchantsList.find((m) => String(m._id) === String(merchantId));
    if (merchant && !selectedMerchants.some((m) => m._id === merchantId)) {
      setSelectedMerchants([...selectedMerchants, merchant]);
    }
  };

  const handleMerchantRemove = (merchantId) => {
    setSelectedMerchants(selectedMerchants.filter((m) => m._id !== merchantId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newCounter = {
        name,
        description,
        image,
        merchants: selectedMerchants,
      };

      if (newCounter.merchants.length === 0) {
        notifyError("A counter must have at least one merchant.");
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(`${VITE_BACKEND_URL}/counter`, newCounter, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        onAddCounter(response.data);
        notifySuccess("Counter added successfully");
        onClose();
      } else {
        throw new Error("Failed to add counter");
      }
    } catch (error) {
      console.error(error.message);
      notifyError("Failed to add counter");
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
            <div className="flex items-center gap-3">
              <Store className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-white">Add Counter</h2>
            </div>
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
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-neutral-300">
                Image
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                required
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-neutral-300">
                Merchants
              </label>
              <select
                className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                onChange={(e) => handleMerchantAdd(e.target.value)}
                value=""
              >
                <option value="">Select Merchant</option>
                {merchantsList.length > 0 ? (
                  merchantsList.map((merchant) => (
                    <option key={merchant._id} value={merchant._id}>
                      {merchant.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No merchants available</option>
                )}
              </select>

              <div className="space-y-2">
                {selectedMerchants.length > 0 ? (
                  selectedMerchants.map((merchant) => (
                    <div
                      key={merchant._id}
                      className="flex items-center justify-between bg-black px-4 py-2 rounded-sm border border-neutral-800"
                    >
                      <span className="text-white">{merchant.name}</span>
                      <button
                        type="button"
                        onClick={() => handleMerchantRemove(merchant._id)}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-neutral-500 text-sm">No merchants selected</p>
                )}
              </div>
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
                {loading ? "Adding..." : "Add Counter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddCounterModal;
