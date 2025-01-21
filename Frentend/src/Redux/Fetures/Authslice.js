import { createSlice } from "@reduxjs/toolkit";

const Authslice = createSlice({
    name: "auth",
    initialState: {
        token: null,
        username:null
    },
    reducers: {
        setToken: ((state, actions) => {
            const {token,username} = actions.payload;
            state.token = token
            state.username = username
        }),
        clearToken: ((state) => {
            state.token = null
        })
    }
});

export const { setToken, clearToken } = Authslice.actions;
export default Authslice.reducer;
