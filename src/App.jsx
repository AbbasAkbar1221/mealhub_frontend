import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import DishCard from "./components/DishCard";
import CounterCard from "./components/CounterCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCurrentUser, setLoading } from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import MerchantPanel from "./pages/MerchantPanel";


const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     dispatch(setLoading(true));
  //     try {
  //       const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  //       const response = await axios.get(`${VITE_BACKEND_URL}/cart/users/me`);
  //       // console.log("user", response.data);

  //       dispatch(setCurrentUser(response.data));
  //       dispatch(setLoading(false));
  //     } catch (err) {
  //       console.error("Failed to fetch user details:", err);
  //     }
  //   };
  //   fetchUserDetails();
  // }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${VITE_BACKEND_URL}/cart`);
        dispatch(setCart(response.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) {
    return <div className="text-center h-[100vh] p-6 flex justify-center items-center"><CircularProgress size={50} color="inherit" className="text-black" /></div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <Router>
      <Navbar />
      <div className="bg-black opacity-50"></div>
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterCard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dishes/:counterId" element={<DishCard />} />
          <Route path="/merchants" element={<MerchantPanel/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
