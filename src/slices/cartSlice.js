import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem._id);

      if (existingItem) {
        existingItem.quantity += 1;
        console.log(existingItem.quantity);
      } else {
        state.items.push({ id: newItem._id, ...newItem, quantity: 1, isSelected: true });
      }

      state.totalAmount += newItem.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);

      if (itemToRemove) {
        if (itemToRemove.quantity === 1) {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalAmount -= itemToRemove.price;
        } else {
          itemToRemove.quantity -= 1;
          state.totalAmount -= itemToRemove.price;
        }
      }
    },
  
    removeProduct(state, action) {
      const id = action.payload;
      const itemToRemove = state.items.find((item) => item.id === id);
      if (itemToRemove) {
        state.items = state.items.filter((item) => item.id !== id);
        state.totalAmount -= itemToRemove.price * itemToRemove.quantity;
      }
    },

    clearCart(state) {
      state.items = [];
      state.totalAmount = 0;
    },
    toggleCheckBox: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.isSelected = !item.isSelected;
      }
    },
    selectAll: (state) => {
      state.items.forEach((item) => {
        item.isSelected = true;
      });
    },
    deselectAll: (state) => {
      state.items.forEach((item) => {
        item.isSelected = false;
      });
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
  toggleCheckBox,
  removeProduct,
  selectAll,
  deselectAll
} = cartSlice.actions;

export default cartSlice.reducer;
