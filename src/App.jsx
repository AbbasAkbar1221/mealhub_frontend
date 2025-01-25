import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import DishCard from './components/DishCard';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div className=""> 
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/dishes/:counterId" element={<DishCard/>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
