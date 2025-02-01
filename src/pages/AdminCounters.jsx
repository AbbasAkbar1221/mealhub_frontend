// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { CircularProgress } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { setCounters } from "../slices/counterSlice";
// import AddCounterModal from "../components/AddCounterModal";
// import EditCounterModal from "../components/EditCounterModal";

// const AdminCounters = () => {
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCounter, setSelectedCounter] = useState(null);
//   const [loadingModalBg, setLoadingModalBg] = useState(false);
//   const counters = useSelector((state) => state.counter.counters);
//   const dispatch = useDispatch();
//   const [merchantsList, setMerchantsList] = useState([]);

//   useEffect(() => {
//     if (selectedCounter || isModalOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, [isModalOpen, selectedCounter]);

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
//           console.log("list of merchants", response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching merchants:", error.message);
//       }
//     };

//     fetchMerchants();
//     return () => setMerchantsList([]);
//   }, []);

//   useEffect(() => {
//     const fetchCounters = async () => {
//       const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         dispatch(setCounters(response.data));
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setLoading(false);
//       }
//     };

//     fetchCounters();
//     return () => dispatch(setCounters([]));
//   }, [dispatch]);

//   const handleDelete = async (id) => {
//     try {
//       const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//       const token = localStorage.getItem("token");
//       await axios.delete(`${VITE_BACKEND_URL}/counter/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       dispatch(setCounters(counters.filter((counter) => counter._id !== id)));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleAddCounter = (newCounter) => {
//     const updatedCounters = {
//       ...newCounter,
//       merchants: merchantsList.filter((merchant) =>
//         newCounter.merchants.includes(merchant._id)
//       ),
//     };
//     dispatch(setCounters([...counters, updatedCounters]));
//   };

//   const handleEditCounter = (updatedCounter) => {
//     const updatedCounters = {
//       ...updatedCounter,
//       merchants: merchantsList.filter((merchant) =>
//         updatedCounter.merchants.includes(merchant._id)
//       ),
//     };
//     dispatch(
//       setCounters(
//         counters.map((counter) =>
//           counter._id === updatedCounter._id ? updatedCounters : counter
//         )
//       )
//     );
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <CircularProgress size={60} color="inherit" className="text-black" />
//       </div>
//     );

//   return (
//     <div>
//       {loadingModalBg && (
//         <div className="fixed opacity-30 h-[100vh] w-[100vw]  bg-black z-[100]"></div>
//       )}
//       <div className="p-6 min-h-screen bg-white text-gray-800">
//         <h1 className="text-4xl font-bold text-center mb-8">Counters</h1>

//         <div className="flex justify-start mb-6">
//           <button
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300"
//             onClick={() => {
//               setIsModalOpen(true), setLoadingModalBg(true);
//             }}
//           >
//             Add Counter
//           </button>
//         </div>

//         {counters.length === 0 ? (
//           <p className="text-center text-gray-600">No counters found.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {counters.map((counter) => (
//               <div
//                 key={counter._id}
//                 className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-200"
//               >
//                 <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//                   {counter.name}
//                 </h2>
//                 <p className="text-gray-600 mb-4">{counter.description}</p>
//                 <p className="text-gray-700 font-medium mb-3 inline-block">
//                   Merchants:
//                 </p>
//                 <div className="text-gray-600 text-sm inline-block ml-2">
//                   {counter.merchants.length > 0 ? (
//                     counter.merchants.map((merchant, index) => (
//                       <span key={merchant._id}>
//                         {merchant.name}
//                         {index < counter.merchants.length - 1 && ", "}
//                       </span>
//                     ))
//                   ) : (
//                     <span className="text-gray-400">
//                       No merchants available
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex justify-between items-center">
//                   <button
//                     onClick={() => {
//                       setSelectedCounter(counter), setLoadingModalBg(true);
//                     }}
//                     className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(counter._id)}
//                     className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//         {isModalOpen && (
//           <AddCounterModal
//             onClose={() => {
//               setIsModalOpen(false);
//               setLoadingModalBg(false);
//             }}
//             onAddCounter={handleAddCounter}
//           />
//         )}

//         {selectedCounter && (
//           <EditCounterModal
//             counter={selectedCounter}
//             onClose={() => {
//               setSelectedCounter(null);
//               setLoadingModalBg(false);
//             }}
//             onUpdateCounter={handleEditCounter}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminCounters;

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
