import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDishesOfCounter } from "../slices/counterSlice";
import { setCart } from "../slices/cartSlice";
import EditDishModal from './EditDishModal';
import CircularProgress from "@mui/material/CircularProgress";

const Card = ({ dish, onEdit }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const isInCart = cartItems.some((item) => item.dish._id === dish._id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (dishId) => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const addDishToCart = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`${VITE_BACKEND_URL}/cart/${dishId}`);
        if (response.status === 201) {
          dispatch(setCart(response.data));
        } else {
          throw new Error("Failed to add dish to cart");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    addDishToCart();
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  return (
    <li className="bg-white shadow-lg rounded-xl p-4 flex items-center justify-between space-x-6 hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 max-w-full overflow-hidden">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-28 h-28 object-cover rounded-lg shadow-md"
      />
      <div className="flex-1 ml-4">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{dish.name}</h3>
        <p className="text-lg text-gray-600 mt-2">₹{dish.price}</p>
        <p className={`text-sm mt-2 ${dish.inStock ? "text-green-500" : "text-red-500"}`}>
          {dish.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>

      <div className="space-x-2 flex items-center">
        {isInCart ? (
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
            onClick={handleGoToCart}
          >
            Go to Cart
          </button>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            onClick={() => handleAddToCart(dish._id)}
            disabled={loading} 
          >
            {loading ? (
              <CircularProgress size={24} className="text-white" />
            ) : (
              "Add to Cart"
            )}
          </button>
        )}

        <button
          className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
          onClick={() => onEdit(dish)}
        >
          Edit
        </button>
      </div>
    </li>
  );
};

const DishCard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { counterId } = useParams();
  const dispatch = useDispatch();
  const counterDetails = useSelector((state) => state.counter.details);
  const dishes = useSelector((state) => state.counter.dishes);
  const [selectedDish, setSelectedDish] = useState(null);

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/dish`, {
          params: { counterId },
        });
        if (response.status === 200) {
          dispatch(setDishesOfCounter(response.data));
        } else {
          throw new Error("Failed to fetch dishes");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
    return () => dispatch(setDishesOfCounter([]));
  }, [counterId]);

  const handleEditDish = (dish) => {
    setSelectedDish(dish); 
  };

  if (loading) {
    return (
      <div className="text-center p-6 text-xl font-semibold text-gray-700">
        Loading dishes...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-screen-lg z-30">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Dishes</h2>

      {counterDetails && (
        <div className="counter-details mb-6">
          <h3 className="text-xl font-medium text-gray-800">
            Counter Name: {counterDetails.name}
          </h3>
        </div>
      )}

      <ul className="space-y-6">
        {dishes.map((dish) => (
          <Card key={dish._id} dish={dish} onEdit={handleEditDish} />
        ))}
      </ul>

      
      {selectedDish && (
        <EditDishModal
          dish={selectedDish}
          onClose={() => setSelectedDish(null)} 
        />
      )}
    </div>
  );
};

export default DishCard;
