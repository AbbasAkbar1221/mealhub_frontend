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
import {setCurrentUser, setLoading} from "./slices/authSlice"

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserDetails = async () => {
      dispatch(setLoading(true));
      try {
        const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await axios.get(`${VITE_BACKEND_URL}/cart/users/me`);
        // console.log("user", response.data);

        dispatch(setCurrentUser(response.data));
        dispatch(setLoading(false));
      } catch (err) {
        console.error("Failed to fetch user details:", err);
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <Router>
      <Navbar />
      <div className="">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterCard />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dishes/:counterId" element={<DishCard />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
