import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    dishes: [],
    counters: [],
    currentCounter: null,
    merchants: [],
  },
  reducers: {
    setDishesOfCounter: (state, action) => {
      state.dishes = action.payload; 
    },

    setCounterDetails: (state, action) => {
      state.currentCounter = action.payload;
    },
    setCounters: (state, action) => {
      state.counters = action.payload;
    },
    setMerchantsList: (state, action) => {
      state.merchants = action.payload;
    },
  },
});

export const { setDishesOfCounter, setCounterDetails, setCounters, setMerchantsList } =
  counterSlice.actions;
export default counterSlice.reducer;
