import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], 
  },
  reducers: {
  
    setCart: (state, action) => {
      state.items = action.payload;
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
      }
    },

    removeProduct: (state, action) => {
      const id = action.payload; 
      const itemToRemove = state.items.find((item) => item.dish._id === id);

      if (itemToRemove) {
        state.items = state.items.filter((item) => item.dish._id !== id);
      }
    },

    clearCart: (state) => {
      state.items = [];
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

export function setTotalAmount(state){
  return state.cart.items.reduce(
    (total, item)=> total + (item.dish && item.dish.price * item.quantity || 0),
    0
  )
}

export default cartSlice.reducer;
