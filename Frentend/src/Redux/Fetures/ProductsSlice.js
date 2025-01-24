import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
    },
    reducers: {
        product_Data: ((state, action) => {
            state.products = action.payload
        }),
    }
})

export const { product_Data } = productsSlice.actions;
export default productsSlice.reducer;