import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AddCounterModal = ({ onClose, onAddCounter, setLoadingModalBg }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [merchants, setMerchants] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const merchantIds = merchants
        .split(",")
        .map((id) => id.trim())
        .filter((id) => id);

      const newCounter = { name, description, merchants: merchantIds };
      const response = await axios.post(`${VITE_BACKEND_URL}/counter`, newCounter);

      if (response.status === 201) {
        onAddCounter(response.data); // Update counters in AdminCounters
        onClose(); // Close the modal
      } else {
        throw new Error("Failed to add counter");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-[1000]">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Box sx={{ display: "flex" }}>
            <CircularProgress size={50} color="inherit" style={{ color: "black" }} />
          </Box>
        </div>
      )}

      <div className="fixed inset-0 flex justify-center items-center z-50 mt-10">
        <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
          <div className="bg-white p-6 rounded-2xl w-96 max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Counter</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Merchants (Comma-Separated IDs)
                </label>
                <input
                  type="text"
                  value={merchants}
                  onChange={(e) => setMerchants(e.target.value)}
                  className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="e.g., 123, 456, 789"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  {loading ? "Adding..." : "Add Counter"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCounterModal;
