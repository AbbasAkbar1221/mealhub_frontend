import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        dishes: [],
        counters: [],
        details: null,
    },
    reducers: {
        setDishesOfCounter: (state, action) => {
            state.dishes = action.payload;
        },
        setCounterDetails: (state, action) => {
            state.details = action.payload;
        },
        setCounters: (state, action) =>{
            state.counters = action.payload;
        }
    },
});

export const {setDishesOfCounter, setCounterDetails, setCounters} = counterSlice.actions;
export default counterSlice.reducer;