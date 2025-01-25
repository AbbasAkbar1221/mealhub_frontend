import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DishCard = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { counterId } = useParams();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/dish", {
            params: {counterId}
        });
        console.log(response);

        if (!response.status === 200) {
          throw new Error("Failed to fetch dishes");
        }
        setDishes(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [counterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Dishes</h2>
      <ul className="space-y-4">
        {dishes.map((dish) => (
          <li 
            key={dish._id}
            className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            <h3 className="text-xl font-medium">{dish.name}</h3>
            <p className="text-sm text-gray-500 mt-2"> ₹{dish.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishCard;
