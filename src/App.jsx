import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
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
import { Auth } from "./components/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const loading = useSelector((state) => state.auth.loading);
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

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-900 flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <Router>
      <Navbar />
      <div className="bg-black opacity-50"></div>
      <div className="">
        <ToastContainer/>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route element={<Auth />}>
            <Route path="/counter" element={<CounterCard />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/dishes/:counterId" element={<DishCard />} />
            <Route path="/myCounters" element={<MerchantPanel />} />
            <Route path="/adminUsers" element={<AdminUsers />} />
            <Route path="/adminCounters" element={<AdminCounters />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


export const notifySuccess = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",  
    className: "bg-green-500 text-white border-2 border-green-700",
    bodyClassName: "text-white font-semibold",
  });
};

export const notifyError = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className: "bg-red-500 text-white border-2 border-red-700", 
    bodyClassName: "text-white font-semibold",
  });
};