import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage"
import ProfilePage from "./pages/ProfilePage";
import DishCard from "./components/DishCard";
import CounterCard from "./components/CounterCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser, setLoading } from "./slices/authSlice";
import { setCart } from "./slices/cartSlice";
import CircularProgress from "@mui/material/CircularProgress";
import MerchantPanel from "./pages/MerchantPanel";
import AdminUsers from "./pages/AdminUsers";
import AdminCounters from "./pages/AdminCounters";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";


const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const loading  = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(setLoading(true));
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${VITE_BACKEND_URL}/cart/users/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCurrentUser(response.data));
        dispatch(setLoading(false));
        
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
      
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      dispatch(setLoading(true));
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${VITE_BACKEND_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setCart(response.data));
      } catch (error) {
        console.error(error.message);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchCart();
    return () => dispatch(setCart([]));
  }, [user]);

  if (loading) {
    return <div className="text-center h-[100vh] p-6 flex justify-center items-center"><CircularProgress size={50} color="inherit" className="text-black" /></div>;
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
          <Route path="/myCounters" element={<MerchantPanel/>} />
          <Route path="/adminUsers" element={<AdminUsers/>} />
          <Route path="/adminCounters" element={<AdminCounters/>} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
