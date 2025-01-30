import { createSlice } from "@reduxjs/toolkit";

const authSlice  = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: true,
        users: [],
    },
    reducers: {
        setCurrentUser: (state, action)=>{
            const user = action.payload;
            console.log(action.payload);
            state.currentUser = user;
        },
        removeCurrentUser: (state, action)=>{
            state.currentUser = null;
        },
        setLoading: (state, action) => {
            state.loading = !!action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
})

export const {setCurrentUser, removeCurrentUser, setLoading, setUsers} = authSlice.actions;

export default authSlice.reducer;