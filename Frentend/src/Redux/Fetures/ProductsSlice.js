import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        Bill: [],
    },
    reducers: {
        product_Data: ((state, action) => {
            state.products = action.payload
        }),
        BillData: (state, action) => {
            const existingIndex = state.Bill.findIndex(item => item.key === action.payload.key);
            if (existingIndex >= 0) {

                state.Bill[existingIndex] = action.payload;
            } else {

                state.Bill.push(action.payload);
            }
        },

        DeleteBill: (state, action) => {
            state.Bill = state.Bill.filter(item => item.key !== action.payload);
        },
        UpdateBill: (state, action) => {
            const index = state.Bill.findIndex(item => item.key === action.payload.key);
            if (index !== -1) {
                state.Bill[index] = {
                    ...state.Bill[index], ...action.payload
                };
            }
        }
    }
})

export const { product_Data, BillData, DeleteBill,UpdateBill } = productsSlice.actions;
export default productsSlice.reducer;