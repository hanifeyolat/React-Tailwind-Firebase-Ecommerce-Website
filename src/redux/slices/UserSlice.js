import { createSlice } from '@reduxjs/toolkit'

export const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    IsLoggedIn: false,
    user:null,
    userName: null,
    userID: null,
    shippingAddress: {},
    billingAddress: {},
    previousURL: "",
  },
  reducers: {
    USER_LOGIN: (state,action) => {
      const email =action.payload.user.email
      let index=Array.from(email).indexOf("@")
      let userName=[]
      Array.from(email).map( (item,idx) => idx<index ? userName.push(item) : item) 
      state.IsLoggedIn=true
      state.user=action.payload.user
      state.userName=userName.join("")
      state.userID=action.payload.user.uid
      localStorage.removeItem("favories")
      localStorage.removeItem("cart")
   },
   USER_LOGOUT: (state,action) => {
      state.IsLoggedIn=false
      state.user=null
      state.userName=null
      state.userID=null
    },
    SET_SHIPPING_ADDRESS:(state,action)=>{
      state.shippingAddress=action.payload.ShippingAddress
    },
    SET_BILLING_ADDRESS:(state,action)=>{
      state.billingAddress=action.payload.BillingAddress
    },
    SET_PREVIOUS_URL: (state,action) => {
      state.previousURL = action.payload.path
    }
  
  },
})


export const { USER_LOGIN, USER_LOGOUT, SET_SHIPPING_ADDRESS, SET_BILLING_ADDRESS, SET_PREVIOUS_URL} = AuthReducer.actions

export const selectUser = (state) => state.auth.user
export const selectUserName = (state) => state.auth.userName
export const selectUserID = (state) => state.auth.userID
export const selectUserIsLoggedIn= (state) => state.auth.IsLoggedIn
export const selectShippingAddress= (state) => state.auth.shippingAddress
export const selectBillingAddress= (state) => state.auth.billingAddress
export const selectPreviousURL= (state) => state.auth.previousURL

export default AuthReducer