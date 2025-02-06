import { createSlice } from "@reduxjs/toolkit";

const BillingSlice = createSlice({
    name:"bill",
    initialState: {
        Product:[]
    },
    reducers:{
        BillData:((state,actions)=>{
            const ProductExists =  state.Product.some(product=> product._key === actions.payload.key);
            if(!ProductExists){
                state.Product.push(actions.payload);
            }
        }),
    }
});

export default BillingSlice.reducer
export const {BillData} = BillingSlice.actions