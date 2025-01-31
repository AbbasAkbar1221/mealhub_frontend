// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import CircularProgress from "@mui/material/CircularProgress";
// import Box from "@mui/material/Box";

// const AddCounterModal = ({ onClose, onAddCounter }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [merchantsList, setMerchantsList] = useState([]);
//   const [selectedMerchants, setSelectedMerchants] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   useEffect(() => {
//     const fetchMerchants = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `${VITE_BACKEND_URL}/user/list/merchants`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         if (response.status === 200) {
//           setMerchantsList(response.data);
//           console.log("list of merchants",response.data);
          
//         }
//       } catch (error) {
//         console.error("Error fetching merchants:", error.message);
//       }
//     };

//     fetchMerchants();
//     return ()=> setMerchantsList([]);
//   }, []);

//   const handleMerchantAdd = (merchantId) => {
//     if (!selectedMerchants.includes(merchantId)) {
//       setSelectedMerchants([...selectedMerchants, merchantId]);
//     }
//   };

//   const handleMerchantRemove = (merchantId) => {
//     setSelectedMerchants(selectedMerchants.filter((id) => id !== merchantId));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const newCounter = { name, description, merchants: selectedMerchants };

//       const token = localStorage.getItem("token");
//       const response = await axios.post(`${VITE_BACKEND_URL}/counter`, newCounter, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (response.status === 201) {
//         onAddCounter(response.data);
//         onClose();
//       } else {
//         throw new Error("Failed to add counter");
//       }
//     } catch (error) {
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative z-[1000]">
//       {loading && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <Box sx={{ display: "flex" }}>
//             <CircularProgress size={50} color="inherit" style={{ color: "black" }} />
//           </Box>
//         </div>
//       )}

//       <div className="fixed inset-0 flex justify-center items-center z-50 mt-10">
//         <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
//           <div className="bg-white p-6 rounded-2xl w-96 max-h-[75vh] overflow-y-auto">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Counter</h2>

//             <form onSubmit={handleSubmit} className="space-y-3">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name
//                 </label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <input
//                   type="text"
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   required
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Merchants
//                 </label>
//                 <select
//                   className="text-black w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   onChange={(e) => handleMerchantAdd(e.target.value)}
//                 >
//                   <option value="">Select Merchant</option>
//                   {merchantsList.length > 0 ? (
//                     merchantsList.map((merchant) => (
//                       <option key={merchant._id} value={merchant._id}>
//                         {merchant.name}
//                       </option>
//                     ))
//                   ) : (
//                     <option disabled>No merchants available</option>
//                   )}
//                 </select>
//               </div>

//               <div className="mt-2">
//                 <h3 className="font-medium text-gray-700">Selected Merchants</h3>
//                 <ul>
//                   {selectedMerchants.length > 0 ? (
//                     selectedMerchants.map((merchantId) => {
//                       const merchant = merchantsList.find((m) => m._id === merchantId);
//                       return merchant ? (
//                         <li
//                           key={merchantId}
//                           className="flex justify-between items-center border p-2 rounded-lg bg-gray-100 mt-1"
//                         >
//                           <span className="text-black">{merchant.name}</span>
//                           <button
//                             type="button"
//                             onClick={() => handleMerchantRemove(merchantId)}
//                             className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600"
//                           >
//                             Remove
//                           </button>
//                         </li>
//                       ) : null;
//                     })
//                   ) : (
//                     <li className="text-gray-500">No merchants selected</li>
//                   )}
//                 </ul>
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   {loading ? "Adding..." : "Add Counter"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCounterModal;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { X, Plus, Store, Trash2 } from "lucide-react";

const AddCounterModal = ({ onClose, onAddCounter }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
        merchants: selectedMerchants,
      };

      const token = localStorage.getItem("token");
      const response = await axios.post(`${VITE_BACKEND_URL}/counter`, newCounter, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 201) {
        onAddCounter(response.data);
        onClose();
      } else {
        throw new Error("Failed to add counter");
      }
    } catch (error) {
      console.error(error.message);
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
