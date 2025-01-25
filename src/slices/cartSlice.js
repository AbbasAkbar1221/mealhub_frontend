import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], 
    totalAmount: 0, 
  },
  reducers: {
  
    setCart: (state, action) => {
      state.items = action.payload.map((item) => ({
        id: item._id,
        dish: typeof item.dish === "object" ? item.dish : { _id: item.dish }, 
        quantity: item.quantity,
      }));
      state.totalAmount = action.payload.reduce(
        (total, item) =>
          total + (item.dish.price || 0) * item.quantity, 
        0
      );
    },

    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.dish._id === newItem.dish._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id: newItem.id,
          dish: newItem.dish,
          quantity: 1,
        });
      }

      state.totalAmount += newItem.dish.price || 0;
    },

    removeItemFromCart: (state, action) => {
      const id = action.payload; 
      const itemToRemove = state.items.find((item) => item.dish._id === id);

      if (itemToRemove) {
        if (itemToRemove.quantity === 1) {
          state.items = state.items.filter((item) => item.dish._id !== id);
        } else {
          itemToRemove.quantity -= 1;
        }
        state.totalAmount -= itemToRemove.dish.price || 0;
      }
    },

    removeProduct: (state, action) => {
      const id = action.payload; 
      const itemToRemove = state.items.find((item) => item.dish._id === id);

      if (itemToRemove) {
        state.items = state.items.filter((item) => item.dish._id !== id);
        state.totalAmount -=
          (itemToRemove.dish.price || 0) * itemToRemove.quantity;
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  removeProduct,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
