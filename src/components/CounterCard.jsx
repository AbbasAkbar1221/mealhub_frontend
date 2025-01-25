import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CounterCard = () => {
  const [counters, setCounters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await axios.get('http://localhost:8000/counter'); 
        console.log(response);
        
        if (!response.status === 200) {
          throw new Error('Failed to fetch counters');
        }
        setCounters(response.data); 
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Restaurant Counters</h2>
      <ul className="space-y-4">
        {counters.map((counter) => (
          <li
            key={counter._id}
            className="flex flex-col items-start p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <span className="text-xl font-medium">{counter.name}</span>
            <span className="text-sm text-gray-500 mt-2">{counter.description}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  
};

export default CounterCard;
