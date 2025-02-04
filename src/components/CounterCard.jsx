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
                src={counter.image}
                alt={counter.name}
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
