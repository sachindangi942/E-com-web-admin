import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {
        productData: [],
        disableproduct: [],
    },
    reducers: {
        product_Data: ((state, action) => {
            state.productData = action.payload
        }),
    }
})

export const { product_Data } = productsSlice.actions;
export default productsSlice.reducer;