// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCounterDetails, setCounters } from "../slices/counterSlice";
// import CircularProgress from "@mui/material/CircularProgress";

// const CounterCard = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const counters = useSelector((state) => state.counter.counters);

//   useEffect(() => {
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//     const fetchCounters = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.status !== 200) {
//           throw new Error("Failed to fetch counters");
//         }
//         dispatch(setCounters(response.data));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounters();
//     ()=> dispatch(setCounters([]));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0  bg-opacity-50 z-50">
//         <CircularProgress
//           size={50}
//           color="inherit"
//           style={{ color: "black" }}
//         />
//       </div>
//     );
//   }

//   const handleCounterClick = (counter) => {
//     dispatch(setCounterDetails(counter));
//     navigate(`/dishes/${counter._id}`);
//   };

// return (
//   <div className="min-h-screen bg-gray-100 py-8 px-4">
//     <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
//       Restaurant Counters
//     </h2>
//     <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {counters.map((counter) => (
//         <li
//           key={counter._id}
//           onClick={() => handleCounterClick(counter)}
//           className="flex flex-col items-start p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
//         >
//           <span className="text-xl font-semibold text-gray-900">
//             {counter.name}
//           </span>
//           <span className="mt-3 text-sm font-semibold text-gray-700">
//             {counter.description}
//           </span>
//           <div className="mt-3 text-sm text-gray-600">
//             <strong className="text-gray-800">Merchants:</strong>
//             {counter.merchants.length > 0 ? (
//               counter.merchants.map((merchant, index) => (
//                 <span key={merchant._id} className="ml-2">
//                   {merchant.name}
//                   {index < counter.merchants.length - 1 && ", "}
//                 </span>
//               ))
//             ) : (
//               <span className="text-gray-500">No merchants available</span>
//             )}
//           </div>
//         </li>
//       ))}
//     </ul>
//   </div>
// );
// }

// export default CounterCard;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { setCounterDetails, setCounters } from "../slices/counterSlice";
// import CircularProgress from "@mui/material/CircularProgress";

// const CounterCard = () => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const counters = useSelector((state) => state.counter.counters);

//   useEffect(() => {
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
//     const fetchCounters = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (response.status !== 200) {
//           throw new Error("Failed to fetch counters");
//         }
//         dispatch(setCounters(response.data));
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCounters();
//     return () => dispatch(setCounters([]));
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50">
//         <CircularProgress
//           size={50}
//           style={{ color: "#F59E0B" }}
//         />
//       </div>
//     );
//   }

//   const handleCounterClick = (counter) => {
//     dispatch(setCounterDetails(counter));
//     navigate(`/dishes/${counter._id}`);
//   };

//   return (
//     <div className="min-h-screen bg-neutral-900 py-20">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="text-center mb-16">
//           <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
//             Our Stations
//           </h3>
//           <h2 className="text-4xl font-bold text-white mb-8">
//             RESTAURANT COUNTERS
//           </h2>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {counters.map((counter) => (
//             <div
//               key={counter._id}
//               onClick={() => handleCounterClick(counter)}
//               className="bg-black rounded-sm p-6 hover:bg-neutral-800 transition-all duration-300 cursor-pointer group"
//             >
//               <div className="flex flex-col h-full">
//                 <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors mb-4">
//                   {counter.name}
//                 </h3>

//                 <p className="text-neutral-400 text-sm mb-4 flex-grow">
//                   {counter.description}
//                 </p>

//                 <div className="mt-auto">
//                   <p className="text-white text-sm font-semibold mb-2">Merchants</p>
//                   <div className="text-neutral-400 text-sm">
//                     {counter.merchants.length > 0 ? (
//                       counter.merchants.map((merchant, index) => (
//                         <span key={merchant._id}>
//                           {merchant.name}
//                           {index < counter.merchants.length - 1 && ", "}
//                         </span>
//                       ))
//                     ) : (
//                       <span>No merchants available</span>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CounterCard;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCounterDetails, setCounters } from "../slices/counterSlice";
import CircularProgress from "@mui/material/CircularProgress";

const CounterCard = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const counters = useSelector((state) => state.counter.counters);

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const fetchCounters = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/counter`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.status !== 200) {
          throw new Error("Failed to fetch counters");
        }
        dispatch(setCounters(response.data));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
    return () => dispatch(setCounters([]));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-screen fixed top-0 left-0 bg-black bg-opacity-50 z-50">
        <CircularProgress size={50} style={{ color: "#F59E0B" }} />
      </div>
    );
  }

  const handleCounterClick = (counter) => {
    dispatch(setCounterDetails(counter));
    navigate(`/dishes/${counter._id}`);
  };

  return (
    <div className="min-h-screen bg-neutral-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
            Our Stations
          </h3>
          <h2 className="text-4xl font-bold text-white mb-8">
            RESTAURANT COUNTERS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {counters.map((counter) => (
            <div
              key={counter._id}
              onClick={() => handleCounterClick(counter)}
              className="group relative overflow-hidden rounded-sm cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 z-10"></div>

              <img 
                src="https://images.pexels.com/photos/6070968/pexels-photo-6070968.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"               
                alt="Counter background"
                className="w-full h-72 object-cover object-center group-hover:scale-110 transition-transform duration-700"
              />
              
              <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between">
                
                <div>
                  <div className="w-12 h-1 bg-amber-500 mb-4 transform origin-left group-hover:scale-x-150 transition-transform"></div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors mb-2">
                    {counter.name}
                  </h3>
                  <p className="text-neutral-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {counter.description}
                  </p>
                </div>

                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-2 text-sm text-neutral-300">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                      <span className="text-amber-500">⌘</span>
                    </div>
                    <span className="font-medium">View Menu</span>
                  </div>
                </div>
              </div>

              <div className="absolute inset-0 border border-transparent group-hover:border-amber-500/30 z-30 transition-colors duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CounterCard;
