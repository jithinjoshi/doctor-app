import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const loadingSlice = createSlice({
    name:'loading',
    initialState,
    activeLoading : (state) =>{
        state.value = true;
    },
    deactiveLoading : (state) =>{
        state.value = false;
    }
})

export const  {activeLoading,deactiveLoading} = loadingSlice.actions;
export default loadingSlice.reducer;