import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        dishes: [],
        details: null,
    },
    reducers: {
        setDishesOfCounter: (state, action) => {
            state.dishes = action.payload;
        },
        setCounterDetails: (state, action) => {
            state.details = action.payload;
        },
    },
});

export const {setDishesOfCounter, setCounterDetails} = counterSlice.actions;
export default counterSlice.reducer;