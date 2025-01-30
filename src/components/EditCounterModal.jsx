import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const EditCounterModal = ({ counter, onClose, onUpdateCounter }) => {
  const counterId = counter._id;
  const [name, setName] = useState(counter.name);
  const [description, setDescription] = useState(counter.description);
  const [merchants, setMerchants] = useState("");
  const [merchantsList, setMerchantsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMerchants, setSelectedMerchants] = useState(
    counter.merchants || []
  );

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
      const updatedCounter = {
        name,
        description,
        merchants: selectedMerchants,
      };

      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/counter/${counterId}`,
        updatedCounter,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        onUpdateCounter(response.data);
        onClose();
      } else {
        throw new Error("Failed to update counter");
      }
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-[1000]">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <Box sx={{ display: "flex" }}>
            <CircularProgress
              size={50}
              color="inherit"
              style={{ color: "black" }}
            />
          </Box>
        </div>
      )}

      <div className="fixed inset-0 flex justify-center items-center z-50 mt-10">
        <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
          <div className="bg-white p-6 rounded-2xl w-96 max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Edit Counter
            </h2>

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
                  Merchants
                </label>
                <select
                  className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onChange={(e) => handleMerchantAdd(e.target.value)}
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

                <ul>
                  {selectedMerchants.length > 0 ? (
                    selectedMerchants.map((merchant) => (
                      <li
                        key={merchant._id}
                        className="flex justify-between items-center border p-2 rounded-lg bg-gray-100 mt-1"
                      >
                        <span className="text-black">{merchant.name}</span>
                        <button
                          type="button"
                          onClick={() => handleMerchantRemove(merchant._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
                        >
                          <span className="material-icons-outlined">delete</span>
                        </button>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No merchants selected</li>
                  )}
                </ul>
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
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCounterModal;