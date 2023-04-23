import { createSlice } from "@reduxjs/toolkit";

export const doctorSlice = createSlice({
    name: "doctor",
    initialState: {
        doctor: null
    },
    reducers: {
        login: (state, action) => {
            state.doctor = action.payload;
        },
        logout: (state) => {
            state.doctor = "";
            
        }
    }
})

export const { login, logout } = doctorSlice.actions;
export const selectUser = (state) => state.doctor.doctor
export default doctorSlice.reducer;

