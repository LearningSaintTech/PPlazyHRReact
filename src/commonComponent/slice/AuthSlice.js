import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user:  null,
    role: null, 

};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            console.log("inside the set token", state.token);
        },
        setUser(state, action) {
            state.user = action.payload;
            console.log("action.payload",action.payload.roles[0].name)
            state.role = action.payload.roles[0].name; 

            console.log("inside the set user", state.user);
            console.log("inside the set role", state.role);


        },
        logout(state) {
            state.token = null;
            state.user = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("userData");
            localStorage.removeItem("ACCESS_TOKEN");
            localStorage.removeItem("USER_DATA");
            console.log("state.token ",state.token )
            console.log("state.user ", state.user )
            console.log("ACCESS_TOKEN ",localStorage.getItem("ACCESS_TOKEN") )
            console.log("accessToken ",localStorage.getItem("accessToken") )

            console.log("USER_DATA ",localStorage.getItem("USER_DATA") )
            console.log("USER_DATA ",localStorage.getItem("userData") )


        },
    },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
