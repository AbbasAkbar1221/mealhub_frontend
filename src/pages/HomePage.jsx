import React from 'react';
import CounterCard from '../components/CounterCard';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Welcome to MealHub</h1>
        <CounterCard/>
      </div>
    </div>
  );
};

export default HomePage;
