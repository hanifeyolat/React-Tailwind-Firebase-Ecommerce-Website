import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cart") ? [...JSON.parse(localStorage.getItem("cart"))] : [],
    cartTotal:0,
}

export const CartReducer = createSlice({
    name:"cart",
    initialState,
    reducers:{
        ADD_TO_CART: (state,action) => {
            const product = action.payload.product 
            const currentCartState = current(state.cart)
            state.cart= currentCartState.find(item => item.id===product.id) ? state.cart : [...state.cart , {...product, quantity: 1}]
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            let total=0
            state.cart.map(item=> total=total+(item.price*item.quantity))
            state.cartTotal=total

        },
        REMOVE_FROM_CART : (state,action) => {
            const product = action.payload.product 
            console.log("remove from cart a gelen product: ", product)
            const currentCartState = current(state.cart)
            state.cart=currentCartState.filter(item => item.id!==product.id)
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            let total=0
            state.cart.map(item=> total=total+(item.price*item.quantity))
            state.cartTotal=total
        },
        CLEAR_CART: (state) =>{
            state.cart=[]
            state.cartTotal=0
        },
        INCREASE_CART_QUANTITY : (state,action) => {
            const product = action.payload.product
            state.cart.map(item => item.id===product.id ? {...item , quantity:item.quantity++ }: item)
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            let total=0
            state.cart.map(item=> total=total+(item.price*item.quantity))
            state.cartTotal=total
        },
        DECREASE_CART_QUANTITY : (state,action) => {
            const product = action.payload.product
            state.cart.map(item => item.id===product.id ? item.quantity>1 ? {...item , quantity:item.quantity-- }: item : item)
            localStorage.setItem("cart" , JSON.stringify(state.cart))
            let total=0
            state.cart.map(item=> total=total+(item.price*item.quantity))
            state.cartTotal=total
        }
    }
})

export const {  ADD_TO_CART, 
                REMOVE_FROM_CART, 
                CLEAR_CART, 
                INCREASE_CART_QUANTITY, 
                DECREASE_CART_QUANTITY  } = CartReducer.actions
                
export const StoreCartProducts = (state) => state.cart.cart
export const StoreCartTotal = (state) => state.cart.cartTotal

export default CartReducer