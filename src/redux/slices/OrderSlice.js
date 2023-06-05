import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    orders: [],

}

export const OrderReducer = createSlice({
    name:"orders",
    initialState,
    reducers:{
        STORE_ORDERS: (state,action) => {
            state.orders=action.payload.orders 
        },
       
    }
})

export const {  STORE_ORDERS  } = OrderReducer.actions
                
export const StoreOrders= (state) => state.orders.orders


export default OrderReducer