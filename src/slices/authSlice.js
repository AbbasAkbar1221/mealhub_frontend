import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: true,
    },
    reducers: {
        setCurrentUser: (state, action)=>{
            const user = action.payload;
            state.currentUser = user;
        },
        removeCurrentUser: (state, action)=>{
            state.currentUser = null;
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
    },
})

export const {setCurrentUser, removeCurrentUser, setLoading} = authSlice.actions;

export default authSlice.reducer;