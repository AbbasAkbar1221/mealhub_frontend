import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setDishesOfCounter } from "../slices/counterSlice";
import { setCart } from "../slices/cartSlice";
import EditDishModal from './EditDishModal'

// const Card = ({dish}) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const cartItems = useSelector((state) => state.cart.items);
//   const isInCart = cartItems.some(item => item.dish._id === dish._id);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleAddToCart = (dishId) => {
//     console.log(dishId)
//     const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

//     const addDishToCart = async () => {
//       try {
//         const response = await axios.post(`${VITE_BACKEND_URL}/cart/${dishId}`);
//         if (response.status === 201) {
//           console.log(response.data);

//           dispatch(setCart(response.data));
//         } else {
//           throw new Error("Failed to fetch dishes");
//         }
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     addDishToCart();
//   };
//   const handleGoToCart = () => {
//     navigate('/cart');
//   };
//     return (
//       <li
//         key={dish._id}
//         className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out flex items-center"
//       >
//         <img
//           src={dish.image}
//           alt={dish.name}
//           className="w-20 h-20 object-cover rounded-md mr-4"
//         />
//         <div className="flex-1">
//           <h3 className="text-xl font-medium text-gray-800">{dish.name}</h3>
//           <p className="text-sm text-gray-500 mt-1">₹{dish.price}</p>
//           <p
//             className={`text-sm mt-1 ${
//               dish.inStock ? "text-green-500" : "text-red-500"
//             }`}
//           >
//             {dish.inStock ? "In Stock" : "Out of Stock"}
//           </p>
//         </div>
//         <div>
//           {isInCart ? (
//             <button
//               className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
//               onClick={()=> handleGoToCart()}
//             >
//               Go to Cart
//             </button>
//           ) : (
//             <button
//               className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
//               onClick={() => handleAddToCart(dish._id)}
//             >
//               Add to Cart
//             </button>
//           )}
//         </div>
//       </li>
//     );
// }

const Card = ({ dish }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // State to show the modal
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

  const handleEditDish = () => {
    setShowEditModal(true);
  };

  return (
    <li className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 transition duration-300 ease-in-out flex items-center">
      <img
        src={dish.image}
        alt={dish.name}
        className="w-20 h-20 object-cover rounded-md mr-4"
      />
      <div className="flex-1">
        <h3 className="text-xl font-medium text-gray-800">{dish.name}</h3>
        <p className="text-sm text-gray-500 mt-1">₹{dish.price}</p>
        <p
          className={`text-sm mt-1 ${dish.inStock ? "text-green-500" : "text-red-500"}`}
        >
          {dish.inStock ? "In Stock" : "Out of Stock"}
        </p>
      </div>
      <div className="space-x-2">
        {isInCart ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            onClick={handleGoToCart}
          >
            Go to Cart
          </button>
        ) : (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={() => handleAddToCart(dish._id)}
          >
            Add to Cart
          </button>
        )}
        
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
          onClick={handleEditDish}
        >
          Edit
        </button>
      </div>

      {showEditModal && (
        <EditDishModal
          dish={dish}
          onClose={() => setShowEditModal(false)} 
        />
      )}
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

  useEffect(() => {
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchDishes = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/dish`, {
          params: { counterId },
        });
        if (response.status === 200) {
          console.log("fetch dishes", response.data);
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

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold text-center mb-6">Dishes</h2>

      {counterDetails && (
        <div className="counter-details mb-6">
          <h3 className="text-xl font-medium text-gray-800">
            Counter Name: {counterDetails.name}
          </h3>
        </div>
      )}

      <ul className="space-y-4">
        {dishes.map(dish => <Card dish={dish}/>)}
      </ul>
    </div>
  );
};

export default DishCard;

