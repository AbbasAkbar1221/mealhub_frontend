// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setCounters } from "../slices/counterSlice";
// import CircularProgress from "@mui/material/CircularProgress";

// const CounterModal = ({
//   counter,
//   onClose,
//   loadingModalBg,
//   setLoadingModalBg,
// }) => {
//   const [counterName, setCounterName] = useState(counter ? counter.name : "");
//   const [counterDes, setCounterDes] = useState(
//     counter ? counter.description : ""
//   );
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   const counters = useSelector((state) => state.counter.counters);
//   const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//   const handleSaveCounter = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const response = await axios.patch(
//         `${VITE_BACKEND_URL}/counter/${counter._id}`,
//         { name: counterName, description: counterDes }, {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (response.status === 200) {
//         const updatedCounters = counters.map((item) =>
//           item._id === response.data._id ? response.data : item
//         );

//         dispatch(setCounters(updatedCounters));
//         onClose();
//       } else {
//         throw new Error("Failed to save counter");
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//       setLoadingModalBg();
//     }
//   };

//   return (
//     <div className="relative z-[1000]">
//       {loading && (
//         <div className="fixed inset-0 flex justify-center items-center z-50">
//           <CircularProgress
//             size={50}
//             color="inherit"
//             style={{ color: "black" }}
//           />
//         </div>
//       )}

//       {loadingModalBg && (
//         <div
//           className="fixed inset-0 bg-black z-[100] transition-opacity duration-300"
//           style={{ opacity: 0.3 }}
//         ></div>
//       )}

//       <div className="fixed inset-0 flex justify-center items-center z-[1000] mt-10">
//         <div className="border border-black rounded-2xl p-2 bg-white shadow-lg z-50">
//           <div className="bg-white p-8 rounded-2xl w-96">
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">
//               Edit Counter
//             </h2>
            
//             <form onSubmit={handleSaveCounter} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Counter Name
//                 </label>
//                 <input
//                   type="text"
//                   value={counterName}
//                   onChange={(e) => setCounterName(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Counter Description
//                 </label>
//                 <input
//                   type="text"
//                   value={counterDes}
//                   onChange={(e) => setCounterDes(e.target.value)}
//                   className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               </div>

//               <div className="flex justify-end space-x-4">
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   onClick={handleSaveCounter}
//                   className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 >
//                   {loading ? "Saving..." : "Save"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounterModal;


import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCounters } from "../slices/counterSlice";
import CircularProgress from "@mui/material/CircularProgress";
import { notifyError, notifySuccess } from "../App";

const CounterModal = ({
  counter,
  onClose,
  loadingModalBg,
  setLoadingModalBg,
}) => {
  const [counterName, setCounterName] = useState(counter ? counter.name : "");
  const [counterDes, setCounterDes] = useState(
    counter ? counter.description : ""
  );
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counter.counters);
  const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSaveCounter = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${VITE_BACKEND_URL}/counter/${counter._id}`,
        { name: counterName, description: counterDes },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      
      if (response.status === 200) {
        const updatedCounters = counters.map((item) =>
          item._id === response.data._id ? response.data : item
        );

        dispatch(setCounters(updatedCounters));
        notifySuccess("Counter updated successfully");
        onClose();
      } else {
        throw new Error("Failed to save counter");
      }
    } catch (error) {
      console.error(error);
      notifyError("Failed to save counter");
    } finally {
      setLoading(false);
      setLoadingModalBg();
    }
  };

  return (
    <div className="relative z-[1000]">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <CircularProgress
            size={50}
            color="inherit"
            style={{ color: "white" }}
          />
        </div>
      )}

      {loadingModalBg && (
        <div
          className="fixed inset-0 bg-black z-[100] transition-opacity duration-300"
          style={{ opacity: 0.3 }}
        ></div>
      )}

      <div className="fixed inset-0 flex justify-center items-center z-[1000] mt-10">
        <div className="bg-neutral-900 rounded-sm border border-neutral-800 w-full max-w-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Edit Counter
            </h2>
            
            <form onSubmit={handleSaveCounter} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Counter Name
                </label>
                <input
                  type="text"
                  value={counterName}
                  onChange={(e) => setCounterName(e.target.value)}
                  className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-neutral-300 mb-1">
                  Counter Description
                </label>
                <input
                  type="text"
                  value={counterDes}
                  onChange={(e) => setCounterDes(e.target.value)}
                  className="w-full bg-black text-white px-4 py-3 rounded-sm border border-neutral-800 focus:outline-none focus:border-amber-500 transition-colors"
                />
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
                  onClick={handleSaveCounter}
                  className="flex-1 bg-amber-600 text-white px-4 py-3 rounded-sm hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CounterModal;