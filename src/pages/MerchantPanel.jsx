// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector, useDispatch } from "react-redux";
// import { setCounterDetails, setCounters } from "../slices/counterSlice";
// import CircularProgress from "@mui/material/CircularProgress";
// import CounterModal from "../components/MerchantCounterModal"; 

// const MerchantPanel = () => {
//   const [loading, setLoading] = useState(true);
//   const [showCounterModal, setShowCounterModal] = useState(false);
//   const [selectedCounter, setSelectedCounter] = useState(null);
//   const counters = useSelector((state) => state.counter.counters);
//   const [loadingModalBg, setLoadingModalBg] = useState(false);
//   const dispatch = useDispatch();

//   function makeLoadingFalse() {
//     setLoadingModalBg(false);
//   }

//   useEffect(() => {
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//     const fetchCounters = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${VITE_BACKEND_URL}/cart/merchant/counter`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.status === 200) {
//           dispatch(setCounters(response.data));
//         } else {
//           throw new Error("Failed to fetch counters");
//         }
//       } catch (error) {
//         console.log(error);
        
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounters();
//     return () => dispatch(setCounters([]));
//   }, []);

//   useEffect(() => {
//       if (selectedCounter || showCounterModal) {
//         document.body.style.overflow = "hidden"; 
//       } else {
//         document.body.style.overflow = "auto";
//       }
  
//       return () => {
//         document.body.style.overflow = "auto";
//       };
//     }, [selectedCounter,showCounterModal]); 

//   const handleEditCounter = (counter) => {
//     setSelectedCounter(counter);
//     dispatch(setCounterDetails(counter));
//     setShowCounterModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowCounterModal(false);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-opacity-50 z-50">
//         <CircularProgress size={50} color="inherit" style={{ color: "black" }} />
//       </div>
//     );
//   }

 

//   return (
//     <div className="min-h-screen bg-gray-100 py-8 px-4">
//       <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Counters</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//         {counters.map((counter) => (
//           <div
//             key={counter._id}
//             className="flex flex-col items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
//           >
//             <h3 className="text-xl font-semibold text-gray-900">{counter.name}</h3>
//             <p className="my-3 text-sm font-semibold text-gray-700">{counter.description}</p>
//             <button
//               onClick={() => handleEditCounter(counter)}
//               className="mt-3 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div>

//       {showCounterModal && (
//         <CounterModal
//           counter={selectedCounter}
//           onClose={handleCloseModal}
//           loadingModalBg={loadingModalBg}
//           setLoadingModalBg={makeLoadingFalse}
//         />
//       )}
//     </div>
//   );
// };

// export default MerchantPanel;



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setCounterDetails, setCounters } from "../slices/counterSlice";
import { motion } from "framer-motion";
import { Edit2, Store } from "lucide-react";
import MerchantCounterModal from "../components/MerchantCounterModal";
import { notifyError, notifySuccess } from "../App";

const MerchantPanel = () => {
  const [loading, setLoading] = useState(true);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [selectedCounter, setSelectedCounter] = useState(null);
  const counters = useSelector((state) => state.counter.counters);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/cart/merchant/counter`,
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
          onClose={() => setShowCounterModal(false)}
        />
      )}
    </div>
  );
};

export default MerchantPanel;
