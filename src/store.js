import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import counterReducer from './slices/counterSlice';

export default configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        counter: counterReducer,
    }
})